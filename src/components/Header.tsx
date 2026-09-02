import { useState } from 'react'
import {
  DownloadSimpleIcon,
  ListIcon,
  UsbIcon,
} from '@phosphor-icons/react'
import { Brand } from './Brand'
import { LanguageSwitcher } from './LanguageSwitcher'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { useLanguage } from '@/lib/i18n'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useLanguage()

  const navLinks = [
    { label: t.nav.overview, href: '#product' },
    { label: t.nav.showcase, href: '#gallery' },
    { label: t.nav.workflow, href: '#workflow' },
    { label: t.nav.specs, href: '#tech-specs' },
    { label: t.nav.results, href: 'webportal/' },
    { label: t.nav.downloads, href: '#downloads' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/85 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a className="no-underline transition-opacity hover:opacity-90" href="#top">
          <Brand />
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Desktop actions: Language Switcher + Portal + Download */}
        <div className="hidden items-center gap-2.5 md:flex">
          <LanguageSwitcher />

          <div className="h-4 w-px bg-border/80" />

          <Button variant="outline" size="sm" nativeButton={false} render={<a href="webportal/" />}>
            <UsbIcon data-icon="inline-start" />
            {t.nav.portal}
          </Button>

          <Button size="sm" nativeButton={false} render={<a href="#downloads" />}>
            <DownloadSimpleIcon data-icon="inline-start" />
            {t.nav.downloadApp}
          </Button>
        </div>

        {/* Mobile top bar actions */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher variant="outline" size="xs" />

          <Button variant="outline" size="xs" nativeButton={false} render={<a href="webportal/" />}>
            <UsbIcon data-icon="inline-start" />
            {t.nav.portal}
          </Button>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon-sm" aria-label="Open navigation menu" />}>
              <ListIcon className="size-5" />
            </SheetTrigger>
            <SheetContent side="right" className="flex w-72 flex-col justify-between p-6">
              <div className="flex flex-col gap-6">
                <SheetHeader className="p-0 text-left">
                  <SheetTitle>
                    <Brand />
                  </SheetTitle>
                </SheetHeader>
                <nav className="flex flex-col gap-2">
                  {navLinks.map((link) => (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="flex flex-col gap-3 border-t border-border pt-4">
                <div className="flex items-center justify-between px-1">
                  <span className="text-xs text-muted-foreground">{t.nav.language}:</span>
                  <LanguageSwitcher variant="outline" size="xs" />
                </div>
                <Button nativeButton={false} render={<a href="#downloads" onClick={() => setIsOpen(false)} />}>
                  <DownloadSimpleIcon data-icon="inline-start" />
                  {t.nav.downloadApp}
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
