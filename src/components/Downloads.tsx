import { RELEASES_PAGE_URL, type ReleaseDownloads } from '../releaseDownloads'
import { Brand } from './Brand'

function ArrowIcon() {
  return (
    <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14m-5-5 5 5-5 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

type DownloadsProps = ReleaseDownloads & {
  isLoading: boolean
}

export function Downloads({ apk, zero2wImage, isLoading }: DownloadsProps) {
  const appLabel = apk
    ? `Download Android app version ${apk.version}`
    : isLoading
      ? 'Preparing Android app download'
      : 'View Android app releases'
  const deviceLabel = zero2wImage
    ? `Set up a testing device with version ${zero2wImage.version}`
    : isLoading
      ? 'Preparing testing device setup files'
      : 'View testing device releases'

  return (
    <>
      <section className="download-band px-8 py-22 text-white max-md:px-5 max-md:py-18" id="downloads">
        <div className="mx-auto max-w-[94rem] text-center">
          <div className="section-heading section-heading-inverse">
            <h2>Ready for the field.</h2>
            <span aria-hidden="true" />
          </div>
          <p className="mx-auto mt-8 mb-9 max-w-[760px] text-[clamp(1.05rem,1.6vw,1.32rem)] leading-relaxed text-white/90">Get the JeevDristi app and setup files for your testing device.</p>
          <div className="flex justify-center gap-5 max-sm:flex-col">
            <a className="button download-primary" aria-label={appLabel} href={apk?.url ?? RELEASES_PAGE_URL} target={apk ? undefined : '_blank'} rel={apk ? undefined : 'noreferrer'}>
              Download Android app
              <ArrowIcon />
            </a>
            <a className="button download-secondary" aria-label={deviceLabel} href={zero2wImage?.url ?? RELEASES_PAGE_URL} target={zero2wImage ? undefined : '_blank'} rel={zero2wImage ? undefined : 'noreferrer'}>
              Set up a testing device
              <ArrowIcon />
            </a>
          </div>
        </div>
      </section>
      <footer className="mx-auto flex min-h-36 w-full max-w-[94rem] items-center justify-between gap-10 px-8 max-md:flex-col max-md:items-start max-md:px-5 max-md:py-12">
        <div className="flex items-center gap-8 max-sm:flex-col max-sm:items-start max-sm:gap-3">
          <Brand />
          <span className="h-12 w-px bg-line max-sm:hidden" aria-hidden="true" />
          <p className="m-0 text-muted">A point-of-care testing project from IIT Bhilai.</p>
        </div>
        <nav className="flex flex-wrap gap-10 max-sm:flex-col max-sm:gap-4" aria-label="Footer navigation">
          <a className="footer-link" href="#product">Product</a>
          <a className="footer-link" href="#workflow">How it works</a>
          <a className="footer-link" href="#downloads">Downloads</a>
        </nav>
      </footer>
    </>
  )
}
