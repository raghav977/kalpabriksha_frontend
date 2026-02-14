"use client"
import { CheckCircle } from "lucide-react"
import Image from "next/image"

export function ServicesProcess() {
  const steps = [
    {
      number: "01",
      title: "Initial Consultation",
      description: "We begin with understanding your project requirements, goals, and constraints through detailed discussions."
    },
    {
      number: "02", 
      title: "Feasibility Analysis",
      description: "Our experts conduct comprehensive feasibility studies including technical, financial, and environmental assessments."
    },
    {
      number: "03",
      title: "Design & Engineering",
      description: "Detailed engineering design with adherence to national and international standards for optimal project outcomes."
    },
    {
      number: "04",
      title: "Implementation Support",
      description: "Construction supervision, quality assurance, and technical guidance throughout the project lifecycle."
    },
    {
      number: "05",
      title: "Commissioning",
      description: "Pre-commissioning checks, testing, and handover support to ensure smooth project completion."
    }
  ]

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left - Image */}
          <div className="relative">
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="/construction.jpg"
                alt="Our Process"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent" />
              
              {/* Stats Overlay */}
              <div className="absolute bottom-6 left-6 right-6 grid grid-cols-2 gap-4">
                <div className="bg-white/95 backdrop-blur rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-yellow-500">15+</p>
                  <p className="text-slate-600 text-sm">Years Experience</p>
                </div>
                <div className="bg-white/95 backdrop-blur rounded-xl p-4 text-center">
                  <p className="text-3xl font-bold text-yellow-500">100%</p>
                  <p className="text-slate-600 text-sm">Client Satisfaction</p>
                </div>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-yellow-400 rounded-2xl -z-10" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-slate-900 rounded-2xl -z-10" />
          </div>

          {/* Right - Process Steps */}
          <div>
            <span className="text-yellow-500 font-semibold text-sm tracking-wider uppercase">
              Our Process
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 mb-6">
              How We Deliver Excellence
            </h2>
            <p className="text-slate-600 mb-10">
              Our systematic approach ensures every project receives meticulous attention 
              from concept to completion, delivering results that exceed expectations.
            </p>

            <div className="space-y-6">
              {steps.map((step, index) => (
                <div key={index} className="flex gap-4 group">
                  <div className="w-14 h-14 bg-slate-100 group-hover:bg-yellow-400 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors">
                    <span className="text-xl font-bold text-slate-900">{step.number}</span>
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 mb-1">{step.title}</h3>
                    <p className="text-slate-600 text-sm">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
