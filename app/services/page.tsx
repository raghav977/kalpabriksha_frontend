import { ServicesHero, ServicesList, ServicesProcess, ServicesCTA } from "@/components/services"
import { AdditionalServicesSection } from "@/components/services/AdditionalServicesSection"
import { EngineeringToolsSection } from "@/components/services/EngineeringToolsSection"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main>
        <ServicesHero />
        <ServicesList />
        <AdditionalServicesSection />
        <EngineeringToolsSection />
        <ServicesProcess />
        <ServicesCTA />
      </main>
      <Footer />
    </>
  )
}