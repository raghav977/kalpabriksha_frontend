"use client"

import { GraduationCap, Search, BookOpen, Users } from "lucide-react"

const programs = [
  {
    icon: GraduationCap,
    title: "Engineering Internships",
    duration: "3-6 months",
    description: "Hands-on experience in hydropower, solar, and infrastructure engineering. Work alongside senior engineers on real projects.",
    eligibility: "Final year students or recent graduates in Civil, Electrical, or Mechanical Engineering"
  },
  {
    icon: Search,
    title: "Research Fellowships",
    duration: "6-12 months",
    description: "Collaborative research opportunities in hydrology, geology, renewable energy, and sustainable infrastructure.",
    eligibility: "Master's or PhD candidates with relevant research interests"
  },
  {
    icon: BookOpen,
    title: "Graduate Training Program",
    duration: "12 months",
    description: "Comprehensive training program covering all aspects of engineering consultancy with rotation across departments.",
    eligibility: "Fresh graduates with strong academic records"
  },
  {
    icon: Users,
    title: "University Partnerships",
    duration: "Ongoing",
    description: "We partner with universities for joint research, thesis supervision, and industry exposure programs.",
    eligibility: "Universities and academic institutions"
  }
]

export default function CareersInternships() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-yellow-500 font-semibold text-sm uppercase tracking-wider">
            LEARNING & DEVELOPMENT
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-3 mb-4">
            Internships & Research
            <span className="text-yellow-500"> Opportunities</span>
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We support the next generation of engineers through structured programs 
            that provide real-world experience and research opportunities.
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {programs.map((program, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 hover:border-yellow-500/50"
            >
              <div className="flex items-start gap-6">
                <div className="w-16 h-16 bg-yellow-500 rounded-xl flex items-center justify-center flex-shrink-0">
                  <program.icon className="w-8 h-8 text-slate-900" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <h3 className="text-xl font-bold text-slate-900">{program.title}</h3>
                    <span className="px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
                      {program.duration}
                    </span>
                  </div>
                  <p className="text-slate-600 mb-4">
                    {program.description}
                  </p>
                  <div className="pt-4 border-t border-slate-100">
                    <p className="text-sm">
                      <span className="font-semibold text-slate-900">Eligibility: </span>
                      <span className="text-slate-600">{program.eligibility}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
