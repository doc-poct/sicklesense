import { useState } from 'react'
import {
  DownloadSimpleIcon,
  ListIcon,
  UsbIcon,
} from '@phosphor-icons/react'
import { Brand } from './Brand'
import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { label: 'Overview', href: '#product' },
    { label: 'Showcase', href: '#gallery' },
    { label: 'Workflow', href: '#workflow' },
    { label: 'Specifications', href: '#tech-specs' },
    { label: 'Phone Results', href: 'webportal/' },
    { label: 'Downloads', href: '#downloads' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-md transition-colors">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a className="no-underline transition-opacity hover:opacity-90" href="#top" aria-label="JeevDristi home">
          <Brand />
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary navigation">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="rounded-md px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-muted/60 hover:text-foreground"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-2.5 md:flex">
          <Button variant="outline" size="sm" nativeButton={false} render={<a href="webportal/" />}>
            <UsbIcon data-icon="inline-start" />
            Web Portal
          </Button>

          <Button size="sm" nativeButton={false} render={<a href="#downloads" />}>
            <DownloadSimpleIcon data-icon="inline-start" />
            Download App
          </Button>
        </div>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 md:hidden">
          <Button variant="outline" size="xs" nativeButton={false} render={<a href="webportal/" />}>
            <UsbIcon data-icon="inline-start" />
            Portal
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
                      key={link.label}
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="flex flex-col gap-2.5 border-t border-border pt-4">
                <Button nativeButton={false} render={<a href="#downloads" onClick={() => setIsOpen(false)} />}>
                  <DownloadSimpleIcon data-icon="inline-start" />
                  Download App
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
