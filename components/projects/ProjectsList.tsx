"use client"
import { MapPin, Users, Zap, CheckCircle, Clock, ArrowUpRight } from "lucide-react"
import { siteConfig } from "@/config/siteConfig"
import Image from "next/image"

export function ProjectsList() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-yellow-500 font-semibold text-sm tracking-wider uppercase">
            Featured Projects
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 mb-4">
            Ongoing Hydropower Projects
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We are currently providing lead technical consultancy for multiple small 
            hydropower projects in Nepal, demonstrating our commitment to renewable energy development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {siteConfig.projects.map((project, index) => (
            <div 
              key={index}
              className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden group hover:shadow-xl transition-shadow"
            >
              {/* Project Image */}
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                
                {/* Status Badge */}
                <div className="absolute top-4 left-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-400 text-slate-900 text-xs font-bold rounded-full">
                    <Clock className="w-3 h-3" />
                    {project.status}
                  </span>
                </div>

                {/* Capacity Badge */}
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/90 text-slate-900 text-xs font-bold rounded-full">
                    <Zap className="w-3 h-3 text-yellow-500" />
                    {project.capacity}
                  </span>
                </div>

                {/* Project Name Overlay */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white leading-tight">
                    {project.name}
                  </h3>
                </div>
              </div>

              {/* Project Details */}
              <div className="p-6">
                {/* Client & Role */}
                <div className="flex flex-wrap gap-4 mb-6 pb-6 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-slate-600">{project.client}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm text-slate-600">{project.role}</span>
                  </div>
                </div>

                {/* Scope */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">
                    Project Scope
                  </h4>
                  <ul className="space-y-2">
                    {project.scope.map((item, sIndex) => (
                      <li key={sIndex} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600 text-sm">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
