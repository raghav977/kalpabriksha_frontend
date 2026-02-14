"use client"
import { Award, Shield, Leaf, Lightbulb, Globe } from "lucide-react"
import { siteConfig } from "@/config/siteConfig"

const iconMap: Record<string, React.ElementType> = {
  Award,
  Shield,
  Leaf,
  Lightbulb,
  Globe
}

export function VisionCoreValues() {
  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-yellow-400 font-semibold text-sm tracking-wider uppercase">
            What Drives Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
            Our Core Values
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            These principles guide our work and define our commitment to excellence 
            in everything we do.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {siteConfig.coreValues.map((value, index) => {
            const IconComponent = iconMap[value.icon] || Award
            return (
              <div 
                key={index}
                className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 text-center hover:bg-slate-800 hover:border-yellow-400/50 transition-all group"
              >
                <div className="w-14 h-14 bg-yellow-400/10 group-hover:bg-yellow-400/20 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-colors">
                  <IconComponent className="w-7 h-7 text-yellow-400" />
                </div>
                <h3 className="text-white font-semibold">{value.title}</h3>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
