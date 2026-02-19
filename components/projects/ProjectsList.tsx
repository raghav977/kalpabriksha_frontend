"use client"
import { MapPin, Users, Zap, CheckCircle, Clock, ArrowUpRight } from "lucide-react"
import { useProjects } from "@/hooks/api"
import { Project } from "@/lib/api"
import Image from "next/image"
import Link from "next/link"

export function ProjectsList() {
  const { data: projectsData, isLoading } = useProjects()
  
  // Extract projects array from response
  const projects = projectsData?.projects || []
  console.log("Thfis is projects",projects)

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-yellow-500 font-semibold text-sm tracking-wider uppercase">
            Featured Projects
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 mb-4">
            Our Engineering Projects
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            We provide lead technical consultancy for multiple hydropower and renewable 
            energy projects in Nepal, demonstrating our commitment to sustainable development.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden animate-pulse">
                <div className="h-56 bg-slate-200" />
                <div className="p-6">
                  <div className="flex gap-4 mb-6 pb-6 border-b border-slate-100">
                    <div className="h-4 w-32 bg-slate-200 rounded" />
                    <div className="h-4 w-24 bg-slate-200 rounded" />
                  </div>
                  <div className="space-y-2">
                    <div className="h-4 w-full bg-slate-200 rounded" />
                    <div className="h-4 w-3/4 bg-slate-200 rounded" />
                    <div className="h-4 w-2/3 bg-slate-200 rounded" />
                  </div>
                </div>
              </div>
            ))
          ) : (
            projects.map((project: Project) => (
              <Link 
                key={project.id}
                href={`/projects/${project.slug}`}
                className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden group hover:shadow-xl transition-shadow block"
              >
                {/* Project Image */}
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${project.featuredImage}`}
                    alt={project.name}
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/40 to-transparent" />
                  
                  {/* Status Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-yellow-400 text-slate-900 text-xs font-bold rounded-full capitalize">
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
                      <span className="text-sm text-slate-600">{project.location || project.role}</span>
                    </div>
                  </div>

                  {/* Description */}
                  {project.description && (
                    <p className="text-slate-600 text-sm line-clamp-3">
                      {project.description}
                    </p>
                  )}

                  {/* Scope */}
                  {project.scope && project.scope.length > 0 && (
                    <div className="mt-4">
                      <h4 className="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wide">
                        Project Scope
                      </h4>
                      <ul className="space-y-2">
                        {project.scope.slice(0, 3).map((item, sIndex) => (
                          <li key={sIndex} className="flex items-start gap-2">
                            <CheckCircle className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-600 text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
