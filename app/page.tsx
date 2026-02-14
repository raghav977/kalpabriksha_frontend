import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import Hero from "@/components/sections/hero/Hero"
import { ServicesSection } from "@/components/sections/home/ServicesSection"
import { AboutPreviewSection } from "@/components/sections/home/AboutPreviewSection"
import { OurServicesSection } from "@/components/sections/home/OurServicesSection"
import { WhyChooseUsSection } from "@/components/sections/home/WhyChooseUsSection"
import { ProjectsPreviewSection } from "@/components/sections/home/ProjectsPreviewSection"
import { TestimonialsSection } from "@/components/sections/home/TestimonialsSection"
import { CTASection } from "@/components/sections/home/CTASection"
import { MessageFounder } from "@/components/sections/home/MessageFounder"
import { OurTeamSection } from "@/components/sections/home/OurTeamSection"

export default function Home() {
  return (
    <main>
      <Header />
      <Hero />
      <ServicesSection />
      <AboutPreviewSection />
      <OurServicesSection />
      <WhyChooseUsSection />
      <OurTeamSection />
      <ProjectsPreviewSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  )
}
