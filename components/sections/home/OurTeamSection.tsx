"use client"
import Image from "next/image"
import { ArrowRight, Linkedin, Mail, User } from "lucide-react"
import { useTeamMembers } from "@/hooks/api"
import Link from "next/link"

export function OurTeamSection() {
  const { data: teamMembers, isLoading } = useTeamMembers({ active: true })

  // Show first 3 team members
  const displayMembers = teamMembers?.slice(0, 3) || []

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-yellow-500 font-semibold text-sm tracking-wider uppercase">
            Meet Our Experts
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 mb-4">
            Our Team
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            A dedicated team of engineers and consultants committed to delivering 
            excellence in every project we undertake.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="bg-slate-50 rounded-2xl p-8 border border-slate-200 text-center animate-pulse">
                <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-slate-200" />
                <div className="h-6 w-32 bg-slate-200 rounded mx-auto mb-2" />
                <div className="h-4 w-24 bg-slate-200 rounded mx-auto mb-4" />
                <div className="flex justify-center gap-3">
                  <div className="w-10 h-10 bg-slate-200 rounded-full" />
                  <div className="w-10 h-10 bg-slate-200 rounded-full" />
                </div>
              </div>
            ))
          ) : (
            displayMembers.map((member, index) => (
              <div 
                key={member.id || index}
                className="bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:border-yellow-400 transition-all duration-300 hover:shadow-lg group text-center"
              >
                {/* Image */}
                <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-slate-200">
                  {member.image ? (
                    <img
                      src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${member.image}`}
                      alt={member.name}
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-slate-900">
                      <User className="w-12 h-12 text-slate-400" />
                    </div>
                  )}
                  {/* Overlay on hover */}
                  <div className="absolute inset-0 bg-yellow-400/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Info */}
                <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                <p className="text-yellow-600 font-medium mb-4">{member.position}</p>

                {/* Contact */}
                <div className="flex items-center justify-center gap-3">
                  <a 
                    href={`mailto:${member.email}`}
                    className="w-10 h-10 bg-slate-900 hover:bg-yellow-400 rounded-full flex items-center justify-center transition-colors group/icon"
                    title={`Email ${member.name}`}
                  >
                    <Mail className="w-4 h-4 text-white group-hover/icon:text-slate-900 transition-colors" />
                  </a>
                  {member.linkedin && (
                    <a 
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-slate-900 hover:bg-yellow-400 rounded-full flex items-center justify-center transition-colors group/icon"
                      title={`${member.name} on LinkedIn`}
                    >
                      <Linkedin className="w-4 h-4 text-white group-hover/icon:text-slate-900 transition-colors" />
                    </a>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
        
        <div className="flex justify-center mt-8">
          <Link 
            href="/about" 
            className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold px-8 py-4 rounded-lg transition-colors"
          >
            View All Team Members
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
