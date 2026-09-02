import { lazy, Suspense, useEffect, useState } from 'react'
import { DeviceShowcase } from './components/DeviceShowcase'
import { Downloads } from './components/Downloads'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ProjectOverview } from './components/ProjectOverview'
import { PhonePortalPromo } from './components/PhonePortalPromo'
import { TechSpecs } from './components/TechSpecs'
import { Workflow } from './components/Workflow'
import { Spinner } from './components/ui/spinner'
import {
  fetchLatestStableDownloads,
  getCachedReleaseDownloads,
  shouldRefreshReleaseDownloads,
  type ReleaseDownloads,
} from './releaseDownloads'
import { LanguageProvider } from './lib/i18n'

const PhoneResultsPortal = lazy(() =>
  import('./components/PhoneResultsPortal').then((mod) => ({
    default: mod.PhoneResultsPortal,
  }))
)

function MarketingSite() {
  const [downloads, setDownloads] = useState<ReleaseDownloads>(
    () => getCachedReleaseDownloads() ?? { apk: null, zero2wImage: null, scdTerminalImage: null }
  )
  const [isLoadingDownloads, setIsLoadingDownloads] = useState(false)

  useEffect(() => {
    const controller = new AbortController()

    const refreshDownloads = () => {
      if (document.visibilityState !== 'visible') return
      if (!shouldRefreshReleaseDownloads()) {
        setIsLoadingDownloads(false)
        return
      }

      void fetchLatestStableDownloads(controller.signal)
        .then(setDownloads)
        .catch((error: unknown) => {
          if (!(error instanceof DOMException && error.name === 'AbortError')) {
            console.error('Could not resolve public release downloads.', error)
          }
        })
        .finally(() => {
          if (!controller.signal.aborted) setIsLoadingDownloads(false)
        })
    }

    refreshDownloads()
    const interval = window.setInterval(refreshDownloads, 60 * 60 * 1000)
    document.addEventListener('visibilitychange', refreshDownloads)

    return () => {
      controller.abort()
      window.clearInterval(interval)
      document.removeEventListener('visibilitychange', refreshDownloads)
    }
  }, [])

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero apk={downloads.apk} isLoading={isLoadingDownloads} />
        <DeviceShowcase />
        <ProjectOverview />
        <Workflow />
        <TechSpecs />
        <PhonePortalPromo />
        <Downloads {...downloads} isLoading={isLoadingDownloads} />
      </main>
    </div>
  )
}

function App() {
  const isPhonePortal = window.location.pathname.replace(/\/+$/, '').endsWith('/webportal')

  if (isPhonePortal) {
    return (
      <Suspense
        fallback={
          <div className="flex h-screen w-screen items-center justify-center bg-background text-foreground">
            <div className="flex flex-col items-center gap-3">
              <Spinner className="size-8 text-primary" />
              <p className="text-xs font-medium text-muted-foreground">Loading Phone Results Portal…</p>
            </div>
          </div>
        }
      >
        <PhoneResultsPortal />
      </Suspense>
    )
  }

  return (
    <LanguageProvider>
      <MarketingSite />
    </LanguageProvider>
  )
}

export default App
