function PhoneIcon() {
  return <svg className="size-10.5 text-teal" viewBox="0 0 48 48" fill="none" aria-hidden="true"><rect x="12" y="4" width="24" height="40" rx="4" stroke="currentColor" strokeWidth="2" /><path d="M20 9h8M21 38h6" stroke="currentColor" strokeLinecap="round" strokeWidth="2" /></svg>
}

function ChipIcon() {
  return <svg className="size-10.5 text-teal" viewBox="0 0 48 48" fill="none" aria-hidden="true"><rect x="12" y="12" width="24" height="24" rx="3" stroke="currentColor" strokeWidth="2" /><path d="M18 2v10m6-10v10m6-10v10m0 24v10m-6-10v10m-6-10v10M2 18h10M2 24h10M2 30h10m24-12h10M36 24h10M36 30h10" stroke="currentColor" strokeWidth="2" /></svg>
}

function VisionIcon() {
  return <svg className="size-10.5 text-teal" viewBox="0 0 48 48" fill="none" aria-hidden="true"><path d="M4 24s7-12 20-12 20 12 20 12-7 12-20 12S4 24 4 24Z" stroke="currentColor" strokeWidth="2" /><circle cx="24" cy="24" r="6" stroke="currentColor" strokeWidth="2" /><path d="M24 2v5m0 34v5M6 8l4 4m28 24 4 4M42 8l-4 4M10 36l-4 4" stroke="currentColor" strokeLinecap="round" strokeWidth="2" /></svg>
}

const stack = [
  { title: 'Flutter app', description: 'Device pairing, test control, local reports, and permitted cloud synchronisation.', icon: <PhoneIcon /> },
  { title: 'Embedded service', description: 'Hardware control, secure transport, local storage, and device update support.', icon: <ChipIcon /> },
  { title: 'CV/ML pipeline', description: 'Image analysis and structured report generation for diagnostic workflows.', icon: <VisionIcon /> },
]

export function ProjectOverview() {
  return (
    <section className="bg-[#f1f7f6] py-26" id="project">
      <div className="mx-auto grid w-full max-w-[82.5rem] grid-cols-[0.85fr_1.65fr] gap-22 px-6 max-lg:grid-cols-1 max-lg:gap-12.5 max-md:px-4">
        <div className="self-start">
          <h2 className="font-display mb-5 text-[clamp(2.3rem,4vw,4.25rem)] leading-[1.04] font-bold tracking-[-0.055em] text-navy">Built across the stack</h2>
          <p className="text-lg leading-[1.65] text-muted">
            JeevDristi brings the app, embedded device, and analysis workflow together as one
            coordinated POCT platform.
          </p>
        </div>
        <div className="border-t border-teal">
          {stack.map((item) => (
            <article className="grid grid-cols-[3.5rem_minmax(10rem,0.45fr)_1fr] items-center gap-7 border-b border-[#b9cecf] py-7.5 max-md:grid-cols-[2.875rem_1fr] max-md:gap-4.5" key={item.title}>
              {item.icon}
              <h3 className="font-display mb-0 text-xl font-bold tracking-[-0.025em] text-navy">{item.title}</h3>
              <p className="mb-0 leading-[1.6] text-muted max-md:col-start-2">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
