import { CaretDownIcon, CheckIcon, TranslateIcon } from '@phosphor-icons/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { SUPPORTED_LOCALES, useLanguage, type Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

interface LanguageSwitcherProps {
  className?: string
  variant?: 'ghost' | 'outline'
  size?: 'xs' | 'sm' | 'default'
}

export function LanguageSwitcher({
  className,
  variant = 'ghost',
  size = 'sm',
}: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useLanguage()

  const current = SUPPORTED_LOCALES.find((l) => l.code === locale) ?? SUPPORTED_LOCALES[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant={variant}
            size={size}
            className={cn(
              'flex items-center gap-1.5 font-medium cursor-pointer transition-colors',
              variant === 'ghost' && 'text-muted-foreground hover:text-foreground hover:bg-muted/60',
              className
            )}
            aria-label={`${t.nav.language}: ${current.label}`}
          />
        }
      >
        <TranslateIcon className="size-4 text-primary shrink-0" weight="bold" />
        <span className="text-xs">{current.nativeLabel}</span>
        <CaretDownIcon className="size-3 text-muted-foreground/70 shrink-0" />
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" sideOffset={8} className="w-48 p-1.5">
        <DropdownMenuLabel className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase px-2 py-1">
          {t.nav.language} / Language
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {SUPPORTED_LOCALES.map((item) => {
          const isSelected = item.code === locale
          return (
            <DropdownMenuItem
              key={item.code}
              onClick={() => setLocale(item.code as Locale)}
              className={cn(
                'flex items-center justify-between px-2.5 py-2 text-xs rounded-md cursor-pointer transition-colors',
                isSelected
                  ? 'bg-primary/10 text-primary font-semibold'
                  : 'text-foreground hover:bg-muted'
              )}
            >
              <div className="flex flex-col">
                <span className="text-xs leading-none">{item.nativeLabel}</span>
                <span className="text-[10px] text-muted-foreground mt-0.5">{item.label}</span>
              </div>
              {isSelected && <CheckIcon className="size-4 text-primary shrink-0" weight="bold" />}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
