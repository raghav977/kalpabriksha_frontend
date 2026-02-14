"use client"
import { MapPin, Building2, Handshake, TrendingUp } from "lucide-react"

export function VisionExpansion() {
  const expansionPlans = [
    {
      icon: MapPin,
      region: "South Asia",
      countries: ["India", "Bangladesh", "Sri Lanka", "Bhutan"],
      description: "Expanding our presence in neighboring countries with similar hydropower potential and infrastructure needs."
    },
    {
      icon: Building2,
      region: "Southeast Asia",
      countries: ["Vietnam", "Indonesia", "Philippines", "Myanmar"],
      description: "Targeting emerging markets with growing renewable energy demands and investment opportunities."
    },
    {
      icon: Handshake,
      region: "Africa",
      countries: ["Ethiopia", "Kenya", "Uganda", "Tanzania"],
      description: "Partnering with African nations rich in untapped hydropower resources for sustainable development."
    },
    {
      icon: TrendingUp,
      region: "Central Asia",
      countries: ["Tajikistan", "Kyrgyzstan", "Kazakhstan"],
      description: "Exploring opportunities in regions with significant hydropower capacity and modernization needs."
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-yellow-500 font-semibold text-sm tracking-wider uppercase">
            International Expansion
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 mb-4">
            Our Global Roadmap
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            With Nepal as our headquarters, we aim to establish branch offices and 
            strategic partnerships across emerging markets worldwide.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {expansionPlans.map((plan, index) => (
            <div 
              key={index}
              className="bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:border-yellow-400 transition-colors group"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-white group-hover:bg-yellow-400 rounded-2xl flex items-center justify-center flex-shrink-0 transition-colors shadow-sm">
                  <plan.icon className="w-8 h-8 text-yellow-500 group-hover:text-slate-900 transition-colors" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{plan.region}</h3>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {plan.countries.map((country, cIndex) => (
                      <span 
                        key={cIndex}
                        className="px-3 py-1 bg-white text-slate-700 text-sm rounded-full border border-slate-200"
                      >
                        {country}
                      </span>
                    ))}
                  </div>
                  <p className="text-slate-600">{plan.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
