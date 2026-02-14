"use client"
import { Handshake, Building2, GraduationCap, Globe, Users } from "lucide-react"

export function VisionGlobalPartnerships() {
  const partnerships = [
    {
      icon: Building2,
      title: "International Engineering Firms",
      description: "Collaborative partnerships with established engineering consultancies across Asia, Europe, and Africa for knowledge exchange and joint ventures."
    },
    {
      icon: GraduationCap,
      title: "Academic Institutions",
      description: "Research collaborations with universities and technical institutions for advancing engineering knowledge and developing innovative solutions."
    },
    {
      icon: Globe,
      title: "Development Organizations",
      description: "Partnerships with international development agencies and multilateral organizations working on sustainable energy and infrastructure projects."
    },
    {
      icon: Users,
      title: "Industry Associations",
      description: "Active membership in global engineering and renewable energy associations to stay connected with international standards and best practices."
    }
  ]

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-yellow-500 font-semibold text-sm tracking-wider uppercase">
            Strategic Alliances
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 mb-4">
            Global Partnerships
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Building strategic partnerships worldwide to deliver world-class engineering 
            solutions and expand our global footprint.
          </p>
        </div>

        {/* Partnerships Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {partnerships.map((item, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 border border-slate-200 hover:border-yellow-400 transition-all duration-300 hover:shadow-lg group"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-slate-900 group-hover:bg-yellow-400 rounded-2xl flex items-center justify-center shrink-0 transition-colors">
                  <item.icon className="w-8 h-8 text-yellow-400 group-hover:text-slate-900 transition-colors" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Partnership CTA */}
        <div className="mt-12 text-center">
          <a 
            href="/contact?type=partner"
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold px-8 py-4 rounded-xl transition-all duration-300"
          >
            <Handshake className="w-5 h-5" />
            Become a Partner
          </a>
        </div>
      </div>
    </section>
  )
}
