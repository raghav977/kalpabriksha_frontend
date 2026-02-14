import { 
  VisionHero, 
  VisionMission, 
  VisionExpansion, 
  VisionCoreValues, 
  VisionFounderMessage, 
  VisionCTA,
  VisionGlobalPartnerships,
  VisionConferences,
  VisionGlobalStandards
} from "@/components/vision"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

export default function VisionPage() {
  return (
    <>
      <Header />
      <main>
        <VisionHero />
        <VisionMission />
        <VisionCoreValues />
        <VisionExpansion />
        <VisionGlobalPartnerships />
        <VisionConferences />
        <VisionGlobalStandards />
        <VisionFounderMessage />
        <VisionCTA />
      </main>
      <Footer />
    </>
  )
}
