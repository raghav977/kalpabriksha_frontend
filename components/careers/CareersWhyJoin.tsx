"use client"

import { Briefcase, Globe, TrendingUp, Users, Lightbulb, Award } from "lucide-react"

const benefits = [
  {
    icon: Briefcase,
    title: "Impactful Projects",
    description: "Work on renewable energy and infrastructure projects that make a real difference in Nepal's development."
  },
  {
    icon: Globe,
    title: "Global Exposure",
    description: "Gain experience with internationally-oriented consultancy practices and expand your professional horizons."
  },
  {
    icon: TrendingUp,
    title: "Career Growth",
    description: "Clear paths for professional advancement with mentorship from industry veterans."
  },
  {
    icon: Users,
    title: "Collaborative Culture",
    description: "Join a supportive team environment that values collaboration and knowledge sharing."
  },
  {
    icon: Lightbulb,
    title: "Innovation Focus",
    description: "Opportunities for research, technical development, and innovative problem-solving."
  },
  {
    icon: Award,
    title: "Recognition",
    description: "Your contributions are valued and recognized with competitive compensation and benefits."
  }
]

export default function CareersWhyJoin() {
  return (
    <section id="culture" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-yellow-500 font-semibold text-sm uppercase tracking-wider">
            WHY JOIN US
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-3 mb-4">
            Build Your Future With
            <span className="text-yellow-500"> Kalpabrikshya</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We offer more than just a job – we offer a career path where you can grow, 
            learn, and make a meaningful impact in the engineering sector.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="group bg-slate-50 hover:bg-yellow-500 p-8 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/20"
            >
              <div className="w-14 h-14 bg-yellow-500 group-hover:bg-white rounded-xl flex items-center justify-center mb-6 transition-colors duration-300">
                <benefit.icon className="w-7 h-7 text-slate-900" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-slate-900">
                {benefit.title}
              </h3>
              <p className="text-slate-600 group-hover:text-slate-800 transition-colors duration-300">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
