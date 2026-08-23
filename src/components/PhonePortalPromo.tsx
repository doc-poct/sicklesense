import { ArrowRightIcon, CheckCircleIcon, LockKeyIcon, ShieldCheckIcon, UsbIcon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

export function PhonePortalPromo() {
  return (
    <section className="section-deferred mx-auto w-full max-w-7xl px-4 py-16 sm:px-6 lg:px-8" id="phone-results">
      <Card className="relative overflow-hidden border-border/80 bg-gradient-to-br from-card via-card to-primary/5 p-2 shadow-xl sm:p-4">
        {/* Subtle decorative glow */}
        <div
          className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-primary/10 blur-3xl"
          aria-hidden="true"
        />

        <div className="grid items-center gap-8 p-6 lg:grid-cols-12 lg:p-8">
          <div className="lg:col-span-7">
            <Badge variant="outline" className="mb-4 gap-1.5 px-3 py-1 text-xs">
              <UsbIcon className="size-3 text-primary" weight="bold" />
              DIRECT PHONE EXPORT
            </Badge>

            <h2 className="font-heading text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl lg:text-4xl text-balance">
              Inspect results directly from your phone.
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base text-pretty">
              Connect your Android device via standard USB cable to access the zero-cloud Web Portal. Review patient test histories, preview generated PDF clinical summaries, inspect cropped cellular images, and download integrity-verified ZIP packages directly onto your desktop.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-1.5">
                <CheckCircleIcon className="size-4 text-emerald-500" weight="fill" />
                <span>Zero cloud upload</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircleIcon className="size-4 text-emerald-500" weight="fill" />
                <span>Zero browser storage</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircleIcon className="size-4 text-emerald-500" weight="fill" />
                <span>PIN code authorization</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-4 rounded-xl border border-border/70 bg-background/90 p-6 shadow-sm backdrop-blur-sm lg:col-span-5">
            <div className="flex items-center gap-3">
              <span className="grid size-10 place-items-center rounded-lg bg-primary/10 text-primary">
                <ShieldCheckIcon className="size-5" weight="duotone" />
              </span>
              <div>
                <h3 className="font-heading text-sm font-bold text-foreground">Phone Results Portal</h3>
                <p className="text-xs text-muted-foreground">Hardware-authenticated WebUSB session</p>
              </div>
            </div>

            <p className="text-xs leading-relaxed text-muted-foreground">
              No software installation required on your computer. Open directly in Chrome or Edge.
            </p>

            <Button size="lg" className="w-full font-semibold" nativeButton={false} render={<a href="webportal/" />}>
              <UsbIcon data-icon="inline-start" />
              Open Phone Results Portal
              <ArrowRightIcon data-icon="inline-end" />
            </Button>

            <p className="flex items-center gap-1.5 text-[11px] text-muted-foreground">
              <LockKeyIcon className="size-3.5 shrink-0" />
              <span>Data stays strictly between your phone and this browser.</span>
            </p>
          </div>
        </div>
      </Card>
    </section>
  )
}
