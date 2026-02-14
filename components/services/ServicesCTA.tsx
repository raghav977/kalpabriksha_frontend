"use client"
import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"
import { siteConfig } from "@/config/siteConfig"

export function ServicesCTA() {
  return (
    <section className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <span className="text-yellow-400 font-semibold text-sm tracking-wider uppercase">
          Ready to Start?
        </span>
        <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 mb-6">
          Let&apos;s Build Something Great Together
        </h2>
        <p className="text-slate-400 text-lg mb-10 max-w-2xl mx-auto">
          Whether you&apos;re planning a hydropower project, solar installation, or need 
          expert geological assessment, our team is ready to help you succeed.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link 
            href="/contact?type=consult"
            className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold py-4 px-8 rounded-xl transition-all hover:shadow-lg hover:shadow-yellow-400/30"
          >
            Consult With Us <ArrowRight className="w-5 h-5" />
          </Link>
          <Link 
            href="/contact?type=partner"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-xl transition-all border border-white/20"
          >
            Partner With Us <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </div>
    </section>
  )
}
