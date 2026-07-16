function PairIcon() {
  return (
    <svg className="step-icon" viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <rect x="7" y="10" width="18" height="34" rx="3" stroke="currentColor" strokeWidth="2" />
      <path d="M13 15h6M13 39h6M33 31h15v13H33zM36 26c2.8-3 6.2-3 9 0M39 22c1.7-1.4 3.3-2 4.8-2 1.5 0 3.1.6 4.7 2" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

function TestIcon() {
  return (
    <svg className="step-icon" viewBox="0 0 56 56" fill="none" aria-hidden="true">
      <path d="M18 8h20l3 9v28H15V17l3-9Z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
      <path d="M15 20h26M22 29h12M25 45v-5h6v5M44 12h6v32h-6z" stroke="currentColor" strokeLinejoin="round" strokeWidth="2" />
    </svg>
  )
}

function ReviewIcon() {
  return (
    <svg className="step-icon" viewBox="0 0 56 56" fill="none" aria-hidden="true">
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
    <section className="section" id="workflow">
      <div className="section-heading">
        <h2>One connected diagnostic workflow</h2>
        <p>Designed to keep testing moving where connectivity is limited.</p>
      </div>
      <div className="workflow-list">
        {steps.map((step) => (
          <article className="workflow-step" key={step.number}>
            <div className="step-topline">
              <span className="step-number">{step.number}</span>
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
