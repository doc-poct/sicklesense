function PairIcon() {
  return (
    <svg className="workflow-icon" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <path d="M16 55h39v23H16zM20 60h20v13H20zm45-34h18v52H65zM70 32h8M70 72h8M74 45v16m-6-10 6-6 6 6-6 6-6-6Z" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
      <path d="M20 71h5" stroke="#f5a623" strokeLinecap="round" strokeWidth="2.5" />
    </svg>
  )
}

function TestIcon() {
  return (
    <svg className="workflow-icon" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <rect x="34" y="17" width="28" height="12" rx="4" stroke="currentColor" strokeWidth="2.5" />
      <path d="M38 29h20v47a10 10 0 0 1-20 0V29Z" stroke="currentColor" strokeWidth="2.5" />
      <path d="M38 52h20M48 58v3m0 5v3" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" />
    </svg>
  )
}

function ReviewIcon() {
  return (
    <svg className="workflow-icon" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <rect x="29" y="13" width="38" height="70" rx="5" stroke="currentColor" strokeWidth="2.5" />
      <path d="M41 19h14M42 76h12" stroke="currentColor" strokeLinecap="round" strokeWidth="2.5" />
      <circle cx="48" cy="48" r="15" stroke="currentColor" strokeWidth="2.5" />
      <path d="m41 48 5 5 10-11" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" />
    </svg>
  )
}

const steps = [
  { number: '1', title: 'Connect', description: 'Pair the app with your testing device.', icon: <PairIcon /> },
  { number: '2', title: 'Run the test', description: 'Follow simple prompts to complete the test.', icon: <TestIcon /> },
  { number: '3', title: 'Review the result', description: 'See the result on screen and save or share.', icon: <ReviewIcon /> },
]

export function Workflow() {
  return (
    <section className="mx-auto w-full max-w-[94rem] px-8 py-24 max-md:px-5 max-md:py-18" id="workflow">
      <div className="section-heading">
        <h2>From sample to result, one clear path.</h2>
        <span aria-hidden="true" />
      </div>
      <div className="workflow-grid mt-12 grid grid-cols-3 max-md:mt-10 max-md:grid-cols-1">
        {steps.map((step) => (
          <article className="workflow-step" key={step.number}>
            <div className="workflow-visual">
              <span>{step.number}</span>
              {step.icon}
            </div>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
