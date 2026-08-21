import { useState } from 'react'
import {
  AndroidLogoIcon,
  ArrowRightIcon,
  CheckCircleIcon,
  CpuIcon,
  DeviceMobileIcon,
  FlaskIcon,
  LightningIcon,
  ShieldCheckIcon,
  SparkleIcon,
  UsbIcon,
  WifiSlashIcon,
} from '@phosphor-icons/react'
import poctPrototypeImg from '../assets/poct-prototype.png'
import jeevdristiAppImg from '../assets/jeevdristi-app.png'
import poctMedicalUnitImg from '../assets/poct-medical-unit.png'
import diagnosticAnalyticsImg from '../assets/diagnostic-analytics.png'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { RELEASES_PAGE_URL, type ReleaseDownloads } from '../releaseDownloads'

type HeroProps = {
  apk: ReleaseDownloads['apk']
  isLoading: boolean
}

const showcaseItems = [
  {
    id: 'prototype',
    title: 'Prototype Focus',
    subtitle: 'Celebrating Innovation: Functional Prototype',
    category: 'IIT Bhilai Unit',
    icon: FlaskIcon,
    image: poctPrototypeImg,
    alt: 'IIT Bhilai POCT functional prototype unit with mobile companion on stand',
    specs: [
      { label: 'Hardware', value: 'Optical Stage' },
      { label: 'Companion', value: 'Live Synced' },
      { label: 'Status', value: 'Functional' },
    ],
  },
  {
    id: 'app',
    title: 'App Control & Reports',
    subtitle: 'Seamless Data Access',
    category: 'Android App',
    icon: DeviceMobileIcon,
    image: jeevdristiAppImg,
    alt: 'JeevDristi mobile application interface showing recent patient test reports',
    specs: [
      { label: 'Interface', value: 'Touch UI' },
      { label: 'Offline', value: '100% Local' },
      { label: 'Reports', value: 'Instant PDF' },
    ],
  },
  {
    id: 'medical',
    title: 'Medical Grade Concept',
    subtitle: 'Future Ready: Production Grade Materials',
    category: 'Production Model',
    icon: ShieldCheckIcon,
    image: poctMedicalUnitImg,
    alt: 'IBITF medical-grade POCT enclosure concept with blood test cartridge dock',
    specs: [
      { label: 'Enclosure', value: 'Medical Shell' },
      { label: 'Standards', value: 'IBITF Grade' },
      { label: 'Durability', value: 'Field Ready' },
    ],
  },
  {
    id: 'analytics',
    title: 'Detailed Analytics',
    subtitle: 'Instant, Clear Results',
    category: 'AI Diagnostics',
    icon: SparkleIcon,
    image: diagnosticAnalyticsImg,
    alt: 'Dual smartphone screens showing negative and positive sickle cell diagnostic results',
    specs: [
      { label: 'Diagnosis', value: 'Morphology' },
      { label: 'Inference', value: 'On-Device' },
      { label: 'Accuracy', value: 'Micrographs' },
    ],
  },
]

