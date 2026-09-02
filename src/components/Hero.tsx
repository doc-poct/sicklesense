import {
  AndroidLogoIcon,
  ArrowRightIcon,
  DeviceMobileIcon,
  FlaskIcon,
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
    <section className="relative isolate overflow-hidden py-10 sm:py-14 lg:py-20" id="top">
      {/* Soft medical-tech background lighting (prevents text-image collision in 16:9) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-40 right-0 h-[600px] w-[600px] rounded-full bg-primary/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="absolute top-1/2 -left-40 h-[500px] w-[500px] rounded-full bg-teal-500/5 blur-3xl"
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-dots opacity-40 [mask-image:radial-gradient(ellipse_at_center,white_30%,transparent_80%)]" />
        <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-background to-transparent" />
        <div className="absolute bottom-0 inset-x-0 h-16 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Two-Column Responsive Grid on Desktop / Widescreen 16:9 */}
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          {/* Left Column: Heading, Value Proposition & Actions */}
          <div className="hero-copy flex flex-col items-center text-center lg:col-span-7 lg:items-start lg:text-left">
            <Badge
              variant="outline"
              className="mb-5 inline-flex items-center gap-2 rounded-full border-border/80 bg-background/90 px-4 py-1.5 text-xs font-medium shadow-xs backdrop-blur-md"
            >
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span>{t.hero.badge}</span>
            </Badge>

            <h1 className="font-heading tracking-tight text-foreground text-balance">
              <span className="block text-3xl font-extrabold sm:text-5xl lg:text-5xl xl:text-6xl">
                {t.hero.headingLine1}
              </span>
              <span className="mt-1.5 block text-4xl font-black tracking-tight sm:text-6xl lg:text-6xl xl:text-7xl bg-gradient-to-r from-primary via-teal-600 to-emerald-600 bg-clip-text text-transparent dark:from-primary dark:via-teal-300 dark:to-emerald-400">
                {t.hero.headingLine2}
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-base font-normal leading-relaxed text-muted-foreground sm:text-lg text-pretty">
              {t.hero.description}
            </p>

            {/* Action CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 w-full sm:w-auto">
              <Button
                size="lg"
                className="h-12 w-full sm:w-auto px-6 text-sm font-semibold shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all cursor-pointer"
                onClick={handleDownload}
                aria-label={downloadLabel}
              >
                <AndroidLogoIcon className="size-5" weight="bold" />
                {downloadLabel}
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="h-12 w-full sm:w-auto px-6 text-sm font-semibold border-border/80 bg-card/80 backdrop-blur-md hover:bg-card transition-all shadow-xs"
                nativeButton={false}
                render={<a href="webportal/" />}
              >
                <UsbIcon className="size-5" />
                {t.hero.openPortal}
                <ArrowRightIcon className="size-4 opacity-70" />
              </Button>
            </div>

            {/* Diagnostic Highlights Ribbon */}
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 w-full pt-6 border-t border-border/60">
              <div className="flex items-center gap-2.5">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary">
                  <LightningIcon className="size-4" weight="fill" />
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-foreground">{t.hero.highlights.timeValue}</span>
                  <span className="text-[10px] text-muted-foreground font-medium">{t.hero.highlights.timeLabel}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary">
                  <WifiSlashIcon className="size-4" weight="bold" />
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-foreground">{t.hero.highlights.offlineValue}</span>
                  <span className="text-[10px] text-muted-foreground font-medium">{t.hero.highlights.offlineLabel}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary">
                  <UsbIcon className="size-4" weight="bold" />
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-foreground">{t.hero.highlights.syncValue}</span>
                  <span className="text-[10px] text-muted-foreground font-medium">{t.hero.highlights.syncLabel}</span>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary">
                  <ShieldCheckIcon className="size-4" weight="fill" />
                </span>
                <div className="flex flex-col text-left">
                  <span className="text-xs font-semibold text-foreground">{t.hero.highlights.verifiedValue}</span>
                  <span className="text-[10px] text-muted-foreground font-medium">{t.hero.highlights.verifiedLabel}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Physical POCT Workstation Showcase (Never overlaps text) */}
          <div className="hero-product relative mx-auto w-full max-w-lg lg:col-span-5 lg:max-w-none">
            {/* Subtle backlight glow halo */}
            <div
              className="absolute -inset-2 sm:-inset-4 rounded-3xl bg-gradient-to-tr from-primary/20 via-teal-500/15 to-transparent blur-2xl -z-10"
              aria-hidden="true"
            />

            <div className="group relative overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-b from-card/90 via-card/70 to-card/40 p-3 sm:p-4 shadow-2xl backdrop-blur-md ring-1 ring-primary/10">
              <div className="relative overflow-hidden rounded-2xl bg-muted/30">
                <picture>
                  <source media="(max-width: 640px)" srcSet={poctWorkstationImg640} type="image/webp" />
                  <img
                    src={poctWorkstationImg}
                    alt="SickleSense POCT clinical workstation and JeevDristi companion app"
                    className="size-full aspect-[1024/1102] object-contain object-bottom select-none transition-transform duration-700 group-hover:scale-[1.02]"
                    width="1024"
                    height="1102"
                    fetchPriority="high"
                    decoding="async"
                  />
                </picture>

                {/* Floating hardware callout chip */}
                <div className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/90 px-3 py-1 text-[11px] font-medium text-foreground shadow-md backdrop-blur-md">
                  <FlaskIcon className="size-3.5 text-primary" weight="fill" />
                  <span>{t.hero.chipHardware}</span>
                </div>

                {/* Floating companion app callout chip */}
                <div className="absolute bottom-3.5 right-3.5 sm:bottom-4 sm:right-4 inline-flex items-center gap-1.5 rounded-full border border-border/70 bg-background/90 px-3 py-1 text-[11px] font-medium text-foreground shadow-md backdrop-blur-md">
                  <DeviceMobileIcon className="size-3.5 text-primary" weight="fill" />
                  <span>{t.hero.chipSoftware}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
