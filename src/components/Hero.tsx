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
    <section className="relative overflow-hidden pt-12 md:pt-20 lg:pt-24" id="top">
      {/* Full Workstation Background Canvas (Unified single scene without grid) */}
      <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
        <img
          src={poctWorkstationImg}
          alt="SickleSense POCT clinical workstation background"
          className="size-full object-cover object-bottom select-none"
          width="1376"
          height="768"
          fetchPriority="high"
        />
        {/* Subtle top ambient tint for contrast and seamless navbar blend */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/90 via-background/40 to-transparent dark:from-background/95 dark:via-background/75 dark:to-transparent/30" />
        {/* Bottom subtle edge fade to next section */}
        <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-72 sm:pb-96 md:pb-[420px] lg:pb-[480px] xl:pb-[520px]">
        {/* Centered Hero Copy Floating Cleanly in Front of the Scene */}
        <div className="hero-copy mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="mb-5 inline-flex items-center gap-2 rounded-full border-border/80 bg-background/85 px-4 py-1 text-xs font-medium shadow-xs backdrop-blur-md">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span>IIT Bhilai Medical Innovation</span>
            <span className="text-muted-foreground">•</span>
            <span className="font-mono text-primary font-semibold">SickleSense POCT</span>
          </Badge>

          <h1 className="font-heading tracking-tight text-foreground drop-shadow-xs">
            <span className="block text-3xl font-extrabold sm:text-5xl lg:text-6xl">
              Clarity at the
            </span>
            <span className="mt-2 block text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl bg-gradient-to-r from-primary via-teal-600 to-emerald-600 bg-clip-text text-transparent dark:from-primary dark:to-teal-400">
              point of care.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base font-normal leading-relaxed text-foreground/80 sm:text-lg drop-shadow-2xs">
            Precision optical testing, on-device AI morphology analysis, and zero-cloud field reporting in one cohesive platform—engineered to work anywhere, even without internet.
          </p>

          {/* Centered Action Buttons overlapping the scene */}
          <div className="mt-8 flex flex-col items-center justify-center gap-3.5 sm:flex-row">
            <Button
              size="lg"
              className="h-12 px-6 text-sm font-semibold shadow-xl shadow-primary/25 hover:shadow-primary/35 transition-all cursor-pointer"
              onClick={handleDownload}
              aria-label={downloadLabel}
            >
              <AndroidLogoIcon className="size-5" weight="bold" />
              {downloadLabel}
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-12 px-6 text-sm font-semibold border-border/80 bg-background/90 backdrop-blur-md hover:bg-background transition-all shadow-sm"
              nativeButton={false}
              render={<a href="webportal/" />}
            >
              <UsbIcon className="size-5" />
              Open Web Portal
              <ArrowRightIcon className="size-4 opacity-70" />
            </Button>
          </div>

          {/* Centered Highlights Ribbon */}
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 max-w-3xl mx-auto pt-6 border-t border-border/60 backdrop-blur-xs">
            <div className="flex items-center justify-center gap-2">
              <span className="grid size-7 place-items-center rounded-md bg-primary/15 text-primary backdrop-blur-xs">
                <LightningIcon className="size-3.5" weight="fill" />
              </span>
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-foreground">&lt; 5 min</span>
                <span className="text-[10px] text-muted-foreground font-medium">Rapid screening</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <span className="grid size-7 place-items-center rounded-md bg-primary/15 text-primary backdrop-blur-xs">
                <WifiSlashIcon className="size-3.5" weight="bold" />
              </span>
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-foreground">100% Offline</span>
                <span className="text-[10px] text-muted-foreground font-medium">Zero internet needed</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <span className="grid size-7 place-items-center rounded-md bg-primary/15 text-primary backdrop-blur-xs">
                <UsbIcon className="size-3.5" weight="bold" />
              </span>
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-foreground">Direct USB Sync</span>
                <span className="text-[10px] text-muted-foreground font-medium">Peer-to-peer export</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <span className="grid size-7 place-items-center rounded-md bg-primary/15 text-primary backdrop-blur-xs">
                <ShieldCheckIcon className="size-3.5" weight="fill" />
              </span>
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-foreground">Verified</span>
                <span className="text-[10px] text-muted-foreground font-medium">Diagnostic integrity</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
