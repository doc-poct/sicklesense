import { useEffect, useState } from 'react'
import {
  AndroidLogoIcon,
  ArrowRightIcon,
  CheckCircleIcon,
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
    subtitle: 'Celebrating Innovation: Functional Prototype Unit',
    category: 'IIT Bhilai Unit',
    icon: FlaskIcon,
    image: poctPrototypeImg,
    alt: 'IIT Bhilai POCT functional prototype unit with mobile companion on stand',
    bgTop: '#bbbbb5',
    bgBottom: '#cacbc3',
    specs: [
      { label: 'Hardware', value: 'Optical Stage' },
      { label: 'Companion', value: 'Live Synced' },
      { label: 'Status', value: 'Functional' },
    ],
  },
  {
    id: 'app',
    title: 'App Control & Reports',
    subtitle: 'Seamless Data Access and Automated Reporting',
    category: 'Android App',
    icon: DeviceMobileIcon,
    image: jeevdristiAppImg,
    alt: 'JeevDristi mobile application interface showing recent patient test reports',
    bgTop: '#eff3f6',
    bgBottom: '#f0f3f7',
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
    bgTop: '#d0d9dd',
    bgBottom: '#d0d2cd',
    specs: [
      { label: 'Enclosure', value: 'Medical Shell' },
      { label: 'Standards', value: 'IBITF Grade' },
      { label: 'Durability', value: 'Field Ready' },
    ],
  },
  {
    id: 'analytics',
    title: 'Detailed Analytics',
    subtitle: 'Instant, Clear RBC Morphology & Classification',
    category: 'AI Diagnostics',
    icon: SparkleIcon,
    image: diagnosticAnalyticsImg,
    alt: 'Dual smartphone screens showing negative and positive sickle cell diagnostic results',
    bgTop: '#f3f7f9',
    bgBottom: '#ecf0f3',
    specs: [
      { label: 'Diagnosis', value: 'Morphology' },
      { label: 'Inference', value: 'On-Device' },
      { label: 'Accuracy', value: 'Micrographs' },
    ],
  },
]

export function Hero({ apk, isLoading }: HeroProps) {
  const [activeIdx, setActiveIdx] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const current = showcaseItems[activeIdx]

  useEffect(() => {
    if (isPaused) return
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % showcaseItems.length)
    }, 4200)
    return () => clearInterval(timer)
  }, [isPaused])

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

          {/* Right Column: Device & App Showcase Seamless Shuffling Stage */}
          <div
            className="hero-product relative flex flex-col items-center justify-between lg:col-span-6 xl:col-span-5 rounded-3xl overflow-hidden p-6 sm:p-8 transition-all duration-700 shadow-2xl border border-black/5 dark:border-white/10"
            style={{
              background: `linear-gradient(180deg, ${current.bgTop} 0%, ${current.bgBottom} 100%)`,
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Floating Live Product Image directly on matching canvas */}
            <div className="relative flex min-h-[280px] sm:min-h-[340px] lg:min-h-[380px] w-full items-center justify-center py-2">
              <img
                key={current.id}
                src={current.image}
                alt={current.alt}
                className="relative z-10 max-h-[280px] sm:max-h-[340px] lg:max-h-[380px] w-auto max-w-full object-contain select-none animate-in fade-in-0 zoom-in-95 transition-all duration-700"
                width="510"
                height="560"
                fetchPriority="high"
              />
            </div>

            {/* Shuffling Text & Details seamlessly floating on canvas */}
            <div key={`text-${current.id}`} className="mt-2 w-full text-center lg:text-left animate-in fade-in-0 slide-in-from-bottom-2 duration-500">
              {/* Category pill & live pulse */}
              <div className="flex items-center justify-center lg:justify-start gap-2 mb-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white/80 px-3 py-1 font-mono text-[11px] font-semibold text-slate-800 shadow-2xs backdrop-blur-xs">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <current.icon className="size-3 text-teal-700" weight="fill" />
                  <span>{current.category}</span>
                </span>
              </div>

              {/* Title & Subtitle */}
              <h3 className="font-heading text-lg font-bold tracking-tight text-slate-900 sm:text-xl">
                {current.title}
              </h3>
              <p className="mt-1 text-xs text-slate-700 sm:text-sm leading-relaxed max-w-md mx-auto lg:mx-0">
                {current.subtitle}
              </p>

              {/* Minimalist Key Specs Tag Strip */}
              <div className="mt-3.5 flex flex-wrap items-center justify-center lg:justify-start gap-2">
                {current.specs.map((spec, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1.5 rounded-lg border border-black/10 bg-white/70 px-2.5 py-1 text-xs backdrop-blur-xs shadow-2xs text-slate-900"
                  >
                    <span className="text-[11px] text-slate-600">{spec.label}:</span>
                    <span className="font-semibold text-slate-900 flex items-center gap-1">
                      {i === 2 && <CheckCircleIcon weight="fill" className="size-3 text-emerald-600" />}
                      {spec.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Sleek Pagination / Progress Indicators */}
              <div className="mt-5 flex items-center justify-center lg:justify-start gap-2">
                {showcaseItems.map((item, idx) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${
                      activeIdx === idx
                        ? 'w-7 bg-slate-900 shadow-xs'
                        : 'w-2 bg-slate-400/60 hover:bg-slate-700'
                    }`}
                    aria-label={`Show ${item.title}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
