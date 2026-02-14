"use client"
import { useState } from "react"
import { Zap, Droplets, Mountain, Cloud, Cpu } from "lucide-react"

type FocusArea = {
  key: string
  title: string
  icon: React.ElementType
  content: string[]
}

const focusAreas: FocusArea[] = [
  {
    key: "hydropower",
    title: "Hydropower & Energy",
    icon: Zap,
    content: [
      "Hydropower system optimization and efficiency enhancement",
      "Small and medium hydropower development challenges",
      "Power evacuation and grid interconnection studies",
      "Hybrid renewable energy systems (hydro–solar integration)",
    ],
  },
  {
    key: "hydrology",
    title: "Hydrology & Water Resources",
    icon: Droplets,
    content: [
      "Advanced hydrological and flood modeling",
      "Climate change impact on river basins",
      "Sediment transport and river morphology",
      "Design flood estimation and extreme event analysis",
    ],
  },
  {
    key: "geology",
    title: "Geology & Geotechnical",
    icon: Mountain,
    content: [
      "Engineering geological mapping",
      "Rock mass characterization (RMR, Q-system, GSI)",
      "Slope stability and landslide risk assessment",
      "Tunnel and foundation geotechnics",
    ],
  },
  {
    key: "climate",
    title: "Climate-Resilient Infrastructure",
    icon: Cloud,
    content: [
      "Climate-resilient hydraulic structures",
      "Nature-based slope and river stabilization",
      "Sustainable construction practices",
    ],
  },
  {
    key: "innovation",
    title: "Applied Engineering Innovation",
    icon: Cpu,
    content: [
      "Integration of geological and hydrological data",
      "GIS, remote sensing & numerical modeling",
      "Development of engineering tools and best practices",
    ],
  },
]

export function ResearchFocusAreas() {
  const [activeTab, setActiveTab] = useState("hydropower")

  const activeArea = focusAreas.find(area => area.key === activeTab) || focusAreas[0]

  return (
    <section className="py-20 px-6 bg-slate-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-yellow-400 font-semibold uppercase tracking-wider text-sm">
            Our Expertise
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
            Research Focus Areas
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Our research spans multiple domains critical to sustainable infrastructure and energy development
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {focusAreas.map((area) => (
            <button
              key={area.key}
              onClick={() => setActiveTab(area.key)}
              className={`flex items-center gap-2 px-5 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${
                activeTab === area.key
                  ? "bg-yellow-400 text-slate-900 shadow-lg"
                  : "bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700"
              }`}
            >
              <area.icon className="w-4 h-4" />
              {area.title}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="bg-slate-800 rounded-2xl p-8 md:p-10 border border-slate-700">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-14 h-14 bg-yellow-400 rounded-xl flex items-center justify-center">
              <activeArea.icon className="w-7 h-7 text-slate-900" />
            </div>
            <h3 className="text-2xl font-bold text-white">
              {activeArea.title}
            </h3>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {activeArea.content.map((item, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 bg-slate-900/50 p-4 rounded-lg border border-slate-700"
              >
                <span className="text-yellow-400 font-bold mt-0.5">→</span>
                <span className="text-slate-300">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
