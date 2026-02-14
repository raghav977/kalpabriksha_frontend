"use client"
import Link from "next/link"
import { ArrowRight, Handshake } from "lucide-react"

export function VisionCTA() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="w-20 h-20 bg-yellow-400 rounded-full flex items-center justify-center mx-auto mb-8">
          <Handshake className="w-10 h-10 text-slate-900" />
        </div>
        
        <span className="text-yellow-500 font-semibold text-sm tracking-wider uppercase">
          Join Our Journey
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4 mb-6">
          Partner With Us Globally
        </h2>
        <p className="text-slate-600 text-lg mb-10 max-w-2xl mx-auto">
          We welcome collaborations with international firms, researchers, and investors 
          who share our vision for sustainable energy development worldwide.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/contact?type=partner"
            className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold py-4 px-8 rounded-xl transition-all hover:shadow-lg hover:shadow-yellow-400/30"
          >
            Partner With Us <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            href="/research"
            className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold py-4 px-8 rounded-xl transition-all"
          >
            Explore Research Collaboration
          </Link>
        </div>
      </div>
    </section>
  )
}
