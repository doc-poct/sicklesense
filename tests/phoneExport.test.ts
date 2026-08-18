import { expect, test } from 'bun:test'
import { chacha20poly1305 } from '@noble/ciphers/chacha.js'
import { x25519 } from '@noble/curves/ed25519.js'
import { hkdf } from '@noble/hashes/hkdf.js'
import { sha256 } from '@noble/hashes/sha2.js'
import { PhoneExportError, WebUsbPhoneExport } from '../src/phoneExport'

const encoder = new TextEncoder()

class FakeAccessory {
  readonly device: USBDevice
  readonly responses: Uint8Array[] = []
  helloWrites = 0
  totalWrites = 0
  closeCalls = 0

  constructor() {
    const configuration = {
      interfaces: [{
        interfaceNumber: 0,
        alternates: [{
          alternateSetting: 0,
          interfaceClass: 255,
          interfaceSubclass: 0,
          interfaceProtocol: 0,
          endpoints: [
            { endpointNumber: 1, direction: 'in', type: 'bulk', packetSize: 512 },
            { endpointNumber: 2, direction: 'out', type: 'bulk', packetSize: 512 },
          ],
        }],
      }],
    }
    this.device = {
      vendorId: 0x18d1,
      productId: 0x2d00,
      configuration,
      open: async () => undefined,
      close: async () => { this.closeCalls += 1 },
      selectConfiguration: async () => undefined,
      claimInterface: async () => undefined,
      transferOut: async (_endpoint: number, data: BufferSource) => {
        this.totalWrites += 1
        const bytes = toBytes(data)
        const payload = bytes.slice(28)
        try {
          const message = JSON.parse(new TextDecoder().decode(payload)) as Record<string, unknown>
          if (message.type === 'hello' && typeof message.public_key === 'string') {
            this.helloWrites += 1
            this.queueHandshake(message.public_key, this.helloWrites === 1)
          }
        } catch {
          // Encrypted control frames are expected after approval.
        }
        return { status: 'ok', bytesWritten: bytes.length } as USBOutTransferResult
      },
      transferIn: async () => {
        const next = this.responses.shift()
        if (!next) throw new Error('The fake phone has no queued response.')
        return {
          status: 'ok',
          data: new DataView(next.buffer, next.byteOffset, next.byteLength),
        } as USBInTransferResult
      },
    } as unknown as USBDevice
  }

  private queueHandshake(browserPublicKeyText: string, deny: boolean) {
    const browserPublicKey = fromBase64Url(browserPublicKeyText)
    const phoneKeys = x25519.keygen()
    const transcript = sha256(new Uint8Array([
      ...encoder.encode('PEL1'),
      ...browserPublicKey,
      ...phoneKeys.publicKey,
    ]))
    const code = securityCode(transcript)
    const derived = hkdf(
      sha256,
      x25519.getSharedSecret(phoneKeys.secretKey, browserPublicKey),
      transcript,
      encoder.encode('jeevdristi-phone-export-link-v1'),
      64,
    )
    this.responses.push(plainFrame({
      type: 'session_pending',
      protocol: 1,
      public_key: base64Url(phoneKeys.publicKey),
      short_code: code,
    }, 1n))
    this.responses.push(encryptedFrame(
      { type: deny ? 'session_denied' : 'session_approved' },
      2n,
      derived.slice(32, 64),
    ))
    if (deny) {
      const staleKeys = x25519.keygen()
      this.responses.push(plainFrame({
        type: 'session_pending',
        protocol: 1,
        public_key: base64Url(staleKeys.publicKey),
        short_code: 'stale-code',
      }, 1n))
    }
  }
}

test('denial cleanup does not poison a fresh approved retry', async () => {
  const fake = new FakeAccessory()
  const usb = {
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    getDevices: async () => [fake.device],
  }
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: { isSecureContext: true },
  })
  Object.defineProperty(globalThis, 'navigator', {
    configurable: true,
    value: { platform: 'Test browser', usb },
  })

  const denied = new WebUsbPhoneExport()
  await expect(denied.connect(undefined, undefined, fake.device)).rejects.toEqual(
    expect.objectContaining<Partial<PhoneExportError>>({ code: 'approval_denied' }),
  )
  await denied.close()

  // A rejected handshake must not send another encrypted frame after the
  // phone has already erased that attempt's keys.
  expect(fake.totalWrites).toBe(1)

  const approved = new WebUsbPhoneExport()
  let displayedCode = ''
  const connectedCode = await approved.connect(
    (code) => { displayedCode = code },
    undefined,
    fake.device,
  )

  expect(connectedCode).toBe(displayedCode)
  expect(fake.helloWrites).toBe(2)
  expect(fake.totalWrites).toBe(2)
  await approved.close()
  expect(fake.totalWrites).toBe(3)
  expect(fake.closeCalls).toBe(2)
})

