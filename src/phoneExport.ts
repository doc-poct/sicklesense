import { chacha20poly1305 } from '@noble/ciphers/chacha.js'
import { x25519 } from '@noble/curves/ed25519.js'
import { hkdf } from '@noble/hashes/hkdf.js'
import { sha256 } from '@noble/hashes/sha2.js'

const GOOGLE_VID = 0x18d1
const ACCESSORY_PIDS = [0x2d00, 0x2d01]
const HEADER_BYTES = 28
const MAX_PAYLOAD = 65_536
const encoder = new TextEncoder()
const decoder = new TextDecoder('utf-8', { fatal: true })

export type PhoneResult = {
  id: string
  patient_name: string
  patient_id: string
  status: string
  category: string
  source: string
  created_at_ms: number
  exportable: boolean
}

export type PhoneResultDetail = PhoneResult & {
  summary: Record<string, unknown>
  artifacts: Array<{ id: string; kind: string; mime: string }>
}

type Frame = { kind: number; requestId: bigint; sequence: bigint; header: Uint8Array; payload: Uint8Array }

export class WebUsbPhoneExport {
  private device?: USBDevice
  private inputEndpoint = 0
  private outputEndpoint = 0
  private receiveBuffer: Uint8Array<ArrayBufferLike> = new Uint8Array()
  private sendSequence = 0n
  private receiveSequence = 0n
  private requestId = 1n
  private sendKey?: Uint8Array
  private receiveKey?: Uint8Array
  private operation: Promise<void> = Promise.resolve()

  static supported(): boolean {
    return window.isSecureContext && 'usb' in navigator
  }

  async connect(onCode?: (code: string) => void): Promise<string> {
    if (!WebUsbPhoneExport.supported()) throw new Error('WebUSB is unavailable. Use a current Chrome or Edge browser over HTTPS.')
    let device = await this.findGrantedAccessory()
    if (!device) {
      const selected = await navigator.usb.requestDevice({ filters: [] })
      if (this.isAccessory(selected)) {
        device = selected
      } else {
        await this.startAccessoryMode(selected)
        device = await this.waitForGrantedAccessory()
        if (!device) {
          device = await navigator.usb.requestDevice({ filters: ACCESSORY_PIDS.map((productId) => ({ vendorId: GOOGLE_VID, productId })) })
        }
      }
    }
    await this.openAccessory(device)
    return this.handshake(onCode)
  }

  async list(query = '', cursor?: string): Promise<{ results: PhoneResult[]; next_cursor: string | null }> {
    return this.enqueue(() => this.request({ type: 'list_results', query, cursor, limit: 50 }) as Promise<{ results: PhoneResult[]; next_cursor: string | null }>)
  }

  async detail(testId: string): Promise<PhoneResultDetail> {
    const value = await this.enqueue(() => this.request({ type: 'get_result', test_id: testId }) as Promise<{ result: PhoneResultDetail }>)
    return value.result
  }

  artifact(testId: string, artifactId: string): Promise<{ blob: Blob; filename?: string }> {
    return this.enqueue(() => this.requestFile({ type: 'get_artifact', test_id: testId, artifact_id: artifactId }))
  }

  exportResult(testId: string): Promise<{ blob: Blob; filename?: string }> {
    return this.enqueue(() => this.requestFile({ type: 'export_result', test_id: testId }))
  }

  async close(): Promise<void> {
    try { await this.sendControl({ type: 'close' }) } catch { /* already disconnected */ }
    try { await this.device?.close() } catch { /* already closed */ }
    this.device = undefined
    this.sendKey = undefined
    this.receiveKey = undefined
    this.receiveBuffer = new Uint8Array()
  }

