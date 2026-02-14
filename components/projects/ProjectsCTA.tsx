"use client"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function ProjectsCTA() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <span className="text-yellow-500 font-semibold text-sm tracking-wider uppercase">
          Partner With Us
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-4 mb-6">
          Have a Project in Mind?
        </h2>
        <p className="text-slate-600 text-lg mb-10 max-w-2xl mx-auto">
          Whether you&apos;re planning a new hydropower development or need expert 
          consultancy for an ongoing project, we&apos;re here to help you succeed.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/contact?type=consult"
            className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold py-4 px-8 rounded-xl transition-all hover:shadow-lg hover:shadow-yellow-400/30"
          >
            Consult With Us <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            href="/services"
            className="inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-900 font-semibold py-4 px-8 rounded-xl transition-all"
          >
            View Our Services
          </Link>
        </div>
      </div>
    </section>
  )
}
