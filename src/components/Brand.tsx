export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`font-display inline-flex items-center font-extrabold tracking-[-0.04em] text-navy ${compact ? 'gap-2 text-base' : 'gap-3 text-[1.55rem] max-[480px]:text-xl'}`}>
      <svg className={`text-teal ${compact ? 'size-7.5' : 'size-10.5 max-[480px]:size-9'}`} viewBox="0 0 48 48" aria-hidden="true">
        <path d="M8 17.5C12.3 10.7 18.1 7 24.2 7c5 0 9.6 2.4 13.8 7" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="5" />
        <path d="M38.5 28.7C34.8 36.4 29.6 40 23 40 14.7 40 9 34.3 9 26.5" fill="none" stroke="currentColor" strokeLinecap="round" strokeWidth="5" />
        <path className="text-saffron" d="m34.5 18.5 4.3 3.3 5.2-5" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" />
        <circle cx="24" cy="24" r="7" fill="currentColor" />
      </svg>
      <span>JeevDristi</span>
    </span>
  )
}
