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
    <section className="relative overflow-hidden pt-12 md:pt-16 lg:pt-20 pb-6 sm:pb-10" id="top">
      {/* Background ambient lighting */}
      <div
        className="pointer-events-none absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[650px] rounded-full bg-primary/10 blur-[140px] opacity-70"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Centered Hero Copy */}
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

          <h1 className="font-heading tracking-tight text-foreground">
            <span className="block text-3xl font-extrabold sm:text-5xl lg:text-6xl">
              Clarity at the
            </span>
            <span className="mt-2 block text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl bg-gradient-to-r from-primary via-teal-600 to-emerald-600 bg-clip-text text-transparent dark:from-primary dark:to-teal-400">
              point of care.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base font-normal leading-relaxed text-muted-foreground sm:text-lg">
            Precision optical testing, on-device AI morphology analysis, and zero-cloud field reporting in one cohesive platform—engineered to work anywhere, even without internet.
          </p>

          {/* Centered Action Buttons */}
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
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 max-w-3xl mx-auto pt-6 border-t border-border/60">
            <div className="flex items-center justify-center gap-2">
              <span className="grid size-7 place-items-center rounded-md bg-primary/10 text-primary">
                <LightningIcon className="size-3.5" weight="fill" />
              </span>
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-foreground">&lt; 5 min</span>
                <span className="text-[10px] text-muted-foreground font-medium">Rapid screening</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <span className="grid size-7 place-items-center rounded-md bg-primary/10 text-primary">
                <WifiSlashIcon className="size-3.5" weight="bold" />
              </span>
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-foreground">100% Offline</span>
                <span className="text-[10px] text-muted-foreground font-medium">Zero internet needed</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <span className="grid size-7 place-items-center rounded-md bg-primary/10 text-primary">
                <UsbIcon className="size-3.5" weight="bold" />
              </span>
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-foreground">Direct USB Sync</span>
                <span className="text-[10px] text-muted-foreground font-medium">Peer-to-peer export</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <span className="grid size-7 place-items-center rounded-md bg-primary/10 text-primary">
                <ShieldCheckIcon className="size-3.5" weight="fill" />
              </span>
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-foreground">Verified</span>
                <span className="text-[10px] text-muted-foreground font-medium">Diagnostic integrity</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Workstation Scene (Seamlessly positioned below text & buttons with top blend) */}
        <div className="relative mx-auto mt-6 sm:mt-10 max-w-5xl flex justify-center">
          <img
            src={poctWorkstationImg}
            alt="JeevDristi POCT clinical workstation setup on laboratory shelf with testing unit, smartphone companion and sample test tubes"
            className="w-full max-w-4xl h-auto object-contain select-none [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_100%)]"
            width="1024"
            height="682"
            fetchPriority="high"
          />
        </div>
      </div>
    </section>
  )
}
