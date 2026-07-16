import { Brand } from './Brand'

const RELEASES_URL = 'https://github.com/doc-poct/poct_fw_app_releases/releases'
const GITHUB_URL = 'https://github.com/doc-poct'

function ArrowIcon() {
  return <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" /></svg>
}

export function Downloads() {
  return (
    <>
      <div className="download-wrap" id="downloads">
        <section className="download-section">
          <div className="download-copy">
            <h2>Get JeevDristi</h2>
            <p>
              Download the latest Android build and find firmware releases, checksums, and
              compatibility notes.
            </p>
            <div className="download-actions">
              <a className="button button-primary" href={RELEASES_URL} target="_blank" rel="noreferrer">
                View Android releases
                <ArrowIcon />
              </a>
              <a className="text-link" href={RELEASES_URL} target="_blank" rel="noreferrer">
                Firmware &amp; device images
                <ArrowIcon />
              </a>
            </div>
            <p className="release-note">Releases are published on GitHub with stable and beta channels.</p>
          </div>
          <div className="download-visual" aria-hidden="true">
            <div className="phone">
              <div className="phone-screen">
                <Brand />
                <div className="phone-line" />
                <div className="phone-line short" />
                <div className="phone-action">Start a test</div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <footer className="site-footer">
        <div className="footer-copy">
          <Brand />
          <p>A point-of-care testing project from IIT Bhilai.</p>
        </div>
        <nav className="footer-links" aria-label="Project links">
          <a href={GITHUB_URL} target="_blank" rel="noreferrer">GitHub</a>
          <a href={RELEASES_URL} target="_blank" rel="noreferrer">App releases</a>
          <a href={RELEASES_URL} target="_blank" rel="noreferrer">Firmware releases</a>
        </nav>
      </footer>
    </>
  )
}
