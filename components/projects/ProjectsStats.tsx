"use client"
import { Zap, TrendingUp, Award, Users } from "lucide-react"

export function ProjectsStats() {
  const stats = [
    {
      icon: Zap,
      value: "3.7+ MW",
      label: "Total Capacity Under Development",
      description: "Combined capacity of all ongoing hydropower projects"
    },
    {
      icon: TrendingUp,
      value: "4",
      label: "Active Projects",
      description: "Currently providing technical consultancy"
    },
    {
      icon: Award,
      value: "100%",
      label: "On-Time Delivery",
      description: "Meeting project milestones consistently"
    },
    {
      icon: Users,
      value: "3+",
      label: "Client Partners",
      description: "Trusted by leading hydropower developers"
    }
  ]

  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-yellow-400 font-semibold text-sm tracking-wider uppercase">
            Our Impact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
            Project Statistics
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Our track record speaks for itself with measurable results 
            in Nepal&apos;s renewable energy sector.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index}
              className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 text-center hover:bg-slate-800 transition-colors group"
            >
              <div className="w-16 h-16 bg-yellow-400/10 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-yellow-400/20 transition-colors">
                <stat.icon className="w-8 h-8 text-yellow-400" />
              </div>
              <p className="text-4xl font-bold text-white mb-2">{stat.value}</p>
              <p className="text-yellow-400 font-semibold mb-2">{stat.label}</p>
              <p className="text-slate-500 text-sm">{stat.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
