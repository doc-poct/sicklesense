import {
  BatteryChargingIcon,
  CheckCircleIcon,
  CpuIcon,
  FileTextIcon,
  ShieldCheckIcon,
  SparkleIcon,
  UsbIcon,
  WifiSlashIcon,
} from '@phosphor-icons/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const features = [
  {
    icon: WifiSlashIcon,
    tag: 'Autonomous',
    title: '100% Offline AI Analysis',
    description:
      'Advanced computer vision models run directly inside the testing device. Complete screening autonomy in remote field clinics and rural health camps with zero internet or cloud dependency.',
    highlights: ['On-device morphology detection', 'No cloud delay or subscription fees', 'Local encrypted result storage'],
  },
  {
    icon: ShieldCheckIcon,
    tag: 'Quality Control',
    title: 'Standardized Guided Testing',
    description:
      'Interactive, clear on-screen guidance takes health workers step-by-step through sample preparation, optical calibration, incubation timing, and test completion.',
    highlights: ['Step-by-step visual timers', 'Error prevention checks', 'Operator test verification'],
  },
  {
    icon: UsbIcon,
    tag: 'Zero-Cloud',
    title: 'Direct USB Data Transfer',
    description:
      'Transfer completed test records directly from your Android phone to a computer using a standard USB cable—without uploading sensitive patient data to any external server.',
    highlights: ['6-digit PIN code confirmation', 'Zero computer software setup', 'End-to-end local privacy'],
  },
  {
    icon: FileTextIcon,
    tag: 'Diagnostics',
    title: 'Clinical Reports & Integrity',
    description:
      'Instant clinical PDF summary generation, high-resolution cell morphology inspection, and verified archive packages for seamless medical record integration.',
    highlights: ['Digital verification checks', 'Standardized medical format', 'Tamper-evident audit logs'],
  },
  {
    icon: BatteryChargingIcon,
    tag: 'Portability',
    title: 'Ultra-Low Power & Portable',
    description:
      'Engineered with an optimized optical chamber and calibrated illumination, powered for all-day mobile screening from any standard USB power bank or adapter.',
    highlights: ['Standard USB-C power input', 'Compact rugged enclosure', 'All-day field battery life'],
  },
  {
    icon: CpuIcon,
    tag: 'Engineering',
    title: 'Medical Grade Reliability',
    description:
      'Engineered with rigorous quality standards at IIT Bhilai. Calibrated optics, precision manufacturing, and validated diagnostic workflows.',
    highlights: ['Institutional quality standards', 'Consistent optical response', 'Field-tested durability'],
  },
]

export function ProjectOverview() {
  return (
    <section className="relative border-y border-border/60 bg-muted/20 py-20 lg:py-28" id="product">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="mb-3 gap-1.5 px-3 py-1 text-xs">
            <SparkleIcon className="size-3 text-primary" weight="fill" />
            ENGINEERED FOR THE FIELD
          </Badge>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            Designed around the realities of rural &amp; point-of-care clinics.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
            Every layer of the JeevDristi platform—from precision optics to intuitive mobile UI—is built to ensure high diagnostic reliability in resource-limited environments.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card
              key={feature.title}
              className="group relative flex flex-col justify-between border-border/70 bg-card transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
            >
              <CardHeader className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                    <feature.icon className="size-5.5" weight="duotone" />
                  </span>
                  <Badge variant="secondary" className="font-mono text-[10px]">
                    {feature.tag}
                  </Badge>
                </div>
                <CardTitle className="text-lg font-bold text-foreground">
                  {feature.title}
                </CardTitle>
                <CardDescription className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  {feature.description}
                </CardDescription>
              </CardHeader>

              <CardContent className="border-t border-border/40 p-6 pt-4">
                <ul className="flex flex-col gap-1.5 text-xs text-muted-foreground">
                  {feature.highlights.map((item) => (
                    <li key={item} className="flex items-center gap-2">
                      <CheckCircleIcon className="size-3.5 text-emerald-500 shrink-0" weight="fill" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
