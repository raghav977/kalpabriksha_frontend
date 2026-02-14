"use client"

import { siteConfig } from "@/config/siteConfig"
import { Droplets, Sun, Zap, Mountain, Waves } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Droplets,
  Sun,
  Zap,
  Mountain,
  Waves,
}

export function ServicesSection() {
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

        {/* Services Grid - Card Style like reference */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.services.slice(0, 4).map((service, index) => {
            const Icon = iconMap[service.icon] || Zap
            return (
              <div
                key={service.id}
                className="group text-center"
              >
                {/* Icon Box */}
                <div className="w-20 h-20 mx-auto mb-6 bg-slate-100 group-hover:bg-yellow-400 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:shadow-lg">
                  <Icon className="w-10 h-10 text-slate-700 group-hover:text-white transition-colors" />
                </div>
                
                <h3 className="text-lg font-bold text-slate-900 mb-3">
                  {service.title}
                </h3>
                
                {/* Image placeholder */}
                <div className="relative h-48 rounded-xl overflow-hidden bg-slate-200 mt-4">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