test('chooser blocked SecurityError produces clear chooser guidance', async () => {
  const usb = {
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    getDevices: async () => [],
    requestDevice: async () => { throw new DOMException('Must be handling a user gesture', 'SecurityError') },
  }
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: { isSecureContext: true },
  })
  Object.defineProperty(globalThis, 'navigator', {
    configurable: true,
    value: { platform: 'Test browser', usb },
  })

  const client = new WebUsbPhoneExport()
  await expect(client.connect()).rejects.toThrow('The browser blocked the USB chooser. Keep this tab active and click Connect Android phone again.')
  await client.close()
})

test('OS driver access denial during startAccessoryMode produces clear driver guidance', async () => {
  const nonAccessory = {
    vendorId: 0x22b8,
    productId: 0x2e82,
    open: async () => { throw new DOMException('Access denied.', 'SecurityError') },
    close: async () => undefined,
  } as unknown as USBDevice

  const usb = {
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    getDevices: async () => [],
    requestDevice: async () => nonAccessory,
  }
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: { isSecureContext: true },
  })
  Object.defineProperty(globalThis, 'navigator', {
    configurable: true,
    value: { platform: 'Test browser', usb },
  })

  const client = new WebUsbPhoneExport()
  await expect(client.connect()).rejects.toThrow('Access to the phone was denied by the operating system. On Windows, the default MTP driver locks direct USB access. A WinUSB driver or compatible setup is required.')
  await client.close()
})

test('OS driver access denial during openAccessory produces clear accessory driver guidance', async () => {
  const accessory = {
    vendorId: 0x18d1,
    productId: 0x2d00,
    open: async () => { throw new DOMException('Access denied.', 'SecurityError') },
    close: async () => undefined,
  } as unknown as USBDevice

  const usb = {
    addEventListener: () => undefined,
    removeEventListener: () => undefined,
    getDevices: async () => [accessory],
    requestDevice: async () => accessory,
  }
  Object.defineProperty(globalThis, 'window', {
    configurable: true,
    value: { isSecureContext: true },
  })
  Object.defineProperty(globalThis, 'navigator', {
    configurable: true,
    value: { platform: 'Test browser', usb },
  })

  const client = new WebUsbPhoneExport()
  await expect(client.connect(undefined, undefined, accessory)).rejects.toThrow('Access to the Android accessory was denied by the operating system. Ensure the reconnected accessory has the WinUSB driver loaded on Windows.')
  await client.close()
})

function plainFrame(message: Record<string, unknown>, sequence: bigint): Uint8Array {
  const payload = encoder.encode(JSON.stringify(message))
  return concat([header(sequence, payload.length), payload])
}

function encryptedFrame(message: Record<string, unknown>, sequence: bigint, key: Uint8Array): Uint8Array {
  const clear = encoder.encode(JSON.stringify(message))
  const frameHeader = header(sequence, clear.length + 16)
  const encrypted = chacha20poly1305(key, nonce(sequence), frameHeader).encrypt(clear)
  return concat([frameHeader, encrypted])
}

function header(sequence: bigint, length: number): Uint8Array {
  const value = new Uint8Array(28)
  value.set(encoder.encode('PEL1'))
  value[4] = 1
  value[5] = 1
  const view = new DataView(value.buffer)
  view.setBigUint64(8, 1n)
  view.setBigUint64(16, sequence)
  view.setUint32(24, length)
  return value
}

function nonce(sequence: bigint): Uint8Array {
  const value = new Uint8Array(12)
  value.set(encoder.encode('P2PC'))
  new DataView(value.buffer).setBigUint64(4, sequence)
  return value
}

function securityCode(transcript: Uint8Array): string {
  return (new DataView(transcript.buffer, transcript.byteOffset, 4).getUint32(0) % 1_000_000).toString().padStart(6, '0')
}

function base64Url(value: Uint8Array): string {
  return Buffer.from(value).toString('base64url')
}

function fromBase64Url(value: string): Uint8Array {
  return new Uint8Array(Buffer.from(value, 'base64url'))
}

function toBytes(value: BufferSource): Uint8Array {
  return value instanceof ArrayBuffer
    ? new Uint8Array(value)
    : new Uint8Array(value.buffer, value.byteOffset, value.byteLength)
}

function concat(values: Uint8Array[]): Uint8Array {
  const output = new Uint8Array(values.reduce((sum, value) => sum + value.length, 0))
  let offset = 0
  for (const value of values) {
    output.set(value, offset)
    offset += value.length
  }
  return output
}
