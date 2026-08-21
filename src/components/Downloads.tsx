import {
  AndroidLogoIcon,
  CpuIcon,
  DownloadSimpleIcon,
  LifebuoyIcon,
  MicroscopeIcon,
} from '@phosphor-icons/react'
import { Brand } from './Brand'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { RELEASES_PAGE_URL, type ReleaseDownloads } from '../releaseDownloads'

type DownloadsProps = ReleaseDownloads & {
  isLoading: boolean
}

export function Downloads({ apk, zero2wImage, scdTerminalImage, isLoading }: DownloadsProps) {
  const appVersion = apk ? `v${apk.version}` : isLoading ? 'Resolving...' : 'Current Version'
  const zero2wVersion = zero2wImage ? `v${zero2wImage.version}` : isLoading ? 'Resolving...' : 'Current Version'
  const scdVersion = scdTerminalImage ? `v${scdTerminalImage.version}` : isLoading ? 'Resolving...' : 'Current Version'

  const triggerDownload = (targetUrl?: string | null) => {
    const url = targetUrl ?? RELEASES_PAGE_URL
    const link = document.createElement('a')
    link.href = url
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <>
      <section className="border-t border-border/60 bg-muted/20 py-20 lg:py-28" id="downloads">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="mb-3 px-3 py-1 text-xs">
              <DownloadSimpleIcon className="size-3 text-primary" />
              OFFICIAL SOFTWARE &amp; PACKAGES
            </Badge>
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Ready for the field. Download official packages.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Official application packages, testing unit firmware, and diagnostic workstation images for field deployments and clinical screening camps.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
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
                  JeevDristi Mobile App
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Companion Android application for guided testing, on-screen results, patient history, and report export.
                </p>

                <div className="mt-4 flex flex-col gap-1.5 border-t border-border/50 pt-3 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Compatibility:</span>
                    <span className="font-medium text-foreground">Android 8.0+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Package Format:</span>
                    <span className="font-medium text-foreground">Official APK (.apk)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Verification:</span>
                    <span className="font-medium text-foreground">Signed &amp; Verified</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/40">
                <Button
                  className="w-full font-semibold cursor-pointer"
                  onClick={() => triggerDownload(apk?.url)}
                >
                  <DownloadSimpleIcon data-icon="inline-start" />
                  Download App ({appVersion})
                </Button>
              </div>
            </Card>

            {/* POCT Device Runtime Card */}
            <Card className="flex flex-col justify-between border-border/80 bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                    <CpuIcon className="size-6" weight="duotone" />
                  </span>
                  <Badge variant="secondary" className="font-mono text-xs">
                    {zero2wVersion}
                  </Badge>
                </div>

                <h3 className="mt-4 font-heading text-lg font-bold text-foreground">
                  POCT Box Firmware
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Firmware image for the portable POCT turbidity testing box with autonomous optical capture and BLE device link.
                </p>

                <div className="mt-4 flex flex-col gap-1.5 border-t border-border/50 pt-3 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Target Hardware:</span>
                    <span className="font-medium text-foreground">JeevDristi Testing Unit</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Distribution:</span>
                    <span className="font-medium text-foreground">Verified A/B System Image (.xz)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Architecture:</span>
                    <span className="font-medium text-foreground">ARM64 (aarch64)</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/40">
                <Button
                  variant="outline"
                  className="w-full font-semibold cursor-pointer"
                  onClick={() => triggerDownload(zero2wImage?.url)}
                >
                  <DownloadSimpleIcon data-icon="inline-start" />
                  Download Box Firmware ({zero2wVersion})
                </Button>
              </div>
            </Card>

            {/* SCD Diagnostic Terminal Card */}
            <Card className="flex flex-col justify-between border-border/80 bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                    <MicroscopeIcon className="size-6" weight="duotone" />
                  </span>
                  <Badge variant="secondary" className="font-mono text-xs">
                    {scdVersion}
                  </Badge>
                </div>

                <h3 className="mt-4 font-heading text-lg font-bold text-foreground">
                  SCD Terminal Image
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Kiosk appliance image for single-cell automated microscopy terminal with ONNX Cellpose segmentation.
                </p>

                <div className="mt-4 flex flex-col gap-1.5 border-t border-border/50 pt-3 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Target Hardware:</span>
                    <span className="font-medium text-foreground">Microscopy Workstation Unit</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Distribution:</span>
                    <span className="font-medium text-foreground">Kiosk Appliance Image (.xz)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Architecture:</span>
                    <span className="font-medium text-foreground">ARM64 (aarch64)</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/40">
                <Button
                  variant="outline"
                  className="w-full font-semibold cursor-pointer"
                  onClick={() => triggerDownload(scdTerminalImage?.url)}
                >
                  <DownloadSimpleIcon data-icon="inline-start" />
                  Download Terminal Image ({scdVersion})
                </Button>
              </div>
            </Card>

            {/* Support & Deployment Guide Card */}
            <Card className="flex flex-col justify-between border-border/80 bg-card p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
              <div>
                <div className="flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary">
                    <LifebuoyIcon className="size-6" weight="duotone" />
                  </span>
                  <Badge variant="outline" className="font-mono text-xs">
                    Assistance
                  </Badge>
                </div>

                <h3 className="mt-4 font-heading text-lg font-bold text-foreground">
                  Support &amp; Portal
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  Connect phone via WebUSB to review clinical results, preview data, and access user guides.
                </p>

                <div className="mt-4 flex flex-col gap-1.5 border-t border-border/50 pt-3 text-xs text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Institution:</span>
                    <span className="font-medium text-foreground">IIT Bhilai POCT Project</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Web Portal:</span>
                    <span className="font-medium text-foreground">Zero-Install WebUSB</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Assistance:</span>
                    <span className="font-medium text-foreground">Research Team</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-border/40">
                <Button
                  variant="outline"
                  className="w-full font-semibold"
                  nativeButton={false}
                  render={<a href="webportal/" />}
                >
                  Launch Web Portal
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
                A point-of-care medical diagnostics and computer vision innovation project developed at the Indian Institute of Technology Bhilai (IIT Bhilai).
              </p>
            </div>

            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-muted-foreground" aria-label="Footer navigation">
              <a className="transition-colors hover:text-foreground" href="#top">Top</a>
              <a className="transition-colors hover:text-foreground" href="#product">Overview</a>
              <a className="transition-colors hover:text-foreground" href="#workflow">Workflow</a>
              <a className="transition-colors hover:text-foreground" href="#tech-specs">Specifications</a>
              <a className="transition-colors hover:text-foreground" href="webportal/">Phone Results Portal</a>
              <a className="transition-colors hover:text-foreground" href="#downloads">Downloads</a>
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
