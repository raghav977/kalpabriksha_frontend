"use client"
import { Mountain, Map, Droplets, Zap, Building, Route, HardHat, Leaf } from "lucide-react"
import { siteConfig } from "@/config/siteConfig"

const iconMap: Record<string, React.ElementType> = {
  Mountain,
  Map,
  Droplets,
  Zap,
  Building,
  Route,
  HardHat,
  Leaf
}

export function AdditionalServicesSection() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-yellow-400 font-semibold text-sm tracking-wider uppercase">
            Comprehensive Support
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
            Additional Engineering & Technical Services
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Beyond our core consultancy services, we provide a full range of 
            technical support for infrastructure and energy projects.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {siteConfig.additionalServices.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Mountain
            return (
              <div 
                key={index}
                className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-14 h-14 bg-yellow-400/10 group-hover:bg-yellow-400 rounded-xl flex items-center justify-center mb-4 transition-colors">
                  <IconComponent className="w-7 h-7 text-yellow-400 group-hover:text-slate-900 transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-white">{service.title}</h3>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
