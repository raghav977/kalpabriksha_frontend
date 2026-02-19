"use client"

import { Droplets, Sun, Zap, Mountain, Waves, Building, Cpu, Leaf } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useServices } from "@/hooks/api"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Droplets,
  Sun,
  Zap,
  Mountain,
  Waves,
  Building,
  Cpu,
  Leaf,
}

export function ServicesSection() {
  const { data: services, isLoading } = useServices(true)
  
  // Show first 4 services
  const displayServices = services?.slice(0, 4) || []

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-yellow-500 font-semibold uppercase tracking-wider text-sm mb-3 block">
            WHAT WE DO
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6">
            A Fully Integrated Engineering Services
          </h2>
          <p className="text-slate-600 text-lg">
            Delivering comprehensive engineering consultancy services across the renewable energy sector with technical excellence.
          </p>
        </div>

        {/* Services Grid - Card Style */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="text-center animate-pulse">
                <div className="w-20 h-20 mx-auto mb-6 bg-slate-200 rounded-xl" />
                <div className="h-5 w-32 bg-slate-200 rounded mx-auto mb-3" />
                <div className="h-48 bg-slate-200 rounded-xl mt-4" />
              </div>
            ))
          ) : (
            displayServices.map((service) => {
              const Icon = iconMap[service.icon] || Zap
              return (
                <Link
                  key={service.id}
                  href={`/services#${service.slug}`}
                  className="group text-center block"
                >
                  {/* Icon Box */}
                  <div className="w-20 h-20 mx-auto mb-6 bg-slate-100 group-hover:bg-yellow-400 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:shadow-lg">
                    <Icon className="w-10 h-10 text-slate-700 group-hover:text-white transition-colors" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-slate-900 mb-3">
                    {service.title}
                  </h3>
                  
                  <p className="text-slate-600 text-sm line-clamp-2">
                    {service.shortDesc}
                  </p>
                </Link>
              )
            })
          )}
        </div>

        {/* View All Link */}
        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 text-yellow-600 hover:text-yellow-700 font-semibold transition-colors"
          >
            View All Services
            <span className="text-lg">→</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
