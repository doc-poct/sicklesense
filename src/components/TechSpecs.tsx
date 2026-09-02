import {
  CodeBlockIcon,
  CpuIcon,
  DeviceMobileIcon,
  FlaskIcon,
  HardDrivesIcon,
  LockKeyIcon,
  ShieldCheckIcon,
  SparkleIcon,
  TreeStructureIcon,
  UsbIcon,
} from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import poctPrototypeImg from '../assets/poct-prototype.webp'
import jeevdristiAppImg from '../assets/jeevdristi-app.webp'
import poctMedicalUnitImg from '../assets/poct-medical-unit.webp'
import diagnosticAnalyticsImg from '../assets/diagnostic-analytics.webp'
import { useLanguage } from '@/lib/i18n'

export function TechSpecs() {
  const { t } = useLanguage()

  return (
    <section className="section-deferred scroll-mt-20 border-t border-border/60 bg-muted/30 py-20 lg:py-28" id="tech-specs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="mb-3 px-3 py-1 text-xs">
            {t.techSpecs.badge}
          </Badge>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl text-balance">
            {t.techSpecs.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
            {t.techSpecs.description}
          </p>
        </div>

        <div className="mt-12">
          <Tabs defaultValue="box" className="w-full">
            <div className="flex justify-center">
              <TabsList className="grid h-10 w-full max-w-md grid-cols-3">
                <TabsTrigger value="box" className="text-xs">
                  <CpuIcon className="size-3.5" />
                  {t.techSpecs.tabBox}
                </TabsTrigger>
                <TabsTrigger value="app" className="text-xs">
                  <DeviceMobileIcon className="size-3.5" />
                  {t.techSpecs.tabApp}
                </TabsTrigger>
                <TabsTrigger value="webusb" className="text-xs">
                  <UsbIcon className="size-3.5" />
                  {t.techSpecs.tabPortal}
                </TabsTrigger>
              </TabsList>
            </div>

            {/* POCT Device Specs */}
            <TabsContent value="box" className="mt-6">
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader className="p-6">
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      <CpuIcon className="size-4.5 text-primary" />
                      {t.techSpecs.box.card1Title}
                    </CardTitle>
                    <CardDescription>{t.techSpecs.box.card1Sub}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 text-xs text-muted-foreground space-y-2">
                    {t.techSpecs.box.card1Items.map((item) => (
                      <p key={item.label}>
                        <strong className="text-foreground">{item.label}:</strong> {item.value}
                      </p>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-6">
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      <TreeStructureIcon className="size-4.5 text-primary" />
                      {t.techSpecs.box.card2Title}
                    </CardTitle>
                    <CardDescription>{t.techSpecs.box.card2Sub}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 text-xs text-muted-foreground space-y-2">
                    {t.techSpecs.box.card2Items.map((item) => (
                      <p key={item.label}>
                        <strong className="text-foreground">{item.label}:</strong> {item.value}
                      </p>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-6">
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      <CodeBlockIcon className="size-4.5 text-primary" />
                      {t.techSpecs.box.card3Title}
                    </CardTitle>
                    <CardDescription>{t.techSpecs.box.card3Sub}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 text-xs text-muted-foreground space-y-2">
                    {t.techSpecs.box.card3Items.map((item) => (
                      <p key={item.label}>
                        <strong className="text-foreground">{item.label}:</strong> {item.value}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Hardware Visual Strip */}
              <div className="mt-6 grid gap-6 sm:grid-cols-2">
                <div className="flex items-center gap-4 rounded-xl border border-border/70 bg-card p-4">
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted/40 p-1">
                    <img
                      src={poctPrototypeImg}
                      alt="IIT Bhilai Functional Prototype"
                      className="size-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div>
                    <Badge variant="outline" className="text-[10px] mb-1 gap-1">
                      <FlaskIcon className="size-3 text-primary" /> {t.techSpecs.box.strip1Badge}
                    </Badge>
                    <h3 className="font-heading text-xs font-bold text-foreground">{t.techSpecs.box.strip1Title}</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{t.techSpecs.box.strip1Desc}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 rounded-xl border border-border/70 bg-card p-4">
                  <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted/40 p-1">
                    <img
                      src={poctMedicalUnitImg}
                      alt="IBITF Medical Grade Enclosure"
                      className="size-full object-contain"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <div>
                    <Badge variant="outline" className="text-[10px] mb-1 gap-1">
                      <ShieldCheckIcon className="size-3 text-primary" /> {t.techSpecs.box.strip2Badge}
                    </Badge>
                    <h3 className="font-heading text-xs font-bold text-foreground">{t.techSpecs.box.strip2Title}</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">{t.techSpecs.box.strip2Desc}</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Mobile App Specs */}
            <TabsContent value="app" className="mt-6">
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader className="p-6">
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      <DeviceMobileIcon className="size-4.5 text-primary" />
                      {t.techSpecs.app.card1Title}
                    </CardTitle>
                    <CardDescription>{t.techSpecs.app.card1Sub}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 text-xs text-muted-foreground space-y-2">
                    {t.techSpecs.app.card1Items.map((item) => (
                      <p key={item.label}>
                        <strong className="text-foreground">{item.label}:</strong> {item.value}
                      </p>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-6">
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      <LockKeyIcon className="size-4.5 text-primary" />
                      {t.techSpecs.app.card2Title}
                    </CardTitle>
                    <CardDescription>{t.techSpecs.app.card2Sub}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 text-xs text-muted-foreground space-y-2">
                    {t.techSpecs.app.card2Items.map((item) => (
                      <p key={item.label}>
                        <strong className="text-foreground">{item.label}:</strong> {item.value}
                      </p>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-6">
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      <HardDrivesIcon className="size-4.5 text-primary" />
                      {t.techSpecs.app.card3Title}
                    </CardTitle>
                    <CardDescription>{t.techSpecs.app.card3Sub}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 text-xs text-muted-foreground space-y-2">
                    {t.techSpecs.app.card3Items.map((item) => (
                      <p key={item.label}>
                        <strong className="text-foreground">{item.label}:</strong> {item.value}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* App Visual Strip */}
              <div className="mt-6 flex items-center gap-4 rounded-xl border border-border/70 bg-card p-4">
                <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted/40 p-1">
                  <img
                    src={jeevdristiAppImg}
                    alt="JeevDristi Mobile App Interface"
                    className="size-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div>
                  <Badge variant="outline" className="text-[10px] mb-1 gap-1">
                    <DeviceMobileIcon className="size-3 text-primary" /> {t.techSpecs.app.stripBadge}
                  </Badge>
                  <h3 className="font-heading text-xs font-bold text-foreground">{t.techSpecs.app.stripTitle}</h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{t.techSpecs.app.stripDesc}</p>
                </div>
              </div>
            </TabsContent>

            {/* WebUSB Portal Specs */}
            <TabsContent value="webusb" className="mt-6">
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader className="p-6">
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      <UsbIcon className="size-4.5 text-primary" />
                      {t.techSpecs.webusb.card1Title}
                    </CardTitle>
                    <CardDescription>{t.techSpecs.webusb.card1Sub}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 text-xs text-muted-foreground space-y-2">
                    {t.techSpecs.webusb.card1Items.map((item) => (
                      <p key={item.label}>
                        <strong className="text-foreground">{item.label}:</strong> {item.value}
                      </p>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-6">
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      <ShieldCheckIcon className="size-4.5 text-primary" />
                      {t.techSpecs.webusb.card2Title}
                    </CardTitle>
                    <CardDescription>{t.techSpecs.webusb.card2Sub}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 text-xs text-muted-foreground space-y-2">
                    {t.techSpecs.webusb.card2Items.map((item) => (
                      <p key={item.label}>
                        <strong className="text-foreground">{item.label}:</strong> {item.value}
                      </p>
                    ))}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-6">
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      <CodeBlockIcon className="size-4.5 text-primary" />
                      {t.techSpecs.webusb.card3Title}
                    </CardTitle>
                    <CardDescription>{t.techSpecs.webusb.card3Sub}</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 text-xs text-muted-foreground space-y-2">
                    {t.techSpecs.webusb.card3Items.map((item) => (
                      <p key={item.label}>
                        <strong className="text-foreground">{item.label}:</strong> {item.value}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              </div>

              {/* Portal / Diagnostics Visual Strip */}
              <div className="mt-6 flex items-center gap-4 rounded-xl border border-border/70 bg-card p-4">
                <div className="relative size-20 shrink-0 overflow-hidden rounded-lg bg-muted/40 p-1">
                  <img
                    src={diagnosticAnalyticsImg}
                    alt="Diagnostic Analytics and Reporting"
                    className="size-full object-contain"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div>
                  <Badge variant="outline" className="text-[10px] mb-1 gap-1">
                    <SparkleIcon className="size-3 text-primary" /> {t.techSpecs.webusb.stripBadge}
                  </Badge>
                  <h3 className="font-heading text-xs font-bold text-foreground">{t.techSpecs.webusb.stripTitle}</h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">{t.techSpecs.webusb.stripDesc}</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
