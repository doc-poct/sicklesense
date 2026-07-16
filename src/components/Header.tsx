import { Brand } from './Brand'

export function Header() {
  return (
    <header className="mx-auto flex min-h-22 w-full max-w-[82.5rem] items-center justify-between border-b border-line px-6 max-md:min-h-19 max-md:px-4">
      <a className="no-underline" href="#top" aria-label="JeevDristi home">
        <Brand />
      </a>
      <nav className="flex items-center gap-10 max-md:gap-4.5" aria-label="Primary navigation">
        <a className="relative font-semibold text-navy no-underline after:absolute after:right-full after:-bottom-2 after:left-0 after:h-0.5 after:bg-teal after:transition-[right] after:duration-200 hover:after:right-0 max-md:hidden" href="#project">Project</a>
        <a className="relative font-semibold text-navy no-underline after:absolute after:right-full after:-bottom-2 after:left-0 after:h-0.5 after:bg-teal after:transition-[right] after:duration-200 hover:after:right-0 max-md:hidden" href="#workflow">How it works</a>
        <a className="relative font-semibold text-navy no-underline after:absolute after:right-full after:-bottom-2 after:left-0 after:h-0.5 after:bg-teal after:transition-[right] after:duration-200 hover:after:right-0" href="#downloads">Downloads</a>
      </nav>
    </header>
  )
}
