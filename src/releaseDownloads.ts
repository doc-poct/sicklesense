const RELEASES_API_URL = 'https://api.github.com/repos/doc-poct/poct_fw_app_releases/releases?per_page=100'
const CACHE_KEY = 'jeevdristi-release-downloads-v4'
const RETRY_KEY = 'jeevdristi-release-downloads-retry-at'
const CACHE_TTL_MS = 60 * 60 * 1000
const FAILURE_RETRY_MS = 60 * 60 * 1000

type ReleaseAsset = {
  browser_download_url?: unknown
  name?: unknown
}

type Release = {
  assets?: unknown
  draft?: unknown
  prerelease?: unknown
  tag_name?: unknown
}

type Version = readonly [number, number, number]

export type ReleaseDownloads = {
  apk: { url: string; version: string } | null
  zero2wImage: { url: string; version: string } | null
  bridge: { url: string; version: string } | null
}

type CachedReleaseDownloads = {
  downloads: ReleaseDownloads
  checkedAt: number
  etag: string | null
}

export const RELEASES_PAGE_URL = 'https://github.com/doc-poct/poct_fw_app_releases/releases'

const FALLBACK_DOWNLOADS: ReleaseDownloads = {
  apk: {
    url: 'https://github.com/doc-poct/poct_fw_app_releases/releases/download/app-v1.7.7%2B10707999/JeevDristi-1.7.7-release.apk',
    version: '1.7.7',
  },
  zero2wImage: {
    url: 'https://github.com/doc-poct/poct_fw_app_releases/releases/download/firmware-v2.1.10/poct-2.1.10-dietpi-zero2w-arm64-ab.img.xz',
    version: '2.1.10',
  },
  bridge: null,
}

let inFlightRequest: Promise<ReleaseDownloads> | null = null

function readCache(): CachedReleaseDownloads | null {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(CACHE_KEY) ?? 'null')
    if (typeof value !== 'object' || value === null) return null

    const cache = value as CachedReleaseDownloads
    if (!Number.isFinite(cache.checkedAt) || typeof cache.downloads !== 'object' || cache.downloads === null) return null
    return cache
  } catch {
    return null
  }
}

function writeCache(downloads: ReleaseDownloads, etag: string | null, checkedAt = Date.now()): void {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ downloads, etag, checkedAt } satisfies CachedReleaseDownloads))
  } catch {
    // Private browsing or storage restrictions must not prevent release links from working.
  }
}

function retryAfter(): number {
  try {
    const value = Number(localStorage.getItem(RETRY_KEY))
    return Number.isFinite(value) ? value : 0
  } catch {
    return 0
  }
}

function setRetryAfter(value: number): void {
  try {
    localStorage.setItem(RETRY_KEY, String(value))
  } catch {
    // Ignore unavailable browser storage.
  }
}

function clearRetryAfter(): void {
  try {
    localStorage.removeItem(RETRY_KEY)
  } catch {
    // Ignore unavailable browser storage.
  }
}

export function getCachedReleaseDownloads(): ReleaseDownloads | null {
  const downloads = readCache()?.downloads
  return {
    apk: downloads?.apk ?? FALLBACK_DOWNLOADS.apk,
    zero2wImage: downloads?.zero2wImage ?? FALLBACK_DOWNLOADS.zero2wImage,
    bridge: downloads?.bridge ?? null,
  }
}

export function shouldRefreshReleaseDownloads(now = Date.now()): boolean {
  const cache = readCache()
  return now >= retryAfter() && (cache === null || now - cache.checkedAt >= CACHE_TTL_MS)
}

function parseVersion(tagName: string, prefix: string): Version | null {
  const match = new RegExp(`^${prefix}v(\\d+)\\.(\\d+)\\.(\\d+)(?:$|\\+)`).exec(tagName)
  if (!match) return null

  return [Number(match[1]), Number(match[2]), Number(match[3])]
}

