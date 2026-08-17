import { useEffect, useState } from 'react'
import { Downloads } from './components/Downloads'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ProjectOverview } from './components/ProjectOverview'
import { PhonePortalPromo } from './components/PhonePortalPromo'
import { PhoneResultsPortal } from './components/PhoneResultsPortal'
import { Workflow } from './components/Workflow'
import {
  fetchLatestStableDownloads,
  getCachedReleaseDownloads,
  shouldRefreshReleaseDownloads,
  type ReleaseDownloads,
} from './releaseDownloads'

function MarketingSite() {
  const [downloads, setDownloads] = useState<ReleaseDownloads>(() => getCachedReleaseDownloads() ?? { apk: null, zero2wImage: null })
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
    <>
      <Header />
      <main>
        <Hero apk={downloads.apk} isLoading={isLoadingDownloads} />
        <ProjectOverview />
        <Workflow />
        <PhonePortalPromo />
        <Downloads {...downloads} isLoading={isLoadingDownloads} />
      </main>
    </>
  )
}

function App() {
  const isPhonePortal = window.location.pathname.replace(/\/+$/, '').endsWith('/webportal')
  return isPhonePortal ? <PhoneResultsPortal /> : <MarketingSite />
}

export default App
