import {
  CheckCircleIcon,
  DeviceMobileIcon,
  FlaskIcon,
  ShieldCheckIcon,
  SparkleIcon,
} from '@phosphor-icons/react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import poctPrototypeImg from '../assets/poct-prototype.webp'
import jeevdristiAppImg from '../assets/jeevdristi-app.webp'
import poctMedicalUnitImg from '../assets/poct-medical-unit.webp'
import diagnosticAnalyticsImg from '../assets/diagnostic-analytics.webp'
import { useLanguage } from '@/lib/i18n'

export function DeviceShowcase() {
  const { t } = useLanguage()

  const showcaseCards = [
    {
      id: 'prototype',
      badge: t.showcase.cards.prototype.badge,
      badgeVariant: 'secondary' as const,
      title: t.showcase.cards.prototype.title,
      subtitle: t.showcase.cards.prototype.subtitle,
      description: t.showcase.cards.prototype.description,
      image: poctPrototypeImg,
      alt: 'IIT Bhilai functional POCT device prototype beside mobile companion',
      icon: FlaskIcon,
      highlights: t.showcase.cards.prototype.highlights,
    },
    {
      id: 'app',
      badge: t.showcase.cards.app.badge,
      badgeVariant: 'secondary' as const,
      title: t.showcase.cards.app.title,
      subtitle: t.showcase.cards.app.subtitle,
      description: t.showcase.cards.app.description,
      image: jeevdristiAppImg,
      alt: 'JeevDristi mobile application showing recent test records',
      icon: DeviceMobileIcon,
      highlights: t.showcase.cards.app.highlights,
    },
    {
      id: 'medical',
      badge: t.showcase.cards.medical.badge,
      badgeVariant: 'secondary' as const,
      title: t.showcase.cards.medical.title,
      subtitle: t.showcase.cards.medical.subtitle,
      description: t.showcase.cards.medical.description,
      image: poctMedicalUnitImg,
      alt: 'IBITF medical grade POCT device concept with inserted test sample',
      icon: ShieldCheckIcon,
      highlights: t.showcase.cards.medical.highlights,
    },
    {
      id: 'analytics',
      badge: t.showcase.cards.analytics.badge,
      badgeVariant: 'secondary' as const,
      title: t.showcase.cards.analytics.title,
      subtitle: t.showcase.cards.analytics.subtitle,
      description: t.showcase.cards.analytics.description,
      image: diagnosticAnalyticsImg,
      alt: 'Dual mobile screens demonstrating negative and positive diagnostic test details',
      icon: SparkleIcon,
      highlights: t.showcase.cards.analytics.highlights,
    },
  ]

  return (
    <section className="section-deferred scroll-mt-20 relative border-t border-border/60 bg-muted/10 py-20 lg:py-28" id="gallery">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="mb-3 gap-1.5 px-3 py-1 text-xs">
            <SparkleIcon className="size-3 text-primary" weight="fill" />
            {t.showcase.badge}
          </Badge>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
            {t.showcase.heading}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty">
            {t.showcase.description}
          </p>
        </div>

        {/* 4-Card Showcase Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {showcaseCards.map((card) => {
            const Icon = card.icon
            return (
              <Card
                key={card.id}
                className="group relative flex flex-col justify-between overflow-hidden border-border/70 bg-card transition-all duration-300 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5"
              >
                {/* Image Container */}
                <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-border/50 bg-gradient-to-b from-muted/20 to-muted/60 p-3">
                  <div className="flex size-full items-center justify-center overflow-hidden rounded-lg bg-background/60 shadow-xs">
                    <img
                      src={card.image}
                      alt={card.alt}
                      className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
                      width="510"
                      height="560"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  <Badge
                    variant={card.badgeVariant}
                    className="absolute top-4 left-4 text-[10px] font-mono shadow-xs backdrop-blur-md"
                  >
                    {card.badge}
                  </Badge>
                </div>

                {/* Card Body */}
                <CardContent className="flex flex-1 flex-col justify-between p-5">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-2 text-primary">
                      <Icon className="size-4 shrink-0" weight="duotone" />
                      <span className="text-[11px] font-semibold tracking-wide uppercase">
                        {card.title}
                      </span>
                    </div>

                    <h3 className="mt-1.5 font-heading text-sm font-bold leading-snug text-foreground">
                      {card.subtitle}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                      {card.description}
                    </p>
                  </div>

                  {/* Highlights list */}
                  <div className="mt-5 border-t border-border/40 pt-3">
                    <ul className="flex flex-col gap-1 text-[11px] text-muted-foreground">
                      {card.highlights.map((h, i) => (
                        <li key={i} className="flex items-center gap-1.5">
                          <CheckCircleIcon className="size-3 text-emerald-500 shrink-0" weight="fill" />
                          <span className="truncate">{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
