import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { siteConfig } from "@/config/siteConfig"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { Award, Shield, Leaf, Lightbulb, Globe, Target, Eye } from "lucide-react"
// import Company from "@/components/sections/about/Company"
import Coverview from "@/components/sections/about/Coverview"
import MdMessage from "@/components/sections/about/MdMessage"
import { Company } from "@/components/sections/about/Company"
import { AboutCta } from "@/components/sections/about/AboutCta"

const valueIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Award,
  Shield,
  Leaf,
  Lightbulb,
  Globe,
}

export default function AboutPage() {
  return (
    <main>
      <Header />
      <Company/>

      <Coverview/>
      <MdMessage/>
      <AboutCta/>




      {/* Company Overview */}


      {/* Core Values */}


      {/* CTA */}
      

      <Footer />
    </main>
  )
}
