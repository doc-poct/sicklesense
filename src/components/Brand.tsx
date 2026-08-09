export function Brand({ inverted = false }: { inverted?: boolean }) {
  return (
    <span className={`font-display text-[clamp(1.6rem,2.2vw,2.15rem)] font-extrabold tracking-[-0.055em] ${inverted ? 'text-white' : 'text-teal-dark'}`}>
      JeevDristi
    </span>
  )
}
