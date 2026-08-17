import { RELEASES_PAGE_URL, type ReleaseDownloads } from '../releaseDownloads'

type PhoneResultsProps = {
  bridge: ReleaseDownloads['bridge']
  isLoading: boolean
}

export function PhoneResults({ bridge, isLoading }: PhoneResultsProps) {
  return (
    <section className="mx-auto grid w-full max-w-[82.5rem] grid-cols-[0.9fr_1.1fr] gap-14 px-6 py-24 max-lg:grid-cols-1 max-md:px-4 max-md:py-17" id="phone-results">
      <div className="rounded-3xl bg-teal-soft p-8 max-md:p-6" aria-hidden="true">
        <div className="rounded-2xl border border-teal/20 bg-white p-6 shadow-[0_20px_55px_rgba(7,27,63,0.10)]">
          <span className="text-sm font-bold tracking-[0.12em] text-teal uppercase">Local USB session</span>
          <div className="mt-7 grid grid-cols-3 gap-3 text-center text-sm font-semibold max-[480px]:grid-cols-1">
            <div className="rounded-xl bg-teal-soft px-3 py-5">1. Connect phone</div>
            <div className="rounded-xl bg-teal-soft px-3 py-5">2. Match code</div>
            <div className="rounded-xl bg-teal-soft px-3 py-5">3. Browse results</div>
          </div>
          <p className="mt-6 mb-0 text-sm leading-6 text-muted">Results travel over USB and stay in the local portal. Nothing clinical is uploaded to this website.</p>
        </div>
      </div>
      <div className="self-center">
        <p className="mb-3 font-bold tracking-[0.12em] text-teal uppercase">Windows beta</p>
        <h2 className="font-display mb-5 text-[clamp(2.25rem,4vw,4rem)] leading-[1.05] font-bold tracking-[-0.05em]">View results from your phone</h2>
        <p className="mb-8 max-w-[680px] text-lg leading-8 text-muted">Connect a supported Android phone by USB, keep JeevDristi open, then approve the matching six-digit code with your phone PIN or biometric. Chrome, Edge, and Firefox all open the same private local portal.</p>
        <div className="flex flex-wrap gap-4 max-[480px]:flex-col">
          <a className="inline-flex min-h-14 items-center justify-center rounded-lg bg-teal px-6 font-bold text-white no-underline transition hover:bg-teal-dark" href="sicklesense://results">Open Phone Results</a>
          {bridge ? (
            <a className="inline-flex min-h-14 items-center justify-center rounded-lg border-2 border-navy px-6 font-bold text-navy no-underline" href={bridge.url}>Install Windows bridge v{bridge.version}</a>
          ) : (
            <a className="inline-flex min-h-14 items-center justify-center rounded-lg border-2 border-line px-6 font-bold text-muted no-underline" href={RELEASES_PAGE_URL} target="_blank" rel="noreferrer">{isLoading ? 'Checking bridge release…' : 'Bridge beta not published yet'}</a>
          )}
        </div>
        <p className="mt-5 mb-0 text-sm leading-6 text-muted">Requires a one-time administrator install and a phone model listed in the signed bridge compatibility manifest. Downloaded ZIP files remain on this PC.</p>
      </div>
    </section>
  )
}
