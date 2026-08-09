import heroImage from '../assets/jeevdristi-device.png'
import { RELEASES_PAGE_URL, type ReleaseDownloads } from '../releaseDownloads'

function ArrowIcon() {
  return (
    <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14m-5-5 5 5-5 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg className="size-5.5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M7 8.5h10V19H7zM8.5 5.5h7M9 3.5l-1-1M15 3.5l1-1M4.5 9.5v6M19.5 9.5v6M9.5 19v2.5M14.5 19v2.5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" />
      <circle cx="9.5" cy="11" r=".7" fill="currentColor" />
      <circle cx="14.5" cy="11" r=".7" fill="currentColor" />
    </svg>
  )
}

type HeroProps = {
  apk: ReleaseDownloads['apk']
  isLoading: boolean
}

export function Hero({ apk, isLoading }: HeroProps) {
  const downloadLabel = apk
    ? `Download Android app version ${apk.version}`
    : isLoading
      ? 'Preparing Android app download'
      : 'View Android app releases'

  return (
    <section className="hero mx-auto grid min-h-[calc(100vh-6rem)] w-full max-w-[94rem] grid-cols-[minmax(0,1.08fr)_minmax(34rem,0.92fr)] items-center overflow-hidden px-8 pb-12 max-lg:min-h-0 max-lg:grid-cols-1 max-md:px-5 max-md:pb-16" id="top">
      <div className="hero-copy relative z-10 py-16 max-lg:pt-14 max-lg:pb-4">
        <h1 className="font-display mb-8 max-w-[820px] text-[clamp(4rem,6.7vw,6.75rem)] leading-[1.02] font-extrabold tracking-[-0.065em] text-navy max-md:text-[clamp(3.25rem,15vw,4.8rem)]">
          Clarity at{' '}<br /><span className="lg:whitespace-nowrap">the point of care.</span>
        </h1>
        <p className="mb-10 max-w-[590px] text-[clamp(1.05rem,1.35vw,1.3rem)] leading-[1.7] text-navy/82">
          Guided testing, local results, and simple reporting in one connected experience—designed to keep care moving, even without internet.
        </p>
        <div className="flex max-w-[25rem] flex-col items-stretch gap-4">
          <a className="button button-primary" aria-label={downloadLabel} href={apk?.url ?? RELEASES_PAGE_URL} target={apk ? undefined : '_blank'} rel={apk ? undefined : 'noreferrer'}>
            <DownloadIcon />
            Download Android app
          </a>
          <a className="button button-secondary" href="#workflow">
            See how it works
            <ArrowIcon />
          </a>
        </div>
      </div>
      <div className="hero-product flex min-h-full items-center justify-center max-lg:min-h-[500px] max-md:min-h-[340px] max-sm:min-h-[280px] max-sm:overflow-hidden">
        <img
          className="w-[132%] max-w-none -translate-x-[9%] object-contain max-lg:w-full max-lg:max-w-[900px] max-lg:translate-x-0 max-sm:w-[158%] max-sm:max-w-none max-sm:-translate-x-[7%]"
          src={heroImage}
          alt="JeevDristi mobile application beside a compact point-of-care testing device"
          width="1536"
          height="1024"
          fetchPriority="high"
        />
      </div>
    </section>
  )
}
