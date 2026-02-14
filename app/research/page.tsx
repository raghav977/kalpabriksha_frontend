import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import {
  ResearchHero,
  ResearchPhilosophy,
  ResearchSupportProgram,
  ResearchFocusAreas,
  ResearchProposal,
  ResearchConferenceSupport,
} from "@/components/research"

export default function ResearchPage() {
  return (
    <>
      <Header />
      <main>
        <ResearchHero />
        <ResearchPhilosophy />
        <ResearchSupportProgram />
        <ResearchFocusAreas />
        <ResearchProposal />
        <ResearchConferenceSupport />
      </main>
      <Footer />
    </>
  )
}
