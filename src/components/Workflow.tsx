function PairIcon() {
  return (
    <svg className="size-13.5 text-teal" viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <rect x="7" y="10" width="18" height="34" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="M13 15h6M13 39h6M33 31h15v13H33zM36 26c2.8-3 6.2-3 9 0M39 22c1.7-1.4 3.3-2 4.8-2 1.5 0 3.1.6 4.7 2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

function TestIcon() {
  return (
    <svg className="size-13.5 text-teal" viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <path d="M18 8h20l3 9v28H15V17l3-9Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
      <path d="M15 20h26M22 29h12M25 45v-5h6v5M44 12h6v32h-6z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

function ReviewIcon() {
  return (
    <svg className="size-13.5 text-teal" viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <path d="M12 7h22l9 9v31H12zM34 7v10h9M19 25h16M19 31h12M19 37h8" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
      <circle cx="41" cy="39" r="10" fill="white" stroke="currentColor" strokeWidth="2" />
      <path d="m37 39 3 3 6-7" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

const steps = [
  { number: '01', title: 'Pair', description: 'Connect the JeevDristi app to a nearby POCT box.', icon: <PairIcon /> },
  { number: '02', title: 'Test', description: 'Capture and analyse a sample on the embedded device.', icon: <TestIcon /> },
  { number: '03', title: 'Review', description: 'Review reports locally and sync permitted data when online.', icon: <ReviewIcon /> },
]

export function Workflow() {
  return (
    <section className="mx-auto w-full max-w-[82.5rem] px-6 py-30 max-md:px-4 max-md:py-21" id="workflow">
      <div className="mb-18 max-w-[820px] max-md:mb-12">
        <h2 className="font-display mb-5 text-[clamp(2.3rem,4vw,4.25rem)] leading-[1.04] font-bold tracking-[-0.055em] text-navy">One connected diagnostic workflow</h2>
        <p className="text-lg leading-[1.65] text-muted">Designed to keep testing moving where connectivity is limited.</p>
      </div>
      <div className="grid grid-cols-3 border-y border-teal max-md:grid-cols-1">
        {steps.map((step) => (
          <article className="min-h-[285px] border-l border-line py-9.5 pr-10.5 pl-10.5 first:border-l-0 first:pl-0 max-md:min-h-0 max-md:border-t max-md:border-l-0 max-md:px-0 max-md:py-7 max-md:first:border-t-0" key={step.number}>
            <div className="mb-15 flex items-center justify-between gap-5 max-md:mb-6">
              <span className="font-display text-lg font-bold tracking-[0.14em] text-teal">{step.number}</span>
              {step.icon}
            </div>
            <h3 className="font-display mb-3 text-[1.75rem] font-bold tracking-[-0.04em] text-navy">{step.title}</h3>
            <p className="mb-0 max-w-80 leading-[1.65] text-muted">{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
