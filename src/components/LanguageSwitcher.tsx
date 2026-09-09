import { CaretDownIcon, TranslateIcon } from '@phosphor-icons/react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { SUPPORTED_LOCALES, useLanguage, type Locale } from '@/lib/i18n'
import { cn } from '@/lib/utils'

interface LanguageSwitcherProps {
  className?: string
  size?: 'xs' | 'sm' | 'default'
  variant?: 'outline' | 'ghost' | 'secondary'
  compact?: boolean
  align?: 'start' | 'center' | 'end'
}

export function LanguageSwitcher({
  className,
  size = 'sm',
  variant = 'outline',
  compact,
  align = 'end',
}: LanguageSwitcherProps) {
  const { locale, setLocale, t } = useLanguage()

  const currentLocale =
    SUPPORTED_LOCALES.find((item) => item.code === locale) ?? SUPPORTED_LOCALES[0]
  const isCompact = compact !== undefined ? compact : size === 'xs'

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={
          <Button
            variant={variant}
            size={size}
            aria-label={t.nav.language}
            className={cn(
              'cursor-pointer select-none font-medium transition-all',
              size === 'xs' && 'h-5 gap-1 px-1.5 text-[10px]',
              size === 'sm' && 'h-6 gap-1.5 px-2 text-xs',
              className
            )}
          />
        }
      >
        <TranslateIcon
          className={cn(
            'text-primary shrink-0',
            size === 'xs' ? 'size-3' : 'size-3.5'
          )}
          weight="bold"
        />

        <span className="leading-none">
          {isCompact ? currentLocale.compactLabel : currentLocale.shortLabel}
        </span>

        <CaretDownIcon
          className={cn(
            'text-muted-foreground shrink-0 transition-transform duration-150 group-aria-expanded/button:rotate-180',
            size === 'xs' ? 'size-2.5' : 'size-3'
          )}
        />
      </DropdownMenuTrigger>

      <DropdownMenuContent
        align={align}
        sideOffset={6}
        className="w-44 p-1 shadow-lg"
      >
        <DropdownMenuRadioGroup
          value={locale}
          onValueChange={(val) => {
            if (val) setLocale(val as Locale)
          }}
        >
          {SUPPORTED_LOCALES.map((item) => (
            <DropdownMenuRadioItem
              key={item.code}
              value={item.code}
              className="cursor-pointer py-1.5 pr-8 pl-2.5 text-xs transition-colors"
            >
              <div className="flex flex-col items-start leading-snug">
                <span className="font-semibold text-foreground">
                  {item.shortLabel}
                </span>
                <span className="text-[10px] text-muted-foreground">
                  {item.label}
                </span>
              </div>
            </DropdownMenuRadioItem>
          ))}
        </DropdownMenuRadioGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
