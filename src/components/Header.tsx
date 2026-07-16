import { Brand } from './Brand'

export function Header() {
  return (
    <header className="site-header">
      <a href="#top" aria-label="JeevDristi home">
        <Brand />
      </a>
      <nav className="desktop-nav" aria-label="Primary navigation">
        <a href="#project">Project</a>
        <a href="#workflow">How it works</a>
        <a href="#downloads">Downloads</a>
      </nav>
    </header>
  )
}