  private async startAccessoryMode(device: USBDevice): Promise<void> {
    await device.open()
    try {
      const version = await device.controlTransferIn({ requestType: 'vendor', recipient: 'device', request: 51, value: 0, index: 0 }, 2)
      if (version.status !== 'ok' || !version.data || version.data.getUint16(0, true) < 1) throw new Error('This phone does not support Android accessory mode.')
      const strings = ['IIT Bhilai', 'Sicklesense Phone Export Bridge', 'Secure local JeevDristi results', '1', location.origin, crypto.randomUUID()]
      for (let index = 0; index < strings.length; index += 1) {
        const data = encoder.encode(`${strings[index]}\0`)
        const result = await device.controlTransferOut({ requestType: 'vendor', recipient: 'device', request: 52, value: 0, index }, data)
        if (result.status !== 'ok') throw new Error('The browser could not configure Android accessory mode.')
      }
      const start = await device.controlTransferOut({ requestType: 'vendor', recipient: 'device', request: 53, value: 0, index: 0 })
      if (start.status !== 'ok') throw new Error('The phone rejected Android accessory mode.')
    } finally {
      await device.close()
    }
  }

  private async openAccessory(device: USBDevice): Promise<void> {
    if (!this.isAccessory(device)) throw new Error('Select the reconnected Sicklesense Android accessory.')
    await device.open()
    if (!device.configuration) await device.selectConfiguration(1)
    const candidate = device.configuration?.interfaces.flatMap((usbInterface) => usbInterface.alternates.map((alternate) => ({ usbInterface, alternate }))).find(({ alternate }) => {
      const input = alternate.endpoints.find((endpoint) => endpoint.direction === 'in' && endpoint.type === 'bulk')
      const output = alternate.endpoints.find((endpoint) => endpoint.direction === 'out' && endpoint.type === 'bulk')
      return input && output
    })
    if (!candidate) throw new Error('The phone accessory has no usable bulk interface.')
    await device.claimInterface(candidate.usbInterface.interfaceNumber)
    this.inputEndpoint = candidate.alternate.endpoints.find((endpoint) => endpoint.direction === 'in' && endpoint.type === 'bulk')!.endpointNumber
    this.outputEndpoint = candidate.alternate.endpoints.find((endpoint) => endpoint.direction === 'out' && endpoint.type === 'bulk')!.endpointNumber
    this.device = device
  }

  private async handshake(onCode?: (code: string) => void): Promise<string> {
    const keys = x25519.keygen()
    await this.sendPlain({ type: 'hello', protocol_min: 1, protocol_max: 1, bridge_version: 'webusb-1', computer_name: navigator.platform || 'Browser', public_key: base64Url(keys.publicKey) })
    const pending = await this.receiveJson(false)
    if (pending.type !== 'session_pending' || typeof pending.public_key !== 'string') throw new Error('JeevDristi rejected the WebUSB handshake.')
    const phoneKey = fromBase64Url(pending.public_key)
    const transcript = sha256(new Uint8Array([...encoder.encode('PEL1'), ...keys.publicKey, ...phoneKey]))
    const shared = x25519.getSharedSecret(keys.secretKey, phoneKey)
    const derived = hkdf(sha256, shared, transcript, encoder.encode('jeevdristi-phone-export-link-v1'), 64)
    this.sendKey = derived.slice(0, 32)
    this.receiveKey = derived.slice(32, 64)
    const code = (new DataView(transcript.buffer, transcript.byteOffset, 4).getUint32(0) % 1_000_000).toString().padStart(6, '0')
    if (pending.short_code !== code) throw new Error('The phone and browser security codes do not match.')
    onCode?.(code)
    const approved = await this.receiveJson(true)
    if (approved.type !== 'session_approved') throw new Error('The session was not approved on the phone.')
    return code
  }

  private async request(message: Record<string, unknown>): Promise<Record<string, unknown>> {
    const id = ++this.requestId
    await this.sendControl(message, id)
    const frame = await this.readFrame()
    if (frame.requestId !== id || frame.kind !== 1) throw new Error('The phone returned an unexpected response.')
    const value = this.decodeJson(this.decrypt(frame))
    if (value.type === 'error') throw new Error(typeof value.message === 'string' ? value.message : 'The phone rejected the request.')
    return value
  }

