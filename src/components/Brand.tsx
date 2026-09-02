import { ShieldCheckIcon } from '@phosphor-icons/react'
import { useLanguage } from '@/lib/i18n'

export function Brand({ inverted = false }: { inverted?: boolean }) {
  const { t } = useLanguage()

  return (
    <div className="flex items-center gap-2.5">
      <span className={`grid size-8 shrink-0 place-items-center rounded-lg ${inverted ? 'bg-white/10 text-white' : 'bg-primary/10 text-primary'}`}>
        <ShieldCheckIcon className="size-5" weight="fill" />
      </span>
      <div className="flex flex-col">
        <span className={`font-heading text-lg font-bold tracking-tight ${inverted ? 'text-white' : 'text-foreground'}`}>
          {t.brand.title}
        </span>
        <span className={`text-[10px] font-medium tracking-wider uppercase ${inverted ? 'text-white/60' : 'text-muted-foreground'}`}>
          {t.brand.subtitle}
        </span>
      </div>
    </div>
  )
}
