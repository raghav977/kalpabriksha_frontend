"use client"
import Image from "next/image"
import { Globe } from "lucide-react"

export function VisionHero() {
  return (
    <section className="relative w-full h-[50vh] min-h-[350px] overflow-hidden">
      {/* Background */}
      <Image
        src="/construction.jpg"
        alt="Global Vision"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Overlays */}
      <div className="absolute inset-0 bg-slate-900/70" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full px-6 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-yellow-400 text-slate-900 text-sm font-bold rounded mb-6">
          <Globe className="w-4 h-4" />
          GLOBAL EXPANSION
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
          Global
          <span className="text-yellow-400"> Vision</span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed">
          From Nepal to the World — Building international partnerships and 
          representing Nepali engineering excellence on the global stage.
        </p>
      </div>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 50L60 45.7C120 41.3 240 32.7 360 37.2C480 41.7 600 59.3 720 64.8C840 70.3 960 63.7 1080 54.2C1200 44.7 1320 32.3 1380 26.2L1440 20V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V50Z" fill="#f8fafc"/>
        </svg>
      </div>
    </section>
  )
}
