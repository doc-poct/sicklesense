import { TranslateIcon } from '@phosphor-icons/react'
import { useLanguage } from '@/lib/i18n'
import { cn } from '@/lib/utils'

interface LanguageSwitcherProps {
  className?: string
  size?: 'xs' | 'sm' | 'default'
}

export function LanguageSwitcher({ className, size = 'sm' }: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useLanguage()

  return (
    <div
      role="group"
      aria-label={t.nav.language}
      className={cn(
        'inline-flex items-center rounded-lg border border-border/80 bg-muted/60 p-0.5 text-xs shadow-2xs',
        size === 'xs' && 'text-[11px] p-0.5',
        className
      )}
    >
      <div className="flex items-center pl-1.5 pr-1 text-primary">
        <TranslateIcon className={size === 'xs' ? 'size-3' : 'size-3.5'} weight="bold" />
      </div>

      <button
        type="button"
        onClick={() => setLocale('en-IN')}
        className={cn(
          'rounded-md transition-all cursor-pointer select-none leading-none',
          size === 'xs' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-1 text-xs',
          locale === 'en-IN'
            ? 'bg-background text-primary shadow-xs font-semibold'
            : 'text-muted-foreground hover:text-foreground'
        )}
        aria-pressed={locale === 'en-IN'}
      >
        English
      </button>

      <button
        type="button"
        onClick={() => setLocale('hi')}
        className={cn(
          'rounded-md transition-all cursor-pointer select-none leading-none',
          size === 'xs' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-1 text-xs',
          locale === 'hi'
            ? 'bg-background text-primary shadow-xs font-semibold'
            : 'text-muted-foreground hover:text-foreground'
        )}
        aria-pressed={locale === 'hi'}
      >
        हिन्दी
      </button>
    </div>
  )
}
