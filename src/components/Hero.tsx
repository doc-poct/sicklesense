import heroImage from '../assets/jeevdristi-device.png'

const RELEASES_URL = 'https://github.com/doc-poct/poct_fw_app_releases/releases'

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14m-5-5 5 5-5 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3v12m0 0 5-5m-5 5-5-5M4 18v2h16v-2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

export function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-copy">
        <h1>Point-of-care testing, built for the field.</h1>
        <p>
          An offline-first diagnostic platform connecting a mobile app, embedded POCT box,
          and on-device analysis.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href={RELEASES_URL} target="_blank" rel="noreferrer">
            <DownloadIcon />
            Download the app
          </a>
          <a className="button" href="#project">
            Explore the project
            <ArrowIcon />
          </a>
        </div>
      </div>
      <div className="hero-visual">
        <img
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
