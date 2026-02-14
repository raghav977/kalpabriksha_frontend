import { ProjectsHero, ProjectsList, ProjectsStats, ProjectsCTA } from "@/components/projects"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

export default function ProjectsPage() {
  return (
    <>
      <Header />
      <main>
        <ProjectsHero />
        <ProjectsList />
        <ProjectsStats />
        <ProjectsCTA />
      </main>
      <Footer />
    </>
  )
}