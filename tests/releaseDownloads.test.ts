import { beforeEach, expect, test } from 'bun:test'
import {
  fetchLatestStableDownloads,
  getCachedReleaseDownloads,
  shouldRefreshReleaseDownloads,
} from '../src/releaseDownloads'

const storage = new Map<string, string>()

beforeEach(() => {
  storage.clear()
  Object.defineProperty(globalThis, 'localStorage', {
    configurable: true,
    value: {
      getItem: (key: string) => storage.get(key) ?? null,
      setItem: (key: string, value: string) => storage.set(key, value),
      removeItem: (key: string) => storage.delete(key),
    },
  })
})

test('getCachedReleaseDownloads returns default fallbacks when cache is empty', () => {
  const downloads = getCachedReleaseDownloads()
  expect(downloads).not.toBeNull()
  expect(downloads?.apk?.version).toBe('1.7.7')
  expect(downloads?.apk?.url).toContain('JeevDristi-1.7.7-release.apk')
  expect(downloads?.zero2wImage?.version).toBe('2.1.10')
  expect(downloads?.zero2wImage?.url).toContain('poct-2.1.10-dietpi-zero2w-arm64-ab.img.xz')
  expect(downloads?.scdTerminalImage?.version).toBe('0.1.0')
  expect(downloads?.scdTerminalImage?.url).toContain('poct-scd-terminal-0.1.0-dietpi-rpi5-arm64.img.xz')
})

test('fetchLatestStableDownloads parses app, zero2w, and scd-terminal releases', async () => {
  const fakeReleases = [
    {
      tag_name: 'scd-terminal-v0.1.0',
      draft: false,
      prerelease: false,
      assets: [
        {
          name: 'poct-scd-terminal-0.1.0-dietpi-rpi5-arm64.img.xz',
          browser_download_url: 'https://github.com/doc-poct/poct_fw_app_releases/releases/download/scd-terminal-v0.1.0/poct-scd-terminal-0.1.0-dietpi-rpi5-arm64.img.xz',
        },
        {
          name: 'poct_scd_terminal-0.1.0-aarch64.tar.gz',
          browser_download_url: 'https://github.com/doc-poct/poct_fw_app_releases/releases/download/scd-terminal-v0.1.0/poct_scd_terminal-0.1.0-aarch64.tar.gz',
        },
      ],
    },
    {
      tag_name: 'firmware-v2.2.0',
      draft: false,
      prerelease: false,
      assets: [
        {
          name: 'poct-2.2.0-dietpi-zero2w-arm64-ab.img.xz',
          browser_download_url: 'https://github.com/doc-poct/poct_fw_app_releases/releases/download/firmware-v2.2.0/poct-2.2.0-dietpi-zero2w-arm64-ab.img.xz',
        },
      ],
    },
    {
      tag_name: 'app-v1.8.0+10800999',
      draft: false,
      prerelease: false,
      assets: [
        {
          name: 'JeevDristi-1.8.0-release.apk',
          browser_download_url: 'https://github.com/doc-poct/poct_fw_app_releases/releases/download/app-v1.8.0%2B10800999/JeevDristi-1.8.0-release.apk',
        },
      ],
    },
    {
      tag_name: 'scd-terminal-v0.2.0-draft',
      draft: true,
      prerelease: false,
      assets: [
        {
          name: 'poct-scd-terminal-0.2.0-dietpi-rpi5-arm64.img.xz',
          browser_download_url: 'https://github.com/example/draft.img.xz',
        },
      ],
    },
  ]

  const originalFetch = globalThis.fetch
  globalThis.fetch = (async () => {
    return new Response(JSON.stringify(fakeReleases), {
      status: 200,
      headers: { 'Content-Type': 'application/json', etag: '"etag-123"' },
    })
  }) as typeof fetch

  try {
    const result = await fetchLatestStableDownloads()
    expect(result.apk?.version).toBe('1.8.0')
    expect(result.apk?.url).toBe('https://github.com/doc-poct/poct_fw_app_releases/releases/download/app-v1.8.0%2B10800999/JeevDristi-1.8.0-release.apk')

    expect(result.zero2wImage?.version).toBe('2.2.0')
    expect(result.zero2wImage?.url).toBe('https://github.com/doc-poct/poct_fw_app_releases/releases/download/firmware-v2.2.0/poct-2.2.0-dietpi-zero2w-arm64-ab.img.xz')

    expect(result.scdTerminalImage?.version).toBe('0.1.0')
    expect(result.scdTerminalImage?.url).toBe('https://github.com/doc-poct/poct_fw_app_releases/releases/download/scd-terminal-v0.1.0/poct-scd-terminal-0.1.0-dietpi-rpi5-arm64.img.xz')

    expect(storage.get('jeevdristi-release-downloads-v6')).toContain('"0.1.0"')
    expect(shouldRefreshReleaseDownloads()).toBe(false)
  } finally {
    globalThis.fetch = originalFetch
  }
})
