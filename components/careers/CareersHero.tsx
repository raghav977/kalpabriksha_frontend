"use client"

import Image from "next/image"
import Link from "next/link"

export default function CareersHero() {
  return (
    <section className="relative min-h-[60vh] flex items-center">
      {/* Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/construction.jpg"
          alt="Join Our Team"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-900/80 to-slate-900/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <span className="inline-block px-4 py-2 bg-yellow-500 text-slate-900 text-sm font-semibold rounded-full mb-6">
            JOIN OUR TEAM
          </span>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Build Your Career
            <span className="block text-yellow-500">With Us</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed">
            Join a team committed to engineering excellence, innovation, and sustainable 
            infrastructure development. Shape the future of renewable energy in Nepal.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="#openings">
              <button className="bg-yellow-500 hover:bg-yellow-400 text-slate-900 font-semibold px-8 py-4 rounded-lg transition-all duration-300 shadow-lg hover:shadow-yellow-500/25">
                View Open Positions
              </button>
            </Link>
            <Link href="#culture">
              <button className="border-2 border-white/30 hover:border-yellow-500 text-white hover:text-yellow-500 font-semibold px-8 py-4 rounded-lg transition-all duration-300">
                Our Culture
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
