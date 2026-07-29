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
    <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3v12m0 0 5-5m-5 5-5-5M4 18v2h16v-2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

type HeroProps = {
  apk: ReleaseDownloads['apk']
  isLoading: boolean
}

export function Hero({ apk, isLoading }: HeroProps) {
  return (
    <section className="mx-auto grid min-h-[710px] w-full max-w-[82.5rem] grid-cols-[minmax(0,0.92fr)_minmax(28.75rem,1.08fr)] items-center gap-5 overflow-hidden border-b border-line px-6 max-lg:min-h-0 max-lg:grid-cols-1 max-md:px-4" id="top">
      <div className="relative z-10 py-21 max-lg:pt-17.5 max-lg:pb-5">
        <h1 className="font-display mb-7 max-w-[650px] text-[clamp(3.35rem,5.1vw,5.55rem)] leading-[0.98] font-extrabold tracking-[-0.065em] text-navy max-md:text-[clamp(3rem,14vw,4.25rem)]">
          Point-of-care testing, built for the field.
        </h1>
        <p className="mb-9.5 max-w-[610px] text-[clamp(1.08rem,1.45vw,1.32rem)] leading-[1.55] text-muted">
          An offline-first diagnostic platform connecting a mobile app, embedded POCT box,
          and on-device analysis.
        </p>
        <div className="flex flex-wrap items-center gap-4 max-[480px]:flex-col max-[480px]:items-stretch">
          <a className="inline-flex min-h-14 items-center justify-center gap-3 rounded-lg border-2 border-teal bg-teal px-6 font-bold text-white no-underline transition duration-200 hover:-translate-y-0.5 hover:bg-teal-dark max-[480px]:w-full" href={apk?.url ?? RELEASES_PAGE_URL} target={apk ? undefined : '_blank'} rel={apk ? undefined : 'noreferrer'}>
            <DownloadIcon />
            {apk ? `Download app v${apk.version}` : isLoading ? 'Preparing app download…' : 'View app releases'}
          </a>
          <a className="inline-flex min-h-14 items-center justify-center gap-3 rounded-lg border-2 border-navy bg-transparent px-6 font-bold text-navy no-underline transition duration-200 hover:-translate-y-0.5 max-[480px]:w-full" href="#project">
            Explore the project
            <ArrowIcon />
          </a>
        </div>
      </div>
      <div className="flex min-h-full items-center justify-center max-lg:min-h-[460px] max-md:min-h-80 max-[480px]:min-h-65 max-[480px]:overflow-hidden">
        <img
          className="w-[120%] max-w-none translate-x-[2%] object-contain max-lg:w-full max-lg:max-w-[760px] max-lg:translate-x-0 max-[480px]:w-[168%] max-[480px]:max-w-none max-[480px]:-translate-x-[7%] max-[480px]:-translate-y-[3%]"
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
