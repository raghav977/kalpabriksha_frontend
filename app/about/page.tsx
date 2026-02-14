import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import { siteConfig } from "@/config/siteConfig"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { Award, Shield, Leaf, Lightbulb, Globe, Target, Eye } from "lucide-react"
import Comapny from "@/components/sections/about/Company"
import Coverview from "@/components/sections/about/Coverview"
import MdMessage from "@/components/sections/about/MdMessage"

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
      <Comapny/>
      <Coverview/>
      <MdMessage/>




      {/* Company Overview */}


      {/* Core Values */}


      {/* CTA */}
      <section className="py-16 lg:py-24 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-12 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Partner With Us
          </h2>
          <p className="text-white/80 text-lg mb-8">
            Join us in our journey of growth, innovation, and engineering excellence.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                Get in Touch
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline" size="lg" className="border-white/30 text-primary hover:bg-white/10">
                Explore Services
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
