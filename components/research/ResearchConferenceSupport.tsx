"use client"
import { Award, FileCheck, Plane, Handshake } from "lucide-react"
import Link from "next/link"

const conferenceSupport = [
  {
    icon: Award,
    text: "Conference registration sponsorship"
  },
  {
    icon: FileCheck,
    text: "Technical paper review and refinement"
  },
  {
    icon: Plane,
    text: "Partial or full travel & accommodation support (case-specific)"
  },
  {
    icon: Handshake,
    text: "Branding and acknowledgment partnership"
  }
]

export function ResearchConferenceSupport() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="bg-slate-900 rounded-3xl p-10 md:p-14 overflow-hidden relative">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-400/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400/5 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <div>
                <span className="text-yellow-400 font-semibold uppercase tracking-wider text-sm">
                  Global Visibility
                </span>
                <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-6">
                  Conference Support
                </h2>
                <p className="text-slate-400 leading-relaxed mb-6">
                  We actively support dissemination of research outcomes through national and 
                  international conferences. Our Research–Conference Integration Model ensures 
                  supported research achieves global visibility, technical recognition, and 
                  practical consultancy impact.
                </p>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
                >
                  Learn More
                </Link>
              </div>

              {/* Right - Support Items */}
              <div className="space-y-4">
                {conferenceSupport.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-4 bg-slate-800/50 backdrop-blur-sm p-5 rounded-xl border border-slate-700"
                  >
                    <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-6 h-6 text-slate-900" />
                    </div>
                    <span className="text-white font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
