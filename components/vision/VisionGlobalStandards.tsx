"use client"
import { Shield, FileCheck, Globe, Award, CheckCircle } from "lucide-react"

export function VisionGlobalStandards() {
  const standards = [
    {
      icon: FileCheck,
      title: "International Engineering Standards",
      items: ["ISO 9001 Quality Management", "IEC Standards for Power Systems", "IEEE Standards for Electrical Engineering"]
    },
    {
      icon: Shield,
      title: "Environmental & Safety",
      items: ["ISO 14001 Environmental Management", "IFC Performance Standards", "World Bank Environmental Guidelines"]
    },
    {
      icon: Award,
      title: "Industry Best Practices",
      items: ["IHA Hydropower Sustainability Protocol", "IRENA Renewable Energy Guidelines", "Regional Grid Codes Compliance"]
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-yellow-500 font-semibold text-sm tracking-wider uppercase">
            Quality Assurance
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 mb-4">
            Global Engineering Standards
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Committed to international standards and best practices to ensure 
            world-class quality in every project we deliver.
          </p>
        </div>

        {/* Standards Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {standards.map((standard, index) => (
            <div 
              key={index}
              className="bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:border-yellow-400 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-yellow-400 rounded-xl flex items-center justify-center mb-6">
                <standard.icon className="w-7 h-7 text-slate-900" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-4">{standard.title}</h3>
              <ul className="space-y-3">
                {standard.items.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-slate-600">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Global Reach Statement */}
        <div className="mt-16 bg-slate-900 rounded-2xl p-8 md:p-12 text-center">
          <Globe className="w-16 h-16 text-yellow-400 mx-auto mb-6" />
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Engineering Excellence Without Borders
          </h3>
          <p className="text-slate-400 max-w-2xl mx-auto leading-relaxed">
            From Nepal to the world — we bring interdisciplinary expertise, international 
            standards compliance, and a commitment to sustainable development to every market we serve.
          </p>
        </div>
      </div>
    </section>
  )
}
