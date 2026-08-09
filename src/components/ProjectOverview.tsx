function OfflineIcon() {
  return (
    <svg className="value-icon" viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <circle cx="40" cy="40" r="31" stroke="currentColor" strokeWidth="2.5" />
      <path d="M21 34c11-10 27-10 38 0M27 42c7-7 19-7 26 0M34 50c3-3 9-3 12 0" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" />
      <circle cx="40" cy="57" r="3" fill="currentColor" />
    </svg>
  )
}

function GuideIcon() {
  return (
    <svg className="value-icon" viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <path d="M25 19h30a4 4 0 0 1 4 4v43H21V23a4 4 0 0 1 4-4Z" stroke="currentColor" strokeWidth="2.5" />
      <rect x="32" y="14" width="16" height="10" rx="3" fill="white" stroke="currentColor" strokeWidth="2.5" />
      <path d="m29 35 4 4 7-9M44 36h8m-23 13 4 4 7-9m4 6h8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
    </svg>
  )
}

function ResultsIcon() {
  return (
    <svg className="value-icon" viewBox="0 0 80 80" fill="none" aria-hidden="true">
      <path d="M22 60V45h10v15H22Zm18 0V33h10v27H40Zm18 0V19h10v41H58Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2.5" />
    </svg>
  )
}

const values = [
  { title: 'Works without internet', description: 'Keep testing and get results on site, even in low-connectivity settings.', icon: <OfflineIcon /> },
  { title: 'Guided from start to finish', description: 'Simple on-screen guidance helps every test run the same way, every time.', icon: <GuideIcon /> },
  { title: 'Results where you need them', description: 'View and share results quickly within the app, with built-in reporting.', icon: <ResultsIcon /> },
]

export function ProjectOverview() {
  return (
    <section className="bg-[#f7f8f7] py-24 max-md:py-18" id="product">
      <div className="mx-auto w-full max-w-[94rem] px-8 max-md:px-5">
        <div className="section-heading">
          <h2>Designed around the realities of field care.</h2>
          <span aria-hidden="true" />
        </div>
        <div className="mt-14 grid grid-cols-3 max-md:mt-10 max-md:grid-cols-1">
          {values.map((item) => (
            <article className="value-item" key={item.title}>
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
