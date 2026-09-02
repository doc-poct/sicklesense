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
import { useLanguage } from '@/lib/i18n'

const FEATURE_ICONS = [
  WifiSlashIcon,
  ShieldCheckIcon,
  UsbIcon,
  FileTextIcon,
  BatteryChargingIcon,
  CpuIcon,
]

export function ProjectOverview() {
  const { t } = useLanguage()

  return (
    <section className="section-deferred scroll-mt-20 relative border-y border-border/60 bg-muted/20 py-20 lg:py-28" id="product">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="mb-3 gap-1.5 px-3 py-1 text-xs">
            <SparkleIcon className="size-3 text-primary" weight="fill" />
            {t.projectOverview.badge}
          </Badge>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
            {t.projectOverview.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty">
            {t.projectOverview.description}
          </p>
        </div>

        {/* Bento Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.projectOverview.features.map((feature, idx) => {
            const Icon = FEATURE_ICONS[idx % FEATURE_ICONS.length]
            return (
              <Card
                key={feature.title}
                className="group relative flex flex-col justify-between border-border/70 bg-card transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5"
              >
                <CardHeader className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon className="size-5.5" weight="duotone" />
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
            )
          })}
        </div>
      </div>
    </section>
  )
}
