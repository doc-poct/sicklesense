import { useEffect, useState } from 'react'
import { Downloads } from './components/Downloads'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ProjectOverview } from './components/ProjectOverview'
import { Workflow } from './components/Workflow'
import {
  fetchLatestStableDownloads,
  getCachedReleaseDownloads,
  shouldRefreshReleaseDownloads,
  type ReleaseDownloads,
} from './releaseDownloads'

function App() {
  const [downloads, setDownloads] = useState<ReleaseDownloads>(() => getCachedReleaseDownloads() ?? { apk: null, zero2wImage: null })
  const [isLoadingDownloads, setIsLoadingDownloads] = useState(() => getCachedReleaseDownloads() === null)

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
        <Workflow />
        <ProjectOverview />
        <Downloads {...downloads} isLoading={isLoadingDownloads} />
      </main>
    </>
  )
}

export default App
