"use client"
import { siteConfig } from "@/config/siteConfig"
import { Wrench } from "lucide-react"

export function EngineeringToolsSection() {
  // Group tools by category
  const categories = siteConfig.engineeringTools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = []
    }
    acc[tool.category].push(tool.name)
    return acc
  }, {} as Record<string, string[]>)

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-yellow-500 font-semibold text-sm tracking-wider uppercase">
            Technical Capabilities
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 mb-4">
            Engineering Tools & Software
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We utilize industry-leading software and tools to deliver precise, 
            efficient, and world-class engineering solutions.
          </p>
        </div>

        {/* Tools Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {siteConfig.engineeringTools.map((tool, index) => (
            <div 
              key={index}
              className="bg-white border border-slate-200 rounded-xl p-5 hover:border-yellow-400 hover:shadow-lg transition-all duration-300 group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-900 group-hover:bg-yellow-400 rounded-xl flex items-center justify-center transition-colors">
                  <Wrench className="w-5 h-5 text-yellow-400 group-hover:text-slate-900 transition-colors" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-900">{tool.name}</h3>
                  <p className="text-sm text-slate-500">{tool.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Categories Overview */}
        <div className="mt-16 pt-12 border-t border-slate-200">
          <h3 className="text-xl font-bold text-slate-900 mb-8 text-center">Our Expertise Covers</h3>
          <div className="flex flex-wrap justify-center gap-3">
            {Object.keys(categories).map((category, index) => (
              <span 
                key={index}
                className="px-4 py-2 bg-slate-900 text-white rounded-full text-sm font-medium"
              >
                {category}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
