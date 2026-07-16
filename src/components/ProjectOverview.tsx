function PhoneIcon() {
  return <svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><rect x="12" y="4" width="24" height="40" rx="4" stroke="currentColor" strokeWidth="2" /><path d="M20 9h8M21 38h6" stroke="currentColor" strokeLinecap="round" strokeWidth="2" /></svg>
}

function ChipIcon() {
  return <svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><rect x="12" y="12" width="24" height="24" rx="3" stroke="currentColor" strokeWidth="2" /><path d="M18 2v10m6-10v10m6-10v10m0 24v10m-6-10v10m-6-10v10M2 18h10M2 24h10M2 30h10m24-12h10M36 24h10M36 30h10" stroke="currentColor" strokeWidth="2" /></svg>
}

function VisionIcon() {
  return <svg viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M4 24s7-12 20-12 20 12 20 12-7 12-20 12S4 24 4 24Z" stroke="currentColor" strokeWidth="2" /><circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="2" /><path d="M24 2v5m0 34v5M6 8l4 4m28 24 4 4M42 8l-4 4M10 36l-4 4" stroke="currentColor" strokeLinecap="round" strokeWidth="2" /></svg>
}

const stack = [
  { title: 'Flutter app', description: 'Device pairing, test control, local reports, and permitted cloud synchronisation.', icon: <PhoneIcon /> },
  { title: 'Embedded service', description: 'Hardware control, secure transport, local storage, and device update support.', icon: <ChipIcon /> },
  { title: 'CV/ML pipeline', description: 'Image analysis and structured report generation for diagnostic workflows.', icon: <VisionIcon /> },
]

export function ProjectOverview() {
  return (
    <section className="project-section" id="project">
      <div className="project-layout">
        <div className="project-intro">
          <h2>Built across the stack</h2>
          <p>
            JeevDristi brings the app, embedded device, and analysis workflow together as one
            coordinated POCT platform.
          </p>
        </div>
        <div className="stack-list">
          {stack.map((item) => (
            <article className="stack-item" key={item.title}>
              {item.icon}
              <h3>{item.title}</h3>
              <p>{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