  private enqueue<T>(action: () => Promise<T>): Promise<T> {
    const next = this.operation.then(action, action)
    this.operation = next.then(() => undefined, () => undefined)
    return next
  }

  private async requestFile(message: Record<string, unknown>): Promise<{ blob: Blob; filename?: string }> {
    const id = ++this.requestId
    await this.sendControl(message, id)
    const startFrame = await this.readFrame()
    const start = this.decodeJson(this.decrypt(startFrame))
    if (startFrame.requestId !== id || !['artifact_start', 'export_start'].includes(String(start.type))) throw new Error('The phone returned an invalid file response.')
    const expected = Number(start.bytes)
    if (!Number.isSafeInteger(expected) || expected < 0 || expected > 512 * 1024 * 1024) throw new Error('The file is too large or invalid.')
    const chunks: Uint8Array[] = []
    let received = 0
    while (true) {
      const frame = await this.readFrame()
      if (frame.requestId !== id) throw new Error('The file response ID changed.')
      if (frame.kind === 1) {
        const end = this.decodeJson(this.decrypt(frame))
        if (!['artifact_end', 'export_end'].includes(String(end.type))) throw new Error('The file transfer ended incorrectly.')
        break
      }
      if (frame.kind !== 2) throw new Error('Unexpected USB frame during file transfer.')
      const chunk = this.decrypt(frame)
      received += chunk.length
      if (received > expected) throw new Error('The phone sent more data than advertised.')
      chunks.push(chunk)
    }
    const bytes = concat(chunks)
    if (bytes.length !== expected || hex(sha256(bytes)) !== start.sha256) throw new Error('The downloaded file failed its integrity check.')
    return { blob: new Blob([bytes.slice().buffer as ArrayBuffer], { type: typeof start.mime === 'string' ? start.mime : 'application/octet-stream' }), filename: typeof start.filename === 'string' ? start.filename : undefined }
  }

  private sendPlain(message: Record<string, unknown>): Promise<void> { return this.writeFrame(1, 1n, encoder.encode(canonicalJson(message)), false) }
  private sendControl(message: Record<string, unknown>, requestId = ++this.requestId): Promise<void> { return this.writeFrame(1, requestId, encoder.encode(canonicalJson(message)), true) }

  private async writeFrame(kind: number, requestId: bigint, clear: Uint8Array, encrypted: boolean): Promise<void> {
    const sequence = ++this.sendSequence
    const payloadLength = clear.length + (encrypted ? 16 : 0)
    if (payloadLength > MAX_PAYLOAD) throw new Error('USB frame exceeds the protocol limit.')
    const header = makeHeader(kind, requestId, sequence, payloadLength)
    const payload = encrypted ? chacha20poly1305(this.sendKey!, nonce('PC2P', sequence), header).encrypt(clear) : clear
    const result = await this.device!.transferOut(this.outputEndpoint, concat([header, payload]))
    if (result.status !== 'ok') throw new Error('USB write failed.')
  }

  private async receiveJson(encrypted: boolean): Promise<Record<string, unknown>> {
    const frame = await this.readFrame()
    return this.decodeJson(encrypted ? this.decrypt(frame) : frame.payload)
  }

  private decrypt(frame: Frame): Uint8Array {
    return chacha20poly1305(this.receiveKey!, nonce('P2PC', frame.sequence), frame.header).decrypt(frame.payload)
  }

  private decodeJson(bytes: Uint8Array): Record<string, unknown> {
    const value: unknown = JSON.parse(decoder.decode(bytes))
    if (!value || typeof value !== 'object' || Array.isArray(value)) throw new Error('The phone returned invalid control data.')
    return value as Record<string, unknown>
  }

