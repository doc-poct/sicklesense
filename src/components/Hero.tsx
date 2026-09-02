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
    <section
      className="relative isolate overflow-hidden min-h-[calc(100vh-4rem)] flex flex-col justify-between pt-3 sm:pt-5 md:pt-7 pb-52 sm:pb-60 md:pb-68 lg:pb-76"
      id="top"
    >
      {/* 16:9 Widescreen Panoramic Workstation Canvas
          Full-bleed edge-to-edge product landing scene.
          Native 16:9 ratio ensures the empty wall space at the top and the complete
          POCT device, test tube, phone, and table are all visible without cropping. */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <picture>
          <source media="(max-width: 640px)" srcSet={poctWorkstationImg640} type="image/webp" />
          <img
            src={poctWorkstationImg}
            alt="SickleSense POCT clinical workstation background"
            className="size-full object-cover object-bottom select-none"
            width="1920"
            height="1072"
            fetchPriority="high"
            decoding="async"
          />
        </picture>
        {/* Subtle top edge fade for smooth navbar blend */}
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-background/85 to-transparent pointer-events-none" />
        {/* Bottom subtle edge fade to next section */}
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-background/90 to-transparent pointer-events-none" />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Centered Hero Copy Floating Cleanly in Upper Wall Space */}
        <div className="hero-copy mx-auto max-w-3xl text-center">
          <Badge
            variant="outline"
            className="mb-2.5 inline-flex items-center gap-2 rounded-full border-border/80 bg-background/85 px-4 py-1 text-xs font-medium shadow-xs backdrop-blur-md"
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
            <span className="mt-1 block text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl xl:text-8xl bg-gradient-to-r from-primary via-teal-600 to-emerald-600 bg-clip-text text-transparent dark:from-primary dark:to-teal-400">
              {t.hero.headingLine2}
            </span>
          </h1>

          <p className="mx-auto mt-3.5 max-w-2xl text-base font-normal leading-relaxed text-foreground/80 sm:text-lg drop-shadow-2xs text-pretty">
            {t.hero.description}
          </p>

          {/* Centered Action Buttons in Upper Wall Space */}
          <div className="mt-5 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              className="h-11 px-6 text-sm font-semibold shadow-xl shadow-primary/25 hover:shadow-primary/35 transition-all cursor-pointer"
              onClick={handleDownload}
              aria-label={downloadLabel}
            >
              <AndroidLogoIcon className="size-5" weight="bold" />
              {downloadLabel}
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="h-11 px-6 text-sm font-semibold border-border/80 bg-background/90 backdrop-blur-md hover:bg-background transition-all shadow-sm"
              nativeButton={false}
              render={<a href="webportal/" />}
            >
              <UsbIcon className="size-5" />
              {t.hero.openPortal}
              <ArrowRightIcon className="size-4 opacity-70" />
            </Button>
          </div>

          {/* Centered Highlights Ribbon */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4 max-w-3xl mx-auto pt-4 border-t border-border/50 backdrop-blur-xs">
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
