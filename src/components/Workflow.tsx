import {
  CheckFatIcon,
  DeviceMobileIcon,
  FlaskIcon,
  LightningIcon,
  UsbIcon,
} from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { useLanguage } from '@/lib/i18n'

const STEP_ICONS = [DeviceMobileIcon, FlaskIcon, LightningIcon, UsbIcon]

export function Workflow() {
  const { t } = useLanguage()

  return (
    <section className="section-deferred scroll-mt-20 py-20 lg:py-28" id="workflow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="mb-3 px-3 py-1 text-xs">
            {t.workflow.badge}
          </Badge>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
            {t.workflow.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty">
            {t.workflow.description}
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
            {t.workflow.steps.map((step, idx) => {
              const Icon = STEP_ICONS[idx % STEP_ICONS.length]
              return (
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
                      <Icon className="size-6" weight="duotone" />
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
                    <span>{t.workflow.completedPhase(idx + 1)}</span>
                  </div>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
