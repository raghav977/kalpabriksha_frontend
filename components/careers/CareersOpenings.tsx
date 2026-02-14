"use client"

import { MapPin, Clock, ArrowRight } from "lucide-react"
import Link from "next/link"

const openings = [
  {
    id: 1,
    title: "Hydropower Design Engineer",
    location: "Kathmandu",
    type: "Full-time",
    department: "Engineering",
    description: "Experience in hydrological analysis, hydraulic design, and feasibility studies for hydropower projects. Join our core team working on multiple run-of-river hydropower developments.",
    requirements: [
      "Bachelor's degree in Civil/Hydropower Engineering",
      "3+ years experience in hydropower design",
      "Proficiency in HEC-RAS, AutoCAD, and hydraulic modeling",
      "Strong analytical and problem-solving skills"
    ]
  },
  {
    id: 2,
    title: "Engineering Geologist / Geotechnical Engineer",
    location: "Field + Office",
    type: "Full-time",
    department: "Geology",
    description: "Experience in geological mapping, slope stability, and foundation assessment for infrastructure projects. Work on exciting field investigations across Nepal.",
    requirements: [
      "Master's degree in Geology or Geotechnical Engineering",
      "Experience in geological hazard assessment",
      "Knowledge of rock mechanics and soil mechanics",
      "Willingness to travel for field work"
    ]
  },
  {
    id: 3,
    title: "Solar Energy Systems Engineer",
    location: "Kathmandu",
    type: "Full-time",
    department: "Renewable Energy",
    description: "Design and oversee solar PV installations for grid-connected and off-grid systems. Lead our growing solar energy division.",
    requirements: [
      "Bachelor's in Electrical/Energy Engineering",
      "2+ years experience in solar PV design",
      "Knowledge of PVsyst, AutoCAD, and electrical design",
      "Understanding of Nepal's grid codes"
    ]
  },
  {
    id: 4,
    title: "Graduate Engineer Trainee",
    location: "Kathmandu",
    type: "Entry Level",
    department: "Multiple",
    description: "Fresh graduates in civil, hydropower, or geotechnical engineering are encouraged to apply. Learn from industry experts and grow your career.",
    requirements: [
      "Bachelor's degree in relevant engineering field",
      "Strong academic record",
      "Eagerness to learn and grow",
      "Good communication skills"
    ]
  }
]

export default function CareersOpenings() {
  return (
    <section id="openings" className="relative py-20 bg-emerald-900 text-white overflow-hidden">
      {/* Wavy Top SVG */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
        <svg className="relative block w-full h-16 sm:h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
        </svg>
      </div>
      
      {/* Wavy Bottom SVG */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-16 sm:h-24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" fill="#ffffff"></path>
        </svg>
      </div>

      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }}></div>
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="text-yellow-400 font-semibold text-sm uppercase tracking-wider">
            CURRENT OPENINGS
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4">
            Find Your Perfect Role
          </h2>
          <p className="text-emerald-100 max-w-2xl mx-auto">
            Explore our open positions and take the next step in your engineering career.
          </p>
        </div>

        {/* Job Listings */}
        <div className="space-y-6">
          {openings.map((job) => (
            <div 
              key={job.id}
              className="group bg-white/10 backdrop-blur-sm hover:bg-white/20 border border-white/20 hover:border-yellow-400/50 rounded-2xl p-8 transition-all duration-300"
            >
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
                {/* Job Info */}
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-3">
                    <span className="px-3 py-1 bg-yellow-400/20 text-yellow-400 text-xs font-semibold rounded-full">
                      {job.department}
                    </span>
                    <span className="px-3 py-1 bg-white/10 text-white text-xs font-medium rounded-full">
                      {job.type}
                    </span>
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-3 group-hover:text-yellow-400 transition-colors">
                    {job.title}
                  </h3>
                  
                  <div className="flex flex-wrap items-center gap-4 text-emerald-100 text-sm mb-4">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {job.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {job.type}
                    </span>
                  </div>
                  
                  <p className="text-emerald-100 mb-4">
                    {job.description}
                  </p>

                  {/* Requirements */}
                  <div className="space-y-2">
                    <p className="text-sm font-semibold text-white">Key Requirements:</p>
                    <ul className="grid sm:grid-cols-2 gap-2">
                      {job.requirements.map((req, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-emerald-100">
                          <span className="text-yellow-400 mt-1">•</span>
                          {req}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Apply Button */}
                <div className="lg:self-center">
                  <Link href="#apply">
                    <button className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-300 text-emerald-900 font-semibold px-6 py-3 rounded-lg transition-all duration-300 group/btn shadow-lg hover:shadow-yellow-400/25">
                      Apply Now
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
