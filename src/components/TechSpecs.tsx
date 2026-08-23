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

export function TechSpecs() {
  return (
    <section className="section-deferred border-t border-border/60 bg-muted/30 py-20 lg:py-28" id="tech-specs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="mb-3 px-3 py-1 text-xs">
            PRODUCT SPECIFICATIONS
          </Badge>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl text-balance">
            Integrated hardware, companion app, and portal.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground text-pretty">
            A cohesive diagnostic platform connecting precision optics, mobile control, and secure data export.
          </p>
        </div>

        <div className="mt-12">
          <Tabs defaultValue="box" className="w-full">
            <div className="flex justify-center">
              <TabsList className="grid h-10 w-full max-w-md grid-cols-3">
                <TabsTrigger value="box" className="text-xs">
                  <CpuIcon className="size-3.5" />
                  Testing Device
                </TabsTrigger>
                <TabsTrigger value="app" className="text-xs">
                  <DeviceMobileIcon className="size-3.5" />
                  Mobile App
                </TabsTrigger>
                <TabsTrigger value="webusb" className="text-xs">
                  <UsbIcon className="size-3.5" />
                  Web Portal
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
                      Built-in AI Engine
                    </CardTitle>
                    <CardDescription>On-Device Processing</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 text-xs text-muted-foreground space-y-2">
                    <p><strong className="text-foreground">Processor:</strong> Dedicated multi-core embedded AI unit</p>
                    <p><strong className="text-foreground">Inference:</strong> Instant cellular morphology classification</p>
                    <p><strong className="text-foreground">Operation:</strong> 100% offline self-contained analysis</p>
                    <p><strong className="text-foreground">Power Input:</strong> Standard 5V USB-C rechargeable</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-6">
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      <TreeStructureIcon className="size-4.5 text-primary" />
                      Optics &amp; Sensors
                    </CardTitle>
                    <CardDescription>Micro-Imaging Stage</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 text-xs text-muted-foreground space-y-2">
                    <p><strong className="text-foreground">Sensor:</strong> High-resolution micro-optical sensor</p>
                    <p><strong className="text-foreground">Illumination:</strong> Calibrated narrow-band LED source</p>
                    <p><strong className="text-foreground">Chamber:</strong> Light-shielded microfluidic slide dock</p>
                    <p><strong className="text-foreground">Resolution:</strong> High-magnification cellular view</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-6">
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      <CodeBlockIcon className="size-4.5 text-primary" />
                      Field Durability
                    </CardTitle>
                    <CardDescription>Rugged Portable Enclosure</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 text-xs text-muted-foreground space-y-2">
                    <p><strong className="text-foreground">Enclosure:</strong> Shock-resistant field housing</p>
                    <p><strong className="text-foreground">Form Factor:</strong> Compact, lightweight handheld footprint</p>
                    <p><strong className="text-foreground">Battery Life:</strong> All-day mobile screening capable</p>
                    <p><strong className="text-foreground">Environment:</strong> Designed for tropical field clinics</p>
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
                      <FlaskIcon className="size-3 text-primary" /> Prototype Stage
                    </Badge>
                    <h3 className="font-heading text-xs font-bold text-foreground">IIT Bhilai Optical Unit</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Lab-validated functional prototype with calibrated light chamber.</p>
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
                      <ShieldCheckIcon className="size-3 text-primary" /> Production Target
                    </Badge>
                    <h3 className="font-heading text-xs font-bold text-foreground">IBITF Medical Enclosure</h3>
                    <p className="text-[11px] text-muted-foreground mt-0.5">Sterilizable polymer body designed for field clinic deployment.</p>
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
                      Operator Experience
                    </CardTitle>
                    <CardDescription>Android Companion</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 text-xs text-muted-foreground space-y-2">
                    <p><strong className="text-foreground">Compatibility:</strong> Android 8.0 or higher</p>
                    <p><strong className="text-foreground">Interface:</strong> Step-by-step visual timers &amp; alerts</p>
                    <p><strong className="text-foreground">Storage:</strong> Local encrypted patient records</p>
                    <p><strong className="text-foreground">Connectivity:</strong> Zero cellular or Wi-Fi requirement</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-6">
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      <LockKeyIcon className="size-4.5 text-primary" />
                      Data Security
                    </CardTitle>
                    <CardDescription>Operator &amp; Patient Privacy</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 text-xs text-muted-foreground space-y-2">
                    <p><strong className="text-foreground">Authentication:</strong> PIN / Biometric operator login</p>
                    <p><strong className="text-foreground">Encryption:</strong> High-grade local database protection</p>
                    <p><strong className="text-foreground">Anonymization:</strong> De-identified demographic tokens</p>
                    <p><strong className="text-foreground">Integrity:</strong> Tamper-evident test result logs</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-6">
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      <HardDrivesIcon className="size-4.5 text-primary" />
                      Clinical Reporting
                    </CardTitle>
                    <CardDescription>Instant Documentation</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 text-xs text-muted-foreground space-y-2">
                    <p><strong className="text-foreground">PDF Generation:</strong> On-device instant report creation</p>
                    <p><strong className="text-foreground">Export:</strong> Direct USB transfer or local sharing</p>
                    <p><strong className="text-foreground">Languages:</strong> Multi-language regional support</p>
                    <p><strong className="text-foreground">Standard:</strong> Standardized diagnostic format</p>
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
                    <DeviceMobileIcon className="size-3 text-primary" /> Offline UI
                  </Badge>
                  <h3 className="font-heading text-xs font-bold text-foreground">JeevDristi Android Application</h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">Streamlined operator dashboard with searchable patient histories and local PDF exports.</p>
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
                      Direct USB Link
                    </CardTitle>
                    <CardDescription>Zero-Install Protocol</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 text-xs text-muted-foreground space-y-2">
                    <p><strong className="text-foreground">Browser:</strong> Works directly in Chrome and Edge</p>
                    <p><strong className="text-foreground">Install:</strong> Zero software installation needed on PC</p>
                    <p><strong className="text-foreground">Connection:</strong> Standard USB-C to USB-A/C cable</p>
                    <p><strong className="text-foreground">Speed:</strong> Instantaneous local data transfer</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-6">
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      <ShieldCheckIcon className="size-4.5 text-primary" />
                      Zero-Cloud Privacy
                    </CardTitle>
                    <CardDescription>Complete Data Sovereignty</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 text-xs text-muted-foreground space-y-2">
                    <p><strong className="text-foreground">Storage:</strong> No tracking cookies or browser storage</p>
                    <p><strong className="text-foreground">Servers:</strong> Zero external server uploads</p>
                    <p><strong className="text-foreground">Session:</strong> Ephemeral in-memory transfer</p>
                    <p><strong className="text-foreground">PIN Code:</strong> 6-digit physical confirmation code</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-6">
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      <CodeBlockIcon className="size-4.5 text-primary" />
                      Data Packaging
                    </CardTitle>
                    <CardDescription>Verified Archive Format</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 text-xs text-muted-foreground space-y-2">
                    <p><strong className="text-foreground">Format:</strong> Verified ZIP package with test records</p>
                    <p><strong className="text-foreground">Artifacts:</strong> Clinical PDF + Micrographs + Summary</p>
                    <p><strong className="text-foreground">Integrity:</strong> Checksum-verified data bundle</p>
                    <p><strong className="text-foreground">Compatibility:</strong> Ready for clinic database import</p>
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
                    <SparkleIcon className="size-3 text-primary" /> AI Morphology Reports
                  </Badge>
                  <h3 className="font-heading text-xs font-bold text-foreground">Diagnostic Result Inspection</h3>
                  <p className="text-[11px] text-muted-foreground mt-0.5">High-magnification cell images, clear negative/positive status, and complete diagnostic packages.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
