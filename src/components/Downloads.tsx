import {
  AndroidLogoIcon,
  ArrowSquareOutIcon,
  CpuIcon,
  DownloadSimpleIcon,
  GithubLogoIcon,
} from '@phosphor-icons/react'
import { Brand } from './Brand'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { RELEASES_PAGE_URL, type ReleaseDownloads } from '../releaseDownloads'

type DownloadsProps = ReleaseDownloads & {
  isLoading: boolean
}

export function Downloads({ apk, zero2wImage, isLoading }: DownloadsProps) {
  const appVersion = apk ? `v${apk.version}` : isLoading ? 'Resolving...' : 'Latest Release'
  const imageVersion = zero2wImage ? `v${zero2wImage.version}` : isLoading ? 'Resolving...' : 'Latest Release'

  return (
    <>
      <section className="border-t border-border/60 bg-muted/20 py-20 lg:py-28" id="downloads">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="mb-3 px-3 py-1 text-xs">
              <DownloadSimpleIcon className="size-3 text-primary" />
              OFFICIAL RELEASES
            </Badge>
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Ready for the field. Download platform packages.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Signed application APKs and embedded Raspberry Pi Zero 2W device images for production field deployments.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* JeevDristi Mobile App Card */}
            <Card className="flex flex-col justify-between border-border/80 bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                    <AndroidLogoIcon className="size-6" weight="fill" />
                  </span>
                  <Badge variant="secondary" className="font-mono text-xs">
                    {appVersion}
                  </Badge>
                </div>

                <h3 className="mt-4 font-heading text-lg font-bold text-foreground">
                  JeevDristi Android App
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Companion mobile application for device pairing, operator guidance, local CV review, and patient record management.
                </p>

                <div className="mt-4 flex flex-col gap-1.5 border-t border-border/50 pt-3 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Target Platform:</span>
                    <span className="font-medium text-foreground">Android 8.0+ (API 26)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Architecture:</span>
                    <span className="font-medium text-foreground">ARM64 / ARMv7 Universal</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Signing:</span>
                    <span className="font-medium text-foreground">Official IIT Bhilai Release Key</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/40">
                <Button
                  className="w-full font-semibold"
                  nativeButton={false}
                  render={
                    <a
                      href={apk?.url ?? RELEASES_PAGE_URL}
                      target={apk ? undefined : '_blank'}
                      rel={apk ? undefined : 'noreferrer'}
                    />
                  }
                >
                  <DownloadSimpleIcon data-icon="inline-start" />
                  Download APK ({appVersion})
                </Button>
              </div>
            </Card>

            {/* POCT Box Firmware / Image Card */}
            <Card className="flex flex-col justify-between border-border/80 bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                    <CpuIcon className="size-6" weight="duotone" />
                  </span>
                  <Badge variant="secondary" className="font-mono text-xs">
                    {imageVersion}
                  </Badge>
                </div>

                <h3 className="mt-4 font-heading text-lg font-bold text-foreground">
                  POCT Box Embedded OS
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Embedded Linux runtime bundle including the autonomous CV/ML engine, optical sensor drivers, and device services.
                </p>

                <div className="mt-4 flex flex-col gap-1.5 border-t border-border/50 pt-3 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Target Hardware:</span>
                    <span className="font-medium text-foreground">Raspberry Pi Zero 2W</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Architecture:</span>
                    <span className="font-medium text-foreground">aarch64 (ARM 64-bit)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Flashing Method:</span>
                    <span className="font-medium text-foreground">Raspberry Pi Imager / Balena</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/40">
                <Button
                  variant="outline"
                  className="w-full font-semibold"
                  nativeButton={false}
                  render={
                    <a
                      href={zero2wImage?.url ?? RELEASES_PAGE_URL}
                      target={zero2wImage ? undefined : '_blank'}
                      rel={zero2wImage ? undefined : 'noreferrer'}
                    />
                  }
                >
                  <DownloadSimpleIcon data-icon="inline-start" />
                  Download Box Image
                </Button>
              </div>
            </Card>

            {/* Release Channel & Documentation Card */}
            <Card className="flex flex-col justify-between border-border/80 bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md md:col-span-2 lg:col-span-1">
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                    <GithubLogoIcon className="size-6" weight="fill" />
                  </span>
                  <Badge variant="outline" className="font-mono text-xs">
                    Public Channel
                  </Badge>
                </div>

                <h3 className="mt-4 font-heading text-lg font-bold text-foreground">
                  Release Channel &amp; Hashes
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Access release notes, SHA-256 checksums, previous builds, and cryptographic verification metadata.
                </p>

                <div className="mt-4 flex flex-col gap-1.5 border-t border-border/50 pt-3 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Repository:</span>
                    <span className="font-mono text-[11px] text-foreground">poct_fw_app_releases</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Versioning:</span>
                    <span className="font-medium text-foreground">Strict Semantic (SemVer)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Channels:</span>
                    <span className="font-medium text-foreground">Stable &amp; Beta Builds</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/40">
                <Button
                  variant="outline"
                  className="w-full font-semibold"
                  nativeButton={false}
                  render={
                    <a href={RELEASES_PAGE_URL} target="_blank" rel="noreferrer" />
                  }
                >
                  <ArrowSquareOutIcon data-icon="inline-start" />
                  View GitHub Releases
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Modern Footer */}
      <footer className="border-t border-border/70 bg-background py-12">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-2">
              <Brand />
              <p className="text-xs text-muted-foreground max-w-md">
                A point-of-care medical diagnostics and computer vision research project developed at the Indian Institute of Technology Bhilai (IIT Bhilai).
              </p>
            </div>

            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-muted-foreground" aria-label="Footer navigation">
              <a className="transition-colors hover:text-foreground" href="#top">Top</a>
              <a className="transition-colors hover:text-foreground" href="#product">Overview</a>
              <a className="transition-colors hover:text-foreground" href="#workflow">Workflow</a>
              <a className="transition-colors hover:text-foreground" href="#tech-specs">Architecture</a>
              <a className="transition-colors hover:text-foreground" href="webportal/">Phone Results Portal</a>
              <a className="transition-colors hover:text-foreground" href="#downloads">Downloads</a>
              <a className="transition-colors hover:text-foreground" href={RELEASES_PAGE_URL} target="_blank" rel="noreferrer">Releases</a>
            </nav>
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-border/40 pt-6 text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} IIT Bhilai POCT Project. All rights reserved.</p>
            <div className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span>All Systems Operational • Offline-First Ready</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
