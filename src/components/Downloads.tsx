import { Brand } from './Brand'
import { RELEASES_PAGE_URL, type ReleaseDownloads } from '../releaseDownloads'

const GITHUB_URL = 'https://github.com/doc-poct'

function ArrowIcon() {
  return <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
}

type DownloadsProps = ReleaseDownloads & {
  isLoading: boolean
}

export function Downloads({ apk, zero2wImage, isLoading }: DownloadsProps) {
  return (
    <>
      <div className="mx-auto mt-4 w-[min(calc(100%_-_2rem),87.5rem)] bg-teal-dark text-white max-md:w-full" id="downloads">
        <section className="grid min-h-[510px] grid-cols-[1.1fr_0.9fr] items-center gap-14 overflow-hidden px-[max(1.5rem,calc((100%_-_77.5rem)/2))] py-20 max-lg:grid-cols-1 max-lg:pt-17.5 max-lg:pb-0 max-md:px-6">
          <div>
            <h2 className="font-display mb-5 text-[clamp(2.3rem,4vw,4.25rem)] leading-[1.04] font-bold tracking-[-0.055em] text-white">Get JeevDristi</h2>
            <p className="mb-8.5 max-w-[660px] text-lg leading-[1.65] text-[#d6e8e7]">
              Download the latest stable Android build or the Raspberry Pi Zero 2W firmware image.
            </p>
            <div className="flex flex-wrap items-center gap-4 max-[480px]:flex-col max-[480px]:items-stretch">
              <a className="inline-flex min-h-14 items-center justify-center gap-3 rounded-lg border-2 border-saffron bg-saffron px-6 font-bold text-navy no-underline transition duration-200 hover:-translate-y-0.5 max-[480px]:w-full" href={apk?.url ?? RELEASES_PAGE_URL} target={apk ? undefined : '_blank'} rel={apk ? undefined : 'noreferrer'}>
                {apk ? `Download Android v${apk.version}` : isLoading ? 'Preparing Android download…' : 'View Android releases'}
                <ArrowIcon />
              </a>
              <a className="inline-flex items-center gap-2.5 border-b border-white/70 px-1 py-3.5 font-bold text-white no-underline max-[480px]:w-full max-[480px]:justify-center" href={zero2wImage?.url ?? RELEASES_PAGE_URL} target={zero2wImage ? undefined : '_blank'} rel={zero2wImage ? undefined : 'noreferrer'}>
                {zero2wImage ? `Download Zero 2W image v${zero2wImage.version}` : isLoading ? 'Preparing Zero 2W image…' : 'View box releases'}
                <ArrowIcon />
              </a>
            </div>
            <p className="mt-7.5 mb-0 text-[0.96rem] text-[#d6e8e7]">Only stable releases are offered here. Firmware downloads are for Raspberry Pi Zero 2W.</p>
          </div>
          <div className="relative flex min-h-[350px] items-end justify-center max-lg:min-h-[390px]" aria-hidden="true">
            <div className="relative h-[420px] w-[228px] translate-y-10.5 rotate-4 rounded-[38px] border-5 border-[#061934] bg-[#eef5f4] p-3 shadow-[0_32px_60px_rgba(0,18,39,0.28)] before:absolute before:top-4.25 before:left-1/2 before:h-4 before:w-15.5 before:-translate-x-1/2 before:rounded-full before:bg-[#061934] max-[480px]:rotate-0">
              <div className="h-full rounded-3xl bg-white px-5 pt-18 pb-6">
                <div className="flex justify-center">
                  <Brand compact />
                </div>
                <div className="mt-10.5 h-2.25 rounded-full bg-[#dbe7e8]" />
                <div className="mt-3 h-2.25 w-[62%] rounded-full bg-[#dbe7e8]" />
                <div className="mt-9.5 rounded-xl border border-[#c6dada] px-4.5 py-6 text-center font-bold text-teal">Start a test</div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <footer className="mx-auto grid min-h-47.5 w-full max-w-[82.5rem] grid-cols-[1fr_auto] items-center gap-12 px-6 max-md:grid-cols-1 max-md:px-4 max-md:py-13.5">
        <div>
          <Brand />
          <p className="mt-3 mb-0 text-muted">A point-of-care testing project from IIT Bhilai.</p>
        </div>
        <nav className="flex flex-wrap gap-7.5 max-[480px]:flex-col max-[480px]:gap-4" aria-label="Project links">
          <a className="text-navy underline decoration-1 underline-offset-4" href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub</a>
          <a className="text-navy underline decoration-1 underline-offset-4" href={apk?.url ?? RELEASES_PAGE_URL} target={apk ? undefined : '_blank'} rel={apk ? undefined : 'noreferrer'}>Android app</a>
          <a className="text-navy underline decoration-1 underline-offset-4" href={zero2wImage?.url ?? RELEASES_PAGE_URL} target={zero2wImage ? undefined : '_blank'} rel={zero2wImage ? undefined : 'noreferrer'}>Zero 2W firmware</a>
        </nav>
      </footer>
    </>
  )
}
