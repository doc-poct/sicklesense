import {
  AndroidLogoIcon,
  ArrowRightIcon,
  LightningIcon,
  ShieldCheckIcon,
  UsbIcon,
  WifiSlashIcon,
} from '@phosphor-icons/react'
import poctWorkstationImg from '../assets/poct-hero-workstation.webp'
import poctWorkstationImg640 from '../assets/poct-hero-workstation-640.webp'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RELEASES_PAGE_URL, type ReleaseDownloads } from '../releaseDownloads'
import { useLanguage } from '@/lib/i18n'

type HeroProps = {
  apk: ReleaseDownloads['apk']
  isLoading: boolean
}

export function Hero({ apk, isLoading }: HeroProps) {
  const { t } = useLanguage()

  const downloadLabel = apk
    ? t.hero.downloadApk(apk.version)
    : isLoading
      ? t.hero.downloadPreparing
      : t.hero.downloadApk()

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
    <section className="relative isolate overflow-hidden pt-8 md:pt-12 lg:pt-16" id="top">
      {/* Full Workstation Background Scene
          Fix for 16:9 fullscreen: Sized with max-w and max-h so the image retains its natural proportions
          and anchors to the bottom without zooming 200% into the upper heading space. */}
      <div className="absolute inset-0 z-0 flex items-end justify-center overflow-hidden pointer-events-none">
        <picture className="w-full flex items-end justify-center">
          <source media="(max-width: 640px)" srcSet={poctWorkstationImg640} type="image/webp" />
          <img
            src={poctWorkstationImg}
            alt="SickleSense POCT clinical workstation background"
            className="w-full max-w-5xl lg:max-w-6xl xl:max-w-7xl h-auto max-h-[540px] sm:max-h-[600px] md:max-h-[660px] lg:max-h-[720px] object-contain object-bottom select-none"
            width="1024"
            height="1102"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        {/* Subtle top edge fade for smooth navbar blend */}
        <div className="absolute top-0 inset-x-0 h-20 bg-gradient-to-b from-background via-background/80 to-transparent pointer-events-none" />
        {/* Bottom subtle edge fade to next section */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-background/90 to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-72 sm:pb-80 md:pb-[380px] lg:pb-[440px] xl:pb-[480px]">
        {/* Centered Hero Copy Floating Cleanly in Upper Wall Space */}
        <div className="hero-copy mx-auto max-w-3xl text-center">
          <Badge
            variant="outline"
            className="mb-5 inline-flex items-center gap-2 rounded-full border-border/80 bg-background/85 px-4 py-1 text-xs font-medium shadow-xs backdrop-blur-md"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            <span>{t.hero.badge}</span>
          </Badge>

          <h1 className="font-heading tracking-tight text-foreground drop-shadow-xs text-balance">
            <span className="block text-3xl font-extrabold sm:text-5xl lg:text-6xl">
              {t.hero.headingLine1}
            </span>
            <span className="mt-2 block text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl bg-gradient-to-r from-primary via-teal-600 to-emerald-600 bg-clip-text text-transparent dark:from-primary dark:to-teal-400">
              {t.hero.headingLine2}
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base font-normal leading-relaxed text-foreground/80 sm:text-lg drop-shadow-2xs text-pretty">
            {t.hero.description}
          </p>

          {/* Centered Action Buttons overlapping the scene cleanly */}
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
              {t.hero.openPortal}
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
                <span className="text-xs font-semibold text-foreground">{t.hero.highlights.timeValue}</span>
                <span className="text-[10px] text-muted-foreground font-medium">{t.hero.highlights.timeLabel}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <span className="grid size-7 place-items-center rounded-md bg-primary/15 text-primary backdrop-blur-xs">
                <WifiSlashIcon className="size-3.5" weight="bold" />
              </span>
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-foreground">{t.hero.highlights.offlineValue}</span>
                <span className="text-[10px] text-muted-foreground font-medium">{t.hero.highlights.offlineLabel}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <span className="grid size-7 place-items-center rounded-md bg-primary/15 text-primary backdrop-blur-xs">
                <UsbIcon className="size-3.5" weight="bold" />
              </span>
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-foreground">{t.hero.highlights.syncValue}</span>
                <span className="text-[10px] text-muted-foreground font-medium">{t.hero.highlights.syncLabel}</span>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2">
              <span className="grid size-7 place-items-center rounded-md bg-primary/15 text-primary backdrop-blur-xs">
                <ShieldCheckIcon className="size-3.5" weight="fill" />
              </span>
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-foreground">{t.hero.highlights.verifiedValue}</span>
                <span className="text-[10px] text-muted-foreground font-medium">{t.hero.highlights.verifiedLabel}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
