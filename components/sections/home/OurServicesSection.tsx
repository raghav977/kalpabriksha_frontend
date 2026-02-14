"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { useServices } from "@/hooks/api"

// Static images for the visual grid - using available images in /public/
const serviceImages = [
  { src: "/energy.webp", label: "Energy Solutions", height: "h-48" },
  { src: "/solar.jpg", label: "Solar Power", height: "h-32" },
  { src: "/geology.jpg", label: "Geological Studies", height: "h-32" },
  { src: "/construction.jpg", label: "Infrastructure", height: "h-48" },
]

export function OurServicesSection() {
  const { data: services, isLoading } = useServices(true)

  // Get service titles for the list, fallback to defaults if loading
  const serviceHighlights = services?.slice(0, 6).map(s => s.title) || [
    "Hydropower Engineering",
    "Solar Energy Solutions", 
    "Infrastructure Design",
    "Project Management",
    "Environmental Studies",
    "Technical Advisory",
  ]

  return (
    <section className="relative py-20 lg:py-28 bg-slate-900 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/mainphotoupperkhadam.jpeg"
          alt="Engineering Background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-slate-900/80" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Images Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              {serviceImages.slice(0, 2).map((img, index) => (
                <div key={index} className={`relative ${img.height} rounded-xl overflow-hidden`}>
                  <Image
                    src={img.src}
                    alt={img.label}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-semibold text-sm">{img.label}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="space-y-4 pt-8">
              {serviceImages.slice(2, 4).map((img, index) => (
                <div key={index} className={`relative ${index === 0 ? 'h-32' : 'h-48'} rounded-xl overflow-hidden`}>
                  <Image
                    src={img.src}
                    alt={img.label}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-semibold text-sm">{img.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Content */}
          <div>
            <span className="text-yellow-400 font-semibold uppercase tracking-wider text-sm mb-3 block">
              OUR SERVICES
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              We Provide Cost Effective Engineering Solutions
            </h2>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              From feasibility studies to commissioning, we deliver end-to-end engineering 
              solutions for hydropower and renewable energy projects.
            </p>

            {/* Service List Grid */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {isLoading ? (
                // Loading skeleton
                Array.from({ length: 6 }).map((_, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-4 h-4 bg-slate-700 rounded animate-pulse" />
                    <div className="h-4 w-24 bg-slate-700 rounded animate-pulse" />
                  </div>
                ))
              ) : (
                serviceHighlights.map((service, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <ArrowRight className="w-4 h-4 text-yellow-400 shrink-0" />
                    <span className="text-white text-sm">{service}</span>
                  </div>
                ))
              )}
            </div>

            <Link 
              href="/services" 
              className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Explore All Services
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
