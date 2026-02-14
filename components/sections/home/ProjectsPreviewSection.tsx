import { siteConfig } from "@/config/siteConfig"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"

import upperkhadam from "@/public/mainphotoupperkhadam.jpeg"

export function ProjectsPreviewSection() {
  const featuredProjects = siteConfig.projects.slice(0, 3)

  return (
    <section className="relative py-20 lg:py-28 bg-slate-900 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/construction.jpg"
          alt="Projects Background"
          fill
          className="object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-slate-900/90" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12">
          <div>
            <span className="text-yellow-400 font-semibold uppercase tracking-wider text-sm mb-3 block">
              OUR PORTFOLIO
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Latest Projects
            </h2>
          </div>
          <Link href="/projects">
            <Button className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold">
              View All Projects
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>

        {/* Projects Grid - Image Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredProjects.map((project) => (
            <div
              key={project.name}
              className="group relative rounded-2xl overflow-hidden h-80"
            >
              {/* Background Image */}
              <Image
                src={project.image}
                alt={project.name}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
              
              {/* Content */}
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                {/* Status Badge */}
                <span className="absolute top-4 left-4 px-3 py-1 bg-yellow-400 text-slate-900 text-xs font-semibold rounded-full">
                  {project.status}
                </span>
                
                {/* Capacity Badge */}
                <span className="absolute top-4 right-4 px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-sm font-bold rounded-full">
                  {project.capacity}
                </span>

                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                  {project.name}
                </h3>
                <p className="text-white/70 text-sm mb-3">
                  {project.client}
                </p>
                <div className="flex items-center text-yellow-400 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                  View Details
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