  private async readFrame(): Promise<Frame> {
    const header = await this.readExact(HEADER_BYTES)
    if (decoder.decode(header.slice(0, 4)) !== 'PEL1' || header[4] !== 1) throw new Error('Invalid Phone Export Link frame.')
    const view = new DataView(header.buffer, header.byteOffset, header.byteLength)
    const requestId = view.getBigUint64(8)
    const sequence = view.getBigUint64(16)
    const length = view.getUint32(24)
    if (sequence !== this.receiveSequence + 1n || length > MAX_PAYLOAD) throw new Error('Unsafe or reordered USB frame.')
    this.receiveSequence = sequence
    return { kind: header[5], requestId, sequence, header, payload: await this.readExact(length) }
  }

  private async readExact(length: number): Promise<Uint8Array> {
    while (this.receiveBuffer.length < length) {
      const result = await this.device!.transferIn(this.inputEndpoint, Math.max(16_384, length - this.receiveBuffer.length))
      if (result.status !== 'ok' || !result.data) throw new Error('USB read failed or the phone disconnected.')
      this.receiveBuffer = concat([this.receiveBuffer, new Uint8Array(result.data.buffer, result.data.byteOffset, result.data.byteLength)])
    }
    const value = this.receiveBuffer.slice(0, length)
    this.receiveBuffer = this.receiveBuffer.slice(length)
    return value
  }

  private isAccessory(device: USBDevice): boolean { return device.vendorId === GOOGLE_VID && ACCESSORY_PIDS.includes(device.productId) }
  private async findGrantedAccessory(): Promise<USBDevice | undefined> { return (await navigator.usb.getDevices()).find((device) => this.isAccessory(device)) }
  private async waitForGrantedAccessory(): Promise<USBDevice | undefined> {
    for (let attempt = 0; attempt < 20; attempt += 1) {
      const device = await this.findGrantedAccessory()
      if (device) return device
      await new Promise((resolve) => setTimeout(resolve, 250))
    }
    return undefined
  }
}

function makeHeader(kind: number, requestId: bigint, sequence: bigint, length: number): Uint8Array {
  const header = new Uint8Array(HEADER_BYTES)
  header.set(encoder.encode('PEL1'))
  header[4] = 1; header[5] = kind
  const view = new DataView(header.buffer)
  view.setBigUint64(8, requestId); view.setBigUint64(16, sequence); view.setUint32(24, length)
  return header
}

function nonce(prefix: string, sequence: bigint): Uint8Array { const value = new Uint8Array(12); value.set(encoder.encode(prefix)); new DataView(value.buffer).setBigUint64(4, sequence); return value }
function concat(values: Uint8Array<ArrayBufferLike>[]): Uint8Array<ArrayBuffer> { const output = new Uint8Array(values.reduce((sum, value) => sum + value.length, 0)); let offset = 0; for (const value of values) { output.set(value, offset); offset += value.length } return output }
function hex(value: Uint8Array): string { return [...value].map((byte) => byte.toString(16).padStart(2, '0')).join('') }
function base64Url(value: Uint8Array): string { return btoa(String.fromCharCode(...value)).replaceAll('+', '-').replaceAll('/', '_').replaceAll('=', '') }
function fromBase64Url(value: string): Uint8Array { const normalized = value.replaceAll('-', '+').replaceAll('_', '/').padEnd(Math.ceil(value.length / 4) * 4, '='); return Uint8Array.from(atob(normalized), (character) => character.charCodeAt(0)) }
function canonicalJson(value: unknown): string { return JSON.stringify(sortJson(value)) }
function sortJson(value: unknown): unknown { if (Array.isArray(value)) return value.map(sortJson); if (value && typeof value === 'object') return Object.fromEntries(Object.entries(value).sort(([a], [b]) => a.localeCompare(b)).map(([key, child]) => [key, sortJson(child)])); return value }
