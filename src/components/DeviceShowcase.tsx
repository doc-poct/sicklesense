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

const showcaseCards = [
  {
    id: 'prototype',
    badge: 'IIT Bhilai Unit',
    badgeVariant: 'secondary' as const,
    title: 'Prototype Focus',
    subtitle: 'Celebrating Innovation: Functional Prototype',
    description:
      'Lab-tested optical unit engineered at IIT Bhilai, pairing precision LED illumination with a dedicated companion stand for real-time sample processing.',
    image: poctPrototypeImg,
    alt: 'IIT Bhilai functional POCT device prototype beside mobile companion',
    icon: FlaskIcon,
    highlights: ['Micro-optical stage', 'IIT Bhilai seal & calibrated dock', 'Live companion synchronization'],
  },
  {
    id: 'app',
    badge: 'Android Companion',
    badgeVariant: 'secondary' as const,
    title: 'App Control & Reports',
    subtitle: 'Seamless Data Access',
    description:
      'JeevDristi Android interface providing comprehensive patient search, organized test history, and instant clinical report generation completely offline.',
    image: jeevdristiAppImg,
    alt: 'JeevDristi mobile application showing recent test records',
    icon: DeviceMobileIcon,
    highlights: ['100% Offline patient database', 'Recent reports & search filters', 'Instant PDF clinical summaries'],
  },
  {
    id: 'medical',
    badge: 'Production Target',
    badgeVariant: 'secondary' as const,
    title: 'Final Product Concept - Medical Grade',
    subtitle: 'Future Ready: Production Grade Materials',
    description:
      'Next-generation clinical enclosure designed to IBITF medical standards, featuring light-shielded cartridge insertion and durable, sterilizable field housing.',
    image: poctMedicalUnitImg,
    alt: 'IBITF medical grade POCT device concept with inserted test sample',
    icon: ShieldCheckIcon,
    highlights: ['IBITF institutional design', 'Light-shielded sample chamber', 'Ultra-rugged clinical durability'],
  },
  {
    id: 'analytics',
    badge: 'AI Diagnostics',
    badgeVariant: 'secondary' as const,
    title: 'Detailed Analytics',
    subtitle: 'Instant, Clear Results',
    description:
      'Direct on-device AI morphology analysis delivering unequivocal negative vs. positive classifications with full cellular metrics and micrograph inspection.',
    image: diagnosticAnalyticsImg,
    alt: 'Dual mobile screens demonstrating negative and positive diagnostic test details',
    icon: SparkleIcon,
    highlights: ['On-device RBC classification', 'Clear green/red diagnostic alerts', 'High-res micrograph audit trail'],
  },
]

export function DeviceShowcase() {
  return (
    <section className="section-deferred relative border-t border-border/60 bg-muted/10 py-20 lg:py-28" id="gallery">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center">
          <Badge variant="outline" className="mb-3 gap-1.5 px-3 py-1 text-xs">
            <SparkleIcon className="size-3 text-primary" weight="fill" />
            PLATFORM SHOWCASE
          </Badge>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl lg:text-5xl text-balance">
            Complete ecosystem from optics to mobile analytics.
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg text-pretty">
            Explore the physical optical unit, companion application, medical enclosure, and diagnostic reporting engineered for field reliability.
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
