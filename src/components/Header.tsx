import { Brand } from './Brand'

export function Header() {
  return (
    <header className="mx-auto grid h-24 w-full max-w-[94rem] grid-cols-[1fr_auto_1fr] items-center px-8 max-md:flex max-md:h-20 max-md:justify-between max-md:px-5">
      <a className="justify-self-start no-underline" href="#top" aria-label="JeevDristi home">
        <Brand />
      </a>
      <nav className="flex items-center gap-[clamp(2rem,4vw,4.5rem)] max-md:hidden" aria-label="Primary navigation">
        <a className="nav-link" href="#product">Product</a>
        <a className="nav-link" href="#workflow">How it works</a>
        <a className="nav-link" href="webportal/">Phone Results</a>
        <a className="nav-link" href="#downloads">Downloads</a>
      </nav>
      <a className="button button-primary header-action justify-self-end" href="#downloads">Download app</a>
    </header>
  )
}
