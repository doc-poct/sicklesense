import {
  CheckFatIcon,
  DeviceMobileIcon,
  FlaskIcon,
  LightningIcon,
  UsbIcon,
} from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'

const steps = [
  {
    step: '01',
    duration: '10 sec',
    title: 'Connect & Initialize',
    subtitle: 'Automatic device pairing',
    description:
      'Turn on the testing device and open JeevDristi on your phone. The app connects securely and completes automatic optical self-calibration.',
    icon: DeviceMobileIcon,
  },
  {
    step: '02',
    duration: '2 min',
    title: 'Load Specimen Slide',
    subtitle: 'Sample cartridge dock',
    description:
      'Insert the prepared blood cartridge into the light-shielded optical chamber. On-screen prompts confirm correct positioning and focus.',
    icon: FlaskIcon,
  },
  {
    step: '03',
    duration: '30 sec',
    title: 'Autonomous AI Scan',
    subtitle: 'Built-in diagnostic analysis',
    description:
      'The device captures high-resolution optical scans and executes built-in AI models to evaluate sickled cell morphology and cellular density.',
    icon: LightningIcon,
  },
  {
    step: '04',
    duration: 'Instant',
    title: 'Review & Export',
    subtitle: 'Verified clinical report',
    description:
      'View diagnostic classification immediately on the mobile app. Connect to any PC via USB cable to inspect artifacts and save complete records.',
    icon: UsbIcon,
  },
]

export function Workflow() {
  return (
    <section className="section-deferred py-20 lg:py-28" id="workflow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="mb-3 px-3 py-1 text-xs">
            STEP-BY-STEP OPERATION
          </Badge>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
            From sample to verified result. One unified flow.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty">
            Designed for minimal cognitive overhead so community health workers and clinicians can conduct rapid tests with high repeatability.
          </p>
        </div>

        {/* Workflow Steps Grid */}
        <div className="relative mt-16">
          {/* Connector line for desktop */}
          <div
            className="absolute top-1/2 left-8 right-8 -translate-y-8 hidden lg:block h-0.5 border-t-2 border-dashed border-border"
            aria-hidden="true"
          />

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, idx) => (
              <Card
                key={step.step}
                className="group relative flex flex-col justify-between border-border/80 bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:border-primary/50 hover:shadow-md"
              >
                <div className="flex flex-col">
                  {/* Top badges */}
                  <div className="mb-4 flex items-center justify-between">
                    <span className="font-mono text-xs font-bold text-primary">
                      STEP {step.step}
                    </span>
                    <Badge variant="secondary" className="text-[10px] font-mono">
                      {step.duration}
                    </Badge>
                  </div>

                  {/* Icon circle */}
                  <div className="mb-4 grid size-12 place-items-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-105">
                    <step.icon className="size-6" weight="duotone" />
                  </div>

                  <h3 className="font-heading text-base font-bold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-0.5 text-xs font-medium text-primary">
                    {step.subtitle}
                  </p>
                  <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 flex items-center gap-1.5 border-t border-border/50 pt-3 text-[11px] font-medium text-muted-foreground">
                  <CheckFatIcon className="size-3 text-emerald-500" weight="fill" />
                  <span>Phase {idx + 1} completed</span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
