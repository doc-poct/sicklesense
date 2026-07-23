const RELEASES_API_URL = 'https://api.github.com/repos/doc-poct/poct_fw_app_releases/releases?per_page=100'

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

export async function fetchLatestStableDownloads(signal?: AbortSignal): Promise<ReleaseDownloads> {
  const response = await fetch(RELEASES_API_URL, {
    headers: { Accept: 'application/vnd.github+json' },
    signal,
  })
  if (!response.ok) throw new Error(`Release lookup failed with HTTP ${response.status}`)

  let latestApk: ReleaseDownloads['apk'] = null
  let latestApkVersion: Version | null = null
  let latestZero2wImage: ReleaseDownloads['zero2wImage'] = null
  let latestFirmwareVersion: Version | null = null

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
      const url = findAsset(release, `poct-${version}-dietpi-zero2w-arm64.img.xz`)
      if (url) {
        latestZero2wImage = { url, version }
        latestFirmwareVersion = firmwareVersion
      }
    }
  }

  return { apk: latestApk, zero2wImage: latestZero2wImage }
}
