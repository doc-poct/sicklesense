import {
  AndroidLogoIcon,
  ArrowRightIcon,
  LightningIcon,
  ShieldCheckIcon,
  UsbIcon,
  WifiSlashIcon,
} from '@phosphor-icons/react'
import poctWorkstationImg from '../assets/poct-hero-workstation.webp'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RELEASES_PAGE_URL, type ReleaseDownloads } from '../releaseDownloads'

type HeroProps = {
  apk: ReleaseDownloads['apk']
  isLoading: boolean
}

export function Hero({ apk, isLoading }: HeroProps) {
  const downloadLabel = apk
    ? `Download Android App (v${apk.version})`
    : isLoading
      ? 'Preparing Download...'
      : 'Download Android App'

  const handleDownload = () => {
    const targetUrl = apk?.url ?? RELEASES_PAGE_URL
    const link = document.createElement('a')
    link.href = targetUrl
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section className="relative overflow-hidden bg-grid py-12 md:py-16 lg:py-20" id="top">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[650px] rounded-full bg-primary/10 blur-[140px] opacity-70"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Centered Hero Header Section */}
        <div className="hero-copy mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="mb-5 inline-flex items-center gap-2 rounded-full border-border/80 bg-background/80 px-4 py-1 text-xs font-medium shadow-xs backdrop-blur-sm">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span>IIT Bhilai Medical Innovation</span>
            <span className="text-muted-foreground">•</span>
            <span className="font-mono text-primary font-semibold">SickleSense POCT</span>
          </Badge>

          <h1 className="font-heading tracking-tight text-foreground">
            <span className="block text-3xl font-extrabold sm:text-5xl lg:text-6xl">
              Clarity at the
            </span>
            <span className="mt-2 block text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl bg-gradient-to-r from-primary via-teal-600 to-emerald-600 bg-clip-text text-transparent dark:from-primary dark:to-teal-400">
              point of care.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Precision optical testing, on-device AI morphology analysis, and zero-cloud field reporting in one cohesive platform—engineered to work anywhere, even without internet.
          </p>

          {/* Centered Action Buttons */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <Button
              size="lg"
              className="h-12 px-6 text-sm font-semibold shadow-lg shadow-primary/25 hover:shadow-primary/35 transition-all cursor-pointer"
              onClick={handleDownload}
              aria-label={downloadLabel}
            >
              <AndroidLogoIcon className="size-5" weight="bold" />
              {downloadLabel}
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-12 px-6 text-sm font-semibold border-border/80 bg-background/80 backdrop-blur-xs hover:bg-muted/60 transition-all"
              nativeButton={false}
              render={<a href="webportal/" />}
            >
              <UsbIcon className="size-5" />
              Open Web Portal
              <ArrowRightIcon className="size-4 opacity-70" />
            </Button>
          </div>

          {/* Centered Highlights Ribbon */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 max-w-3xl mx-auto pt-6 border-t border-border/60">
            <div className="flex items-center justify-center gap-2">
              <span className="grid size-7 place-items-center rounded-md bg-primary/10 text-primary">
                <LightningIcon className="size-3.5" weight="fill" />
              </span>
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-foreground">&lt; 5 min</span>
                <span className="text-[10px] text-muted-foreground">Rapid screening</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <span className="grid size-7 place-items-center rounded-md bg-primary/10 text-primary">
                <WifiSlashIcon className="size-3.5" weight="bold" />
              </span>
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-foreground">100% Offline</span>
                <span className="text-[10px] text-muted-foreground">Zero internet needed</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <span className="grid size-7 place-items-center rounded-md bg-primary/10 text-primary">
                <UsbIcon className="size-3.5" weight="bold" />
              </span>
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-foreground">Direct USB Sync</span>
                <span className="text-[10px] text-muted-foreground">Peer-to-peer export</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <span className="grid size-7 place-items-center rounded-md bg-primary/10 text-primary">
                <ShieldCheckIcon className="size-3.5" weight="fill" />
              </span>
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-foreground">Verified</span>
                <span className="text-[10px] text-muted-foreground">Diagnostic integrity</span>
              </div>
            </div>
          </div>
        </div>

        {/* Grand Centered Product Shelf & Workstation Stage (Full, unboxed on grid background) */}
        <div className="hero-product relative mx-auto mt-10 sm:mt-14 max-w-6xl w-full flex justify-center">
          {/* Ambient radial glow underlay */}
          <div
            className="pointer-events-none absolute inset-0 -z-10 bg-radial from-primary/15 via-teal-500/5 to-transparent blur-3xl opacity-60"
            aria-hidden="true"
          />

          <img
            src={poctWorkstationImg}
            alt="JeevDristi POCT clinical workstation setup on laboratory shelf with testing unit, smartphone companion and sample test tubes"
            className="w-full max-w-5xl h-auto object-contain select-none [mask-image:linear-gradient(to_bottom,transparent_0%,black_6%,black_92%,transparent_100%)]"
            width="1376"
            height="768"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  )
}
