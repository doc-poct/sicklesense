import { useEffect, useState } from 'react'
import { Downloads } from './components/Downloads'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ProjectOverview } from './components/ProjectOverview'
import { Workflow } from './components/Workflow'
import { fetchLatestStableDownloads, type ReleaseDownloads } from './releaseDownloads'

function App() {
  const [downloads, setDownloads] = useState<ReleaseDownloads>({ apk: null, zero2wImage: null })
  const [isLoadingDownloads, setIsLoadingDownloads] = useState(true)

  useEffect(() => {
    const controller = new AbortController()

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

    return () => controller.abort()
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
