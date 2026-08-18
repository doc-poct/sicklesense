import {
  AndroidLogoIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  CpuIcon,
  LightningIcon,
  ShieldCheckIcon,
  UsbIcon,
  WifiSlashIcon,
} from '@phosphor-icons/react'
import heroImage from '../assets/jeevdristi-device.png'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RELEASES_PAGE_URL, type ReleaseDownloads } from '../releaseDownloads'

type HeroProps = {
  apk: ReleaseDownloads['apk']
  isLoading: boolean
}

export function Hero({ apk, isLoading }: HeroProps) {
  const downloadLabel = apk
    ? `Download Android app v${apk.version}`
    : isLoading
      ? 'Preparing Android download...'
      : 'Download Android App'

  return (
    <section className="relative overflow-hidden bg-grid py-12 md:py-20 lg:py-24" id="top">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[650px] rounded-full bg-primary/10 blur-[130px] opacity-70"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Hero Copy */}
          <div className="hero-copy flex flex-col items-start lg:col-span-6 xl:col-span-7">
            <Badge variant="outline" className="mb-6 gap-2 rounded-full border-border/80 bg-background/80 px-3.5 py-1 text-xs font-medium shadow-xs backdrop-blur-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span>IIT Bhilai Medical Innovation</span>
              <span className="text-muted-foreground">•</span>
              <span className="font-mono text-primary font-semibold">SickleSense POCT</span>
            </Badge>

            <h1 className="font-heading text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl text-foreground">
              Clarity at the <br />
              <span className="bg-gradient-to-r from-primary via-teal-600 to-emerald-600 bg-clip-text text-transparent dark:from-primary dark:to-teal-400">
                point of care.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Rugged optical testing, on-device AI morphology analysis, and zero-cloud field reporting in one cohesive platform—engineered to work anywhere, even without internet.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                size="lg"
                className="h-11 px-5 text-sm font-semibold shadow-md shadow-primary/20"
                nativeButton={false}
                render={
                  <a
                    href={apk?.url ?? RELEASES_PAGE_URL}
                    target={apk ? undefined : '_blank'}
                    rel={apk ? undefined : 'noreferrer'}
                    aria-label={downloadLabel}
                  />
                }
              >
                <AndroidLogoIcon className="size-4.5" weight="bold" />
                {downloadLabel}
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="h-11 px-5 text-sm font-semibold"
                nativeButton={false}
                render={<a href="webportal/" />}
              >
                <UsbIcon className="size-4.5" />
                Open Web Portal
                <ArrowRightIcon className="size-3.5 opacity-70" />
              </Button>
            </div>

            {/* Feature highlights pills */}
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 w-full pt-6 border-t border-border/60">
              <div className="flex items-center gap-2">
                <span className="grid size-7 place-items-center rounded-md bg-primary/10 text-primary">
                  <LightningIcon className="size-3.5" weight="fill" />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-foreground">&lt; 5 min</span>
                  <span className="text-[10px] text-muted-foreground">Rapid screening</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="grid size-7 place-items-center rounded-md bg-primary/10 text-primary">
                  <WifiSlashIcon className="size-3.5" weight="bold" />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-foreground">100% Offline</span>
                  <span className="text-[10px] text-muted-foreground">Zero cloud dependency</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="grid size-7 place-items-center rounded-md bg-primary/10 text-primary">
                  <UsbIcon className="size-3.5" weight="bold" />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-foreground">WebUSB Sync</span>
                  <span className="text-[10px] text-muted-foreground">Direct P2P transfer</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="grid size-7 place-items-center rounded-md bg-primary/10 text-primary">
                  <ShieldCheckIcon className="size-3.5" weight="fill" />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-foreground">Verified</span>
                  <span className="text-[10px] text-muted-foreground">Cryptographic hash</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Device Showcase Graphic */}
          <div className="hero-product relative flex items-center justify-center lg:col-span-6 xl:col-span-5">
            <div className="relative w-full max-w-lg rounded-2xl border border-border/80 bg-card/60 p-4 shadow-2xl backdrop-blur-sm sm:p-6">
              {/* Card top bar */}
              <div className="mb-4 flex items-center justify-between border-b border-border/60 pb-3">
                <div className="flex items-center gap-2">
                  <span className="size-2.5 rounded-full bg-emerald-500" />
                  <span className="font-mono text-xs font-medium text-muted-foreground">POCT-BOX-ZERO2W</span>
                </div>
                <Badge variant="outline" className="text-[10px] gap-1 font-mono">
                  <CpuIcon className="size-3" /> ARM64 Quad-Core
                </Badge>
              </div>

              {/* Device Image */}
              <div className="relative overflow-hidden rounded-xl bg-muted/40 p-2 sm:p-4">
                <img
                  src={heroImage}
                  alt="JeevDristi mobile application beside compact optical POCT device"
                  className="w-full object-contain transition-transform duration-500 hover:scale-[1.02]"
                  width="1024"
                  height="768"
                  fetchPriority="high"
                />
              </div>

              {/* Card bottom telemetry summary */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="rounded-lg bg-muted/40 p-2">
                  <p className="text-[10px] text-muted-foreground">Hardware</p>
                  <p className="font-semibold text-foreground">Pi Zero 2W</p>
                </div>
                <div className="rounded-lg bg-muted/40 p-2">
                  <p className="text-[10px] text-muted-foreground">Companion</p>
                  <p className="font-semibold text-foreground">Flutter Android</p>
                </div>
                <div className="rounded-lg bg-muted/40 p-2">
                  <p className="text-[10px] text-muted-foreground">Inference</p>
                  <p className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center justify-center gap-1">
                    <CheckCircleIcon weight="fill" className="size-3" /> On-Device
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
