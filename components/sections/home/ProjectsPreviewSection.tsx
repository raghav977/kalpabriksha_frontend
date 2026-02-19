"use client"

import { Button } from "@/components/ui/Button"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { useFeaturedProjects } from "@/hooks/api"

export function ProjectsPreviewSection() {
  const { data: featuredProjects = [], isLoading } = useFeaturedProjects(3)

  return (
    <section className="relative py-20 lg:py-28 bg-slate-900 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <Image
          src="/mainphotoupperkhadam.jpeg"
          alt="Projects Background"
          fill
          className="object-cover opacity-20"
          priority
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
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="relative rounded-2xl overflow-hidden h-80 bg-slate-800 animate-pulse">
                <div className="absolute top-4 left-4 w-20 h-6 bg-slate-700 rounded-full" />
                <div className="absolute top-4 right-4 w-16 h-6 bg-slate-700 rounded-full" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="h-6 w-48 bg-slate-700 rounded mb-2" />
                  <div className="h-4 w-32 bg-slate-700 rounded" />
                </div>
              </div>
            ))
          ) : (
            featuredProjects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.slug}`}
                className="group relative rounded-2xl overflow-hidden h-80 block"
              >
                {/* Background Image */}
                <img
                  src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${project.featuredImage}`}
                  alt={project.name}
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                
                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  {/* Status Badge */}
                  <span className="absolute top-4 left-4 px-3 py-1 bg-yellow-400 text-slate-900 text-xs font-semibold rounded-full capitalize">
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
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