function isNewer(candidate: Version, current: Version | null): boolean {
  if (current === null) return true
  for (let index = 0; index < candidate.length; index += 1) {
    if (candidate[index] !== current[index]) return candidate[index] > current[index]
  }
  return false
}

function stableReleases(value: unknown): Release[] {
  if (!Array.isArray(value)) return []

  return value.filter((release): release is Release => (
    typeof release === 'object'
    && release !== null
    && (release as Release).draft !== true
    && (release as Release).prerelease !== true
    && typeof (release as Release).tag_name === 'string'
    && Array.isArray((release as Release).assets)
  ))
}

function findAsset(release: Release, name: string): string | null {
  const asset = (release.assets as ReleaseAsset[]).find((candidate) => candidate.name === name)
  return typeof asset?.browser_download_url === 'string' ? asset.browser_download_url : null
}

async function resolveLatestStableDownloads(signal?: AbortSignal): Promise<ReleaseDownloads> {
  const cache = readCache()
  const response = await fetch(RELEASES_API_URL, {
    headers: {
      Accept: 'application/vnd.github+json',
      ...(cache?.etag ? { 'If-None-Match': cache.etag } : {}),
    },
    signal,
  })

  if (response.status === 304 && cache) {
    writeCache(cache.downloads, cache.etag)
    clearRetryAfter()
    return cache.downloads
  }

  if (!response.ok) {
    const resetAt = Number(response.headers.get('x-ratelimit-reset')) * 1000
    const retryAt = Number.isFinite(resetAt) && resetAt > Date.now()
      ? resetAt
      : Date.now() + FAILURE_RETRY_MS
    setRetryAfter(retryAt)
    throw new Error(`Release lookup failed with HTTP ${response.status}`)
  }

  let latestApk: ReleaseDownloads['apk'] = null
  let latestApkVersion: Version | null = null
  let latestZero2wImage: ReleaseDownloads['zero2wImage'] = null
  let latestFirmwareVersion: Version | null = null
  let latestBridge: ReleaseDownloads['bridge'] = null
  let latestBridgeVersion: Version | null = null

  for (const release of stableReleases(await response.json())) {
    const tagName = release.tag_name as string
    const appVersion = parseVersion(tagName, 'app-')
    if (appVersion && isNewer(appVersion, latestApkVersion)) {
      const version = appVersion.join('.')
      const url = findAsset(release, `JeevDristi-${version}-release.apk`)
      if (url) {
        latestApk = { url, version }
        latestApkVersion = appVersion
      }
    }

    const firmwareVersion = parseVersion(tagName, 'firmware-')
    if (firmwareVersion && isNewer(firmwareVersion, latestFirmwareVersion)) {
      const version = firmwareVersion.join('.')
      const url = findAsset(release, `poct-${version}-dietpi-zero2w-arm64-ab.img.xz`)
      if (url) {
        latestZero2wImage = { url, version }
        latestFirmwareVersion = firmwareVersion
      }
    }

    const bridgeVersion = parseVersion(tagName, 'bridge-')
    if (bridgeVersion && isNewer(bridgeVersion, latestBridgeVersion)) {
      const version = bridgeVersion.join('.')
      const url = findAsset(release, `SicklesenseBridge-${version}-x64.msi`)
      if (url) {
        latestBridge = { url, version }
        latestBridgeVersion = bridgeVersion
      }
    }
  }

  const downloads = {
    apk: latestApk ?? FALLBACK_DOWNLOADS.apk,
    zero2wImage: latestZero2wImage ?? FALLBACK_DOWNLOADS.zero2wImage,
    bridge: latestBridge,
  }
  writeCache(downloads, response.headers.get('etag'))
  clearRetryAfter()
  return downloads
}

export function fetchLatestStableDownloads(signal?: AbortSignal): Promise<ReleaseDownloads> {
  if (inFlightRequest === null) {
    inFlightRequest = resolveLatestStableDownloads(signal).finally(() => {
      inFlightRequest = null
    })
  }
  return inFlightRequest
}
