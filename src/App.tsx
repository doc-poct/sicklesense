import { Downloads } from './components/Downloads'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { ProjectOverview } from './components/ProjectOverview'
import { Workflow } from './components/Workflow'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Workflow />
        <ProjectOverview />
        <Downloads />
      </main>
    </>
  )
}

export default App
