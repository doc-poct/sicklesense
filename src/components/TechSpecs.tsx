import {
  CodeBlockIcon,
  CpuIcon,
  DeviceMobileIcon,
  HardDrivesIcon,
  LockKeyIcon,
  ShieldCheckIcon,
  TreeStructureIcon,
  UsbIcon,
} from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export function TechSpecs() {
  return (
    <section className="border-t border-border/60 bg-muted/30 py-20 lg:py-28" id="tech-specs">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="mb-3 px-3 py-1 text-xs">
            SYSTEM ARCHITECTURE
          </Badge>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Modern, modular, and built on open standards.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground">
            A three-tier topology connecting embedded edge optics, mobile field control, and zero-install desktop export.
          </p>
        </div>

        <div className="mt-12">
          <Tabs defaultValue="box" className="w-full">
            <div className="flex justify-center">
              <TabsList className="grid h-10 w-full max-w-md grid-cols-3">
                <TabsTrigger value="box" className="text-xs">
                  <CpuIcon className="size-3.5" />
                  POCT Box
                </TabsTrigger>
                <TabsTrigger value="app" className="text-xs">
                  <DeviceMobileIcon className="size-3.5" />
                  Mobile App
                </TabsTrigger>
                <TabsTrigger value="webusb" className="text-xs">
                  <UsbIcon className="size-3.5" />
                  WebUSB Portal
                </TabsTrigger>
              </TabsList>
            </div>

            {/* POCT Box Specs */}
            <TabsContent value="box" className="mt-6">
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader className="p-6">
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      <CpuIcon className="size-4.5 text-primary" />
                      Compute Core
                    </CardTitle>
                    <CardDescription>Raspberry Pi Zero 2W</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 text-xs text-muted-foreground space-y-2">
                    <p><strong className="text-foreground">CPU:</strong> Quad-core 64-bit ARM Cortex-A53 @ 1.0 GHz</p>
                    <p><strong className="text-foreground">RAM:</strong> 512MB LPDDR2 SDRAM</p>
                    <p><strong className="text-foreground">OS:</strong> Linux embedded runtime (Read-only rootfs)</p>
                    <p><strong className="text-foreground">Power:</strong> 5V Micro-USB / USB-C &lt; 5W</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-6">
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      <TreeStructureIcon className="size-4.5 text-primary" />
                      Optics &amp; Sensors
                    </CardTitle>
                    <CardDescription>Custom Micro-Imaging Stage</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 text-xs text-muted-foreground space-y-2">
                    <p><strong className="text-foreground">Sensor:</strong> High-resolution CMOS optical sensor</p>
                    <p><strong className="text-foreground">Illumination:</strong> Calibrated narrow-band LED source</p>
                    <p><strong className="text-foreground">Chamber:</strong> Light-shielded microfluidic slide dock</p>
                    <p><strong className="text-foreground">Resolution:</strong> 1080p cellular field-of-view</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-6">
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      <CodeBlockIcon className="size-4.5 text-primary" />
                      Embedded CV/ML
                    </CardTitle>
                    <CardDescription>Local Edge Pipeline</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 text-xs text-muted-foreground space-y-2">
                    <p><strong className="text-foreground">Model:</strong> Quantized MobileNet / Edge-TFLite</p>
                    <p><strong className="text-foreground">Inference Time:</strong> &lt; 250ms per multi-frame ROI</p>
                    <p><strong className="text-foreground">Task:</strong> Sickled cell morphology &amp; count</p>
                    <p><strong className="text-foreground">Security:</strong> Signed weights &amp; firmware verification</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Mobile App Specs */}
            <TabsContent value="app" className="mt-6">
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader className="p-6">
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      <DeviceMobileIcon className="size-4.5 text-primary" />
                      Flutter Architecture
                    </CardTitle>
                    <CardDescription>Android Companion</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 text-xs text-muted-foreground space-y-2">
                    <p><strong className="text-foreground">Framework:</strong> Flutter 3.x with Dart 3</p>
                    <p><strong className="text-foreground">Compatibility:</strong> Android 8.0+ (API 26+)</p>
                    <p><strong className="text-foreground">Storage:</strong> Local encrypted SQLite database</p>
                    <p><strong className="text-foreground">Offline:</strong> 100% functionality without internet</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-6">
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      <LockKeyIcon className="size-4.5 text-primary" />
                      Field Security
                    </CardTitle>
                    <CardDescription>Operator &amp; Patient Privacy</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 text-xs text-muted-foreground space-y-2">
                    <p><strong className="text-foreground">Auth:</strong> Local PIN / Biometric operator login</p>
                    <p><strong className="text-foreground">Encryption:</strong> AES-256 local database encryption</p>
                    <p><strong className="text-foreground">Anonymization:</strong> De-identified demographic tokens</p>
                    <p><strong className="text-foreground">Audit Trail:</strong> Immutable tamper-evident test log</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-6">
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      <HardDrivesIcon className="size-4.5 text-primary" />
                      Diagnostics Suite
                    </CardTitle>
                    <CardDescription>Clinical Reporting</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 text-xs text-muted-foreground space-y-2">
                    <p><strong className="text-foreground">PDF Engine:</strong> Embedded native PDF rendering</p>
                    <p><strong className="text-foreground">Export:</strong> Direct USB-AOA or local sharing</p>
                    <p><strong className="text-foreground">Sync:</strong> Optional delayed cloud backup when online</p>
                    <p><strong className="text-foreground">Language:</strong> Multi-language UI for rural health camps</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* WebUSB Portal Specs */}
            <TabsContent value="webusb" className="mt-6">
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader className="p-6">
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      <UsbIcon className="size-4.5 text-primary" />
                      USB-AOA Transport
                    </CardTitle>
                    <CardDescription>Zero-Install Protocol</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 text-xs text-muted-foreground space-y-2">
                    <p><strong className="text-foreground">Standard:</strong> Android Open Accessory (AOA 2.0)</p>
                    <p><strong className="text-foreground">Browser:</strong> Chrome / Edge with WebUSB API</p>
                    <p><strong className="text-foreground">Driver:</strong> WinUSB on Windows / Standard udev on Linux</p>
                    <p><strong className="text-foreground">Speed:</strong> Direct USB 2.0 full-speed stream</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-6">
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      <ShieldCheckIcon className="size-4.5 text-primary" />
                      Zero-Cloud Guarantee
                    </CardTitle>
                    <CardDescription>Complete Data Sovereignty</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 text-xs text-muted-foreground space-y-2">
                    <p><strong className="text-foreground">Storage:</strong> No browser cookies, localStorage, or IndexedDB</p>
                    <p><strong className="text-foreground">Servers:</strong> Zero backend server uploads</p>
                    <p><strong className="text-foreground">Session:</strong> Ephemeral in-memory memory stream</p>
                    <p><strong className="text-foreground">PIN Code:</strong> Physical 6-digit confirmation prompt</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="p-6">
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                      <CodeBlockIcon className="size-4.5 text-primary" />
                      Integrity &amp; Packaging
                    </CardTitle>
                    <CardDescription>ZIP Bundle Format</CardDescription>
                  </CardHeader>
                  <CardContent className="p-6 pt-0 text-xs text-muted-foreground space-y-2">
                    <p><strong className="text-foreground">Format:</strong> Standard ZIP package with manifest</p>
                    <p><strong className="text-foreground">Artifacts:</strong> Clinical PDF + Cropped Images + JSON</p>
                    <p><strong className="text-foreground">Checksum:</strong> SHA-256 payload integrity check</p>
                    <p><strong className="text-foreground">Interoperability:</strong> HL7 FHIR compatible JSON</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  )
}
