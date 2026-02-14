import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import {
  CareersHero,
  CareersWhyJoin,
  CareersOpenings,
  CareersInternships,
  CareersCTA
} from "@/components/careers"

export default function CareersPage() {
  return (
    <>
      <Header />
      <main>
        <CareersHero />
        <CareersWhyJoin />
        <CareersOpenings />
        <CareersInternships />
        <CareersCTA />
      </main>
      <Footer />
    </>
  )
}
