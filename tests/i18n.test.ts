import { describe, expect, test } from 'bun:test'
import { SUPPORTED_LOCALES, translations } from '../src/lib/i18n'

describe('i18n localization suite', () => {
  test('supports English (India) and Hindi (India)', () => {
    const codes = SUPPORTED_LOCALES.map((l) => l.code)
    expect(codes).toContain('en-IN')
    expect(codes).toContain('hi')
    expect(codes.length).toBe(2)
  })

  test('both locales have required top-level sections', () => {
    const requiredSections = [
      'brand',
      'nav',
      'hero',
      'showcase',
      'projectOverview',
      'workflow',
      'techSpecs',
      'promo',
      'downloads',
      'footer',
    ] as const

    for (const locale of ['en-IN', 'hi'] as const) {
      const dict = translations[locale]
      for (const section of requiredSections) {
        expect(dict).toHaveProperty(section)
      }
    }
  })

  test('hero downloadApk dynamic helper outputs proper format in both locales', () => {
    expect(translations['en-IN'].hero.downloadApk('1.13.0')).toBe('Download Android App (v1.13.0)')
    expect(translations['en-IN'].hero.downloadApk()).toBe('Download Android App')

    expect(translations.hi.hero.downloadApk('1.13.0')).toBe('एंड्रॉइड ऐप डाउनलोड करें (v1.13.0)')
    expect(translations.hi.hero.downloadApk()).toBe('एंड्रॉइड ऐप डाउनलोड करें')
  })

  test('workflow step counts and completed phase helper match', () => {
    expect(translations['en-IN'].workflow.steps.length).toBe(4)
    expect(translations.hi.workflow.steps.length).toBe(4)

    expect(translations['en-IN'].workflow.completedPhase(2)).toBe('Phase 2 completed')
    expect(translations.hi.workflow.completedPhase(2)).toBe('चरण 2 पूर्ण')
  })

  test('all showcase cards are fully translated', () => {
    const cardKeys = ['prototype', 'app', 'medical', 'analytics'] as const
    for (const key of cardKeys) {
      expect(translations['en-IN'].showcase.cards[key].title).toBeTruthy()
      expect(translations.hi.showcase.cards[key].title).toBeTruthy()
      expect(translations.hi.showcase.cards[key].description).toBeTruthy()
      expect(translations.hi.showcase.cards[key].highlights.length).toBeGreaterThan(0)
    }
  })
})
