"use client"
import { Droplets, Sun, Zap, Mountain, Waves, ArrowRight, CheckCircle, Map, Activity } from "lucide-react"
import { siteConfig } from "@/config/siteConfig"
import Link from "next/link"

const iconMap: Record<string, React.ElementType> = {
  Droplets,
  Sun,
  Zap,
  Mountain,
  Waves,
  Map,
  Activity
}

export function ServicesList() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-yellow-500 font-semibold text-sm tracking-wider uppercase">
            Our Expertise
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 mb-4">
            Comprehensive Engineering Solutions
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            From feasibility studies to project commissioning, we provide end-to-end 
            consultancy services for renewable energy and infrastructure projects.
          </p>
        </div>

        <div className="space-y-8">
          {siteConfig.services.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Zap
            const isEven = index % 2 === 0

            return (
              <div 
                key={service.id}
                className={`bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden ${
                  isEven ? "" : "md:flex-row-reverse"
                }`}
              >
                <div className={`flex flex-col md:flex-row ${isEven ? "" : "md:flex-row-reverse"}`}>
                  {/* Icon Section */}
                  <div className={`md:w-1/3 bg-slate-900 p-8 md:p-12 flex flex-col justify-center items-center text-center ${
                    isEven ? "md:rounded-l-2xl" : "md:rounded-r-2xl"
                  }`}>
                    <div className="w-20 h-20 bg-yellow-400 rounded-2xl flex items-center justify-center mb-6">
                      <IconComponent className="w-10 h-10 text-slate-900" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                    <p className="text-slate-400">{service.shortDesc}</p>
                  </div>

                  {/* Features Section */}
                  <div className="md:w-2/3 p-8 md:p-12">
                    <h4 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                      <span className="w-8 h-1 bg-yellow-400 rounded-full"></span>
                      Key Services
                    </h4>
                    
                    <div className="grid sm:grid-cols-2 gap-4">
                      {service.features.map((feature, fIndex) => (
                        <div 
                          key={fIndex} 
                          className="flex items-start gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors"
                        >
                          <CheckCircle className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5" />
                          <span className="text-slate-700">{feature}</span>
                        </div>
                      ))}
                    </div>

                    <Link 
                      href="/contact?type=consult"
                      className="inline-flex items-center gap-2 mt-8 text-yellow-600 font-semibold hover:text-yellow-700 transition-colors"
                    >
                      Consult With Us <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
