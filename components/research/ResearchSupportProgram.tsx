"use client"
import { DollarSign, Users, Database, Award } from "lucide-react"

const supportItems = [
  {
    icon: DollarSign,
    title: "Financial Sponsorship",
    description: "Full or partial research funding for qualified projects"
  },
  {
    icon: Users,
    title: "Technical Mentorship",
    description: "Expert review and engineering guidance throughout your research"
  },
  {
    icon: Database,
    title: "Data Access",
    description: "Project data and site exposure (confidentiality applies)"
  },
  {
    icon: Award,
    title: "Conference Support",
    description: "Paper refinement and sponsorship assistance for publications"
  }
]

export function ResearchSupportProgram() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <span className="text-yellow-600 font-semibold uppercase tracking-wider text-sm">
            Support Program
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 mb-4">
            Research Support Program
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We selectively support research aligned with our core technical domains through various programs
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {supportItems.map((item, index) => (
            <div 
              key={index}
              className="group bg-slate-50 hover:bg-yellow-400 p-8 rounded-xl transition-all duration-300 border border-slate-100 hover:border-yellow-400 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="w-14 h-14 bg-yellow-400 group-hover:bg-white rounded-xl flex items-center justify-center mb-5 transition-colors duration-300">
                <item.icon className="w-7 h-7 text-slate-900" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-3">
                {item.title}
              </h3>
              <p className="text-slate-600 group-hover:text-slate-800 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
