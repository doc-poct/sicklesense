import {
  AndroidLogoIcon,
  CpuIcon,
  DownloadSimpleIcon,
  LifebuoyIcon,
  MicroscopeIcon,
  UsbIcon,
} from '@phosphor-icons/react'
import { Brand } from './Brand'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { RELEASES_PAGE_URL, type ReleaseDownloads } from '../releaseDownloads'
import { useLanguage } from '@/lib/i18n'

type DownloadsProps = ReleaseDownloads & {
  isLoading: boolean
}

export function Downloads({ apk, zero2wImage, scdTerminalImage, isLoading }: DownloadsProps) {
  const { t } = useLanguage()

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
      <section className="section-deferred scroll-mt-20 border-t border-border/60 bg-muted/20 py-20 lg:py-28" id="downloads">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="outline" className="mb-3 px-3 py-1 text-xs">
              <DownloadSimpleIcon className="size-3 text-primary" />
              {t.downloads.badge}
            </Badge>
            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl text-balance">
              {t.downloads.heading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
              {t.downloads.description}
            </p>
          </div>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* JeevDristi Mobile App Card */}
            <Card className="flex flex-col justify-between border-border/80 bg-card p-5 sm:p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
              <div className="flex flex-col">
                <div className="flex items-center justify-between gap-2">
                  <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
                    <AndroidLogoIcon className="size-5" weight="fill" />
                  </span>
                  <Badge variant="secondary" className="font-mono text-xs shrink-0">
                    {appVersion}
                  </Badge>
                </div>

                <h3 className="mt-3.5 font-heading text-base font-bold text-foreground">
                  {t.downloads.cardApp.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {t.downloads.cardApp.desc}
                </p>

                <div className="mt-5 flex flex-col gap-2 border-t border-border/50 pt-3.5 text-xs">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-muted-foreground text-[11px] shrink-0">{t.downloads.cardApp.compatLabel}</span>
                    <span className="text-right font-medium text-foreground text-[11px]">{t.downloads.cardApp.compatVal}</span>
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-muted-foreground text-[11px] shrink-0">{t.downloads.cardApp.formatLabel}</span>
                    <span className="text-right font-medium text-foreground text-[11px]">{t.downloads.cardApp.formatVal}</span>
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-muted-foreground text-[11px] shrink-0">{t.downloads.cardApp.verifLabel}</span>
                    <span className="text-right font-medium text-foreground text-[11px]">{t.downloads.cardApp.verifVal}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-border/40 pt-4">
                <Button
                  className="h-10 w-full px-3 text-xs font-semibold cursor-pointer shadow-xs flex items-center justify-center gap-1.5"
                  onClick={() => triggerDownload(apk?.url)}
                >
                  <DownloadSimpleIcon className="size-4 shrink-0" />
                  <span className="truncate">{t.downloads.cardApp.btn}</span>
                </Button>
              </div>
            </Card>

            {/* POCT Device Runtime Card */}
            <Card className="flex flex-col justify-between border-border/80 bg-card p-5 sm:p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
              <div className="flex flex-col">
                <div className="flex items-center justify-between gap-2">
                  <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
                    <CpuIcon className="size-5" weight="duotone" />
                  </span>
                  <Badge variant="secondary" className="font-mono text-xs shrink-0">
                    {zero2wVersion}
                  </Badge>
                </div>

                <h3 className="mt-3.5 font-heading text-base font-bold text-foreground">
                  {t.downloads.cardBox.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {t.downloads.cardBox.desc}
                </p>

                <div className="mt-5 flex flex-col gap-2 border-t border-border/50 pt-3.5 text-xs">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-muted-foreground text-[11px] shrink-0">{t.downloads.cardBox.targetLabel}</span>
                    <span className="text-right font-medium text-foreground text-[11px]">{t.downloads.cardBox.targetVal}</span>
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-muted-foreground text-[11px] shrink-0">{t.downloads.cardBox.formatLabel}</span>
                    <span className="text-right font-medium text-foreground text-[11px]">{t.downloads.cardBox.formatVal}</span>
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-muted-foreground text-[11px] shrink-0">{t.downloads.cardBox.archLabel}</span>
                    <span className="text-right font-medium text-foreground text-[11px] font-mono">{t.downloads.cardBox.archVal}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-border/40 pt-4">
                <Button
                  variant="outline"
                  className="h-10 w-full px-3 text-xs font-semibold cursor-pointer border-border hover:bg-muted/70 flex items-center justify-center gap-1.5"
                  onClick={() => triggerDownload(zero2wImage?.url)}
                >
                  <DownloadSimpleIcon className="size-4 shrink-0" />
                  <span className="truncate">{t.downloads.cardBox.btn}</span>
                </Button>
              </div>
            </Card>

            {/* SCD Diagnostic Terminal Card */}
            <Card className="flex flex-col justify-between border-border/80 bg-card p-5 sm:p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
              <div className="flex flex-col">
                <div className="flex items-center justify-between gap-2">
                  <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
                    <MicroscopeIcon className="size-5" weight="duotone" />
                  </span>
                  <Badge variant="secondary" className="font-mono text-xs shrink-0">
                    {scdVersion}
                  </Badge>
                </div>

                <h3 className="mt-3.5 font-heading text-base font-bold text-foreground">
                  {t.downloads.cardTerminal.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {t.downloads.cardTerminal.desc}
                </p>

                <div className="mt-5 flex flex-col gap-2 border-t border-border/50 pt-3.5 text-xs">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-muted-foreground text-[11px] shrink-0">{t.downloads.cardTerminal.targetLabel}</span>
                    <span className="text-right font-medium text-foreground text-[11px]">{t.downloads.cardTerminal.targetVal}</span>
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-muted-foreground text-[11px] shrink-0">{t.downloads.cardTerminal.formatLabel}</span>
                    <span className="text-right font-medium text-foreground text-[11px]">{t.downloads.cardTerminal.formatVal}</span>
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-muted-foreground text-[11px] shrink-0">{t.downloads.cardTerminal.archLabel}</span>
                    <span className="text-right font-medium text-foreground text-[11px] font-mono">{t.downloads.cardTerminal.archVal}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-border/40 pt-4">
                <Button
                  variant="outline"
                  className="h-10 w-full px-3 text-xs font-semibold cursor-pointer border-border hover:bg-muted/70 flex items-center justify-center gap-1.5"
                  onClick={() => triggerDownload(scdTerminalImage?.url)}
                >
                  <DownloadSimpleIcon className="size-4 shrink-0" />
                  <span className="truncate">{t.downloads.cardTerminal.btn}</span>
                </Button>
              </div>
            </Card>

            {/* Support & Deployment Guide Card */}
            <Card className="flex flex-col justify-between border-border/80 bg-card p-5 sm:p-6 shadow-sm transition-all hover:border-primary/50 hover:shadow-md">
              <div className="flex flex-col">
                <div className="flex items-center justify-between gap-2">
                  <span className="grid size-10 place-items-center rounded-xl bg-primary/10 text-primary shrink-0">
                    <LifebuoyIcon className="size-5" weight="duotone" />
                  </span>
                  <Badge variant="outline" className="font-mono text-xs shrink-0">
                    Assistance
                  </Badge>
                </div>

                <h3 className="mt-3.5 font-heading text-base font-bold text-foreground">
                  {t.downloads.cardSupport.title}
                </h3>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                  {t.downloads.cardSupport.desc}
                </p>

                <div className="mt-5 flex flex-col gap-2 border-t border-border/50 pt-3.5 text-xs">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-muted-foreground text-[11px] shrink-0">{t.downloads.cardSupport.instLabel}</span>
                    <span className="text-right font-medium text-foreground text-[11px]">{t.downloads.cardSupport.instVal}</span>
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-muted-foreground text-[11px] shrink-0">{t.downloads.cardSupport.portalLabel}</span>
                    <span className="text-right font-medium text-foreground text-[11px]">{t.downloads.cardSupport.portalVal}</span>
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-muted-foreground text-[11px] shrink-0">{t.downloads.cardSupport.assistLabel}</span>
                    <span className="text-right font-medium text-foreground text-[11px]">{t.downloads.cardSupport.assistVal}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 border-t border-border/40 pt-4">
                <Button
                  variant="outline"
                  className="h-10 w-full px-3 text-xs font-semibold border-border hover:bg-muted/70 flex items-center justify-center gap-1.5"
                  nativeButton={false}
                  render={<a href="webportal/" />}
                >
                  <UsbIcon className="size-4 shrink-0" />
                  <span className="truncate">{t.downloads.cardSupport.btn}</span>
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
                {t.footer.about}
              </p>
            </div>

            <div className="flex flex-col items-start gap-4 md:items-end">
              <nav className="flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium text-muted-foreground" aria-label="Footer navigation">
                <a className="transition-colors hover:text-foreground" href="#top">{t.footer.navTop}</a>
                <a className="transition-colors hover:text-foreground" href="#product">{t.nav.overview}</a>
                <a className="transition-colors hover:text-foreground" href="#workflow">{t.nav.workflow}</a>
                <a className="transition-colors hover:text-foreground" href="#tech-specs">{t.nav.specs}</a>
                <a className="transition-colors hover:text-foreground" href="webportal/">{t.nav.results}</a>
                <a className="transition-colors hover:text-foreground" href="#downloads">{t.nav.downloads}</a>
              </nav>

              <div className="flex items-center gap-2">
                <LanguageSwitcher size="xs" />
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-col gap-4 border-t border-border/40 pt-6 text-[11px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
            <p>{t.footer.rights(new Date().getFullYear())}</p>
            <div className="flex items-center gap-2">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span>{t.footer.status}</span>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