export function Hero({ apk, isLoading }: HeroProps) {
  const [activeIdx, setActiveIdx] = useState(0)
  const current = showcaseItems[activeIdx]

  const downloadLabel = apk
    ? `Download Android App (v${apk.version})`
    : isLoading
      ? 'Preparing Download...'
      : 'Download Android App'

  const handleDownload = () => {
    const targetUrl = apk?.url ?? RELEASES_PAGE_URL
    const link = document.createElement('a')
    link.href = targetUrl
    link.style.display = 'none'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <section className="relative overflow-hidden bg-grid py-12 md:py-20 lg:py-24" id="top">
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[650px] rounded-full bg-primary/10 blur-[130px] opacity-70"
        aria-hidden="true"
      />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          {/* Left Column: Hero Copy */}
          <div className="hero-copy flex flex-col items-start lg:col-span-6 xl:col-span-7">
            <Badge variant="outline" className="mb-6 gap-2 rounded-full border-border/80 bg-background/80 px-3.5 py-1 text-xs font-medium shadow-xs backdrop-blur-sm">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
              </span>
              <span>IIT Bhilai Medical Innovation</span>
              <span className="text-muted-foreground">•</span>
              <span className="font-mono text-primary font-semibold">SickleSense POCT</span>
            </Badge>

            <h1 className="font-heading tracking-tight text-foreground">
              <span className="block text-3xl font-extrabold sm:text-4xl lg:text-5xl">
                Clarity at the
              </span>
              <span className="mt-1.5 block text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl bg-gradient-to-r from-primary via-teal-600 to-emerald-600 bg-clip-text text-transparent dark:from-primary dark:to-teal-400">
                point of care.
              </span>
            </h1>

            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Precision optical testing, on-device AI morphology analysis, and zero-cloud field reporting in one cohesive platform—engineered to work anywhere, even without internet.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                size="lg"
                className="h-11 px-5 text-sm font-semibold shadow-md shadow-primary/20 cursor-pointer"
                onClick={handleDownload}
                aria-label={downloadLabel}
              >
                <AndroidLogoIcon className="size-4.5" weight="bold" />
                {downloadLabel}
              </Button>

              <Button
                variant="outline"
                size="lg"
                className="h-11 px-5 text-sm font-semibold"
                nativeButton={false}
                render={<a href="webportal/" />}
              >
                <UsbIcon className="size-4.5" />
                Open Web Portal
                <ArrowRightIcon className="size-3.5 opacity-70" />
              </Button>
            </div>

            {/* Feature highlights pills */}
            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4 w-full pt-6 border-t border-border/60">
              <div className="flex items-center gap-2">
                <span className="grid size-7 place-items-center rounded-md bg-primary/10 text-primary">
                  <LightningIcon className="size-3.5" weight="fill" />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-foreground">&lt; 5 min</span>
                  <span className="text-[10px] text-muted-foreground">Rapid screening</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="grid size-7 place-items-center rounded-md bg-primary/10 text-primary">
                  <WifiSlashIcon className="size-3.5" weight="bold" />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-foreground">100% Offline</span>
                  <span className="text-[10px] text-muted-foreground">Zero internet needed</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="grid size-7 place-items-center rounded-md bg-primary/10 text-primary">
                  <UsbIcon className="size-3.5" weight="bold" />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-foreground">Direct USB Sync</span>
                  <span className="text-[10px] text-muted-foreground">Peer-to-peer export</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="grid size-7 place-items-center rounded-md bg-primary/10 text-primary">
                  <ShieldCheckIcon className="size-3.5" weight="fill" />
                </span>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-foreground">Verified</span>
                  <span className="text-[10px] text-muted-foreground">Diagnostic integrity</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Device & App Showcase Seamless Stage */}
          <div className="hero-product relative flex items-center justify-center lg:col-span-6 xl:col-span-5">
            <div className="relative w-full max-w-lg rounded-3xl border border-border/50 bg-card/40 p-4 shadow-xl backdrop-blur-md sm:p-6">
              {/* Ambient radial glow underlay for natural blending */}
              <div
                className="pointer-events-none absolute inset-0 -z-10 rounded-3xl bg-radial from-primary/20 via-teal-500/10 to-transparent blur-2xl opacity-70"
                aria-hidden="true"
              />

              {/* Card top bar */}
              <div className="mb-4 flex items-center justify-between border-b border-border/40 pb-3">
                <div className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-mono text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
                    JeevDristi Ecosystem
                  </span>
                </div>
                <Badge variant="outline" className="text-[10px] gap-1 font-mono bg-background/60 backdrop-blur-xs">
                  <CpuIcon className="size-3 text-primary" /> {current.category}
                </Badge>
              </div>

              {/* View Switcher Tabs (Seamless Glass Pill Bar) */}
              <div className="mb-4 grid grid-cols-4 gap-1.5 rounded-xl border border-border/40 bg-background/60 p-1 backdrop-blur-sm">
                {showcaseItems.map((item, idx) => {
                  const Icon = item.icon
                  const isSelected = activeIdx === idx
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveIdx(idx)}
                      className={`flex flex-col items-center justify-center gap-1 rounded-lg px-1.5 py-1.5 text-[11px] font-medium transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-primary/15 text-primary shadow-xs font-semibold ring-1 ring-primary/30 dark:bg-primary/25'
                          : 'text-muted-foreground hover:text-foreground hover:bg-muted/40'
                      }`}
                      aria-label={`Show ${item.title}`}
                    >
                      <Icon className="size-3.5" weight={isSelected ? 'fill' : 'regular'} />
                      <span className="truncate max-w-full text-[10px]">{item.title.split(' ')[0]}</span>
                    </button>
                  )
                })}
              </div>

              {/* Product Visual Showcase Stage (Unboxed, Blended directly with background) */}
              <div className="relative flex min-h-[280px] sm:min-h-[330px] w-full items-center justify-center py-2">
                {/* Subtle soft pedestal glow */}
                <div className="pointer-events-none absolute -bottom-2 left-1/2 -translate-x-1/2 h-6 w-3/4 rounded-full bg-primary/25 blur-xl" />

                <img
                  key={current.id}
                  src={current.image}
                  alt={current.alt}
                  className="relative z-10 max-h-[270px] sm:max-h-[320px] w-auto max-w-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.15)] dark:drop-shadow-[0_15px_30px_rgba(0,0,0,0.45)] transition-all duration-300 hover:scale-[1.02] select-none"
                  width="510"
                  height="560"
                  fetchPriority="high"
                />
              </div>

              {/* Subtitle / Caption bar */}
              <div className="mt-2 text-center">
                <p className="font-heading text-xs font-bold text-foreground sm:text-sm">
                  {current.title}
                </p>
                <p className="text-[11px] text-muted-foreground">
                  {current.subtitle}
                </p>
              </div>

              {/* Dynamic telemetry specs summary (Translucent Glass Stat Chips) */}
              <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
                {current.specs.map((spec, i) => (
                  <div key={i} className="rounded-xl border border-border/40 bg-background/50 p-2 backdrop-blur-xs shadow-2xs">
                    <p className="text-[10px] text-muted-foreground">{spec.label}</p>
                    <p className="font-semibold text-foreground flex items-center justify-center gap-1 text-[11px] mt-0.5">
                      {i === 2 && <CheckCircleIcon weight="fill" className="size-3 text-emerald-500" />}
                      {spec.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
