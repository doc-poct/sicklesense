import { ArrowRightIcon, LockKeyIcon, UsbIcon } from '@phosphor-icons/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export function PhonePortalPromo() {
  return (
    <section className="mx-auto w-full max-w-[94rem] px-8 py-24 max-md:px-5 max-md:py-17" id="phone-results">
      <Card className="grid items-center overflow-hidden md:grid-cols-[minmax(0,1fr)_auto]">
        <CardHeader className="p-8 md:p-12">
          <CardTitle className="text-[clamp(2rem,4vw,3.5rem)] tracking-[-0.04em]">Results from your phone.</CardTitle>
          <CardDescription className="max-w-2xl text-base leading-relaxed">Open the secure Phone Results portal to connect an approved Android phone, review completed tests, preview artifacts, and download integrity-checked ZIPs.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4 border-t p-8 md:min-w-96 md:border-t-0 md:border-l md:p-12">
          <Button size="lg" nativeButton={false} render={<a href="webportal/" />}><UsbIcon data-icon="inline-start" />Open Phone Results portal<ArrowRightIcon data-icon="inline-end" /></Button>
          <p className="flex items-start gap-2 text-xs leading-relaxed text-muted-foreground"><LockKeyIcon className="mt-0.5 shrink-0" />No server upload or browser storage. ZIP downloads are the only persistent computer output.</p>
        </CardContent>
      </Card>
    </section>
  )
}
