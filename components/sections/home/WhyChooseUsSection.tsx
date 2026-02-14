import { siteConfig } from "@/config/siteConfig"
import { Target, CheckCircle, Globe, Microscope, ArrowRight } from "lucide-react"
import Link from "next/link"

export function WhyChooseUsSection() {
  return (
    <section className="py-20 lg:py-28 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-yellow-500 font-semibold uppercase tracking-wider text-sm mb-3 block">
            NAVIGATING THE FUTURE
          </span>
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
              {siteConfig.shortName} Is The Leader In Engineering Consultancy
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              With Nepal as our headquarters, we combine local expertise with international best practices 
              to deliver world-class engineering solutions. Our commitment to research, innovation, and 
              sustainable development sets us apart.
            </p>
          </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <p className="text-4xl lg:text-5xl font-bold text-yellow-500 mb-2">4+</p>
            <p className="text-slate-600 text-sm">Active Projects</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <p className="text-4xl lg:text-5xl font-bold text-yellow-500 mb-2">3.7</p>
            <p className="text-slate-600 text-sm">MW Under Development</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <p className="text-4xl lg:text-5xl font-bold text-yellow-500 mb-2">5+</p>
            <p className="text-slate-600 text-sm">Expert Engineers</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm text-center">
            <p className="text-4xl lg:text-5xl font-bold text-yellow-500 mb-2">100%</p>
            <p className="text-slate-600 text-sm">Client Satisfaction</p>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="flex justify-center">
          <Link 
            href="/about" 
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold px-8 py-4 rounded-lg transition-colors"
          >
            Learn More About Us
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
