"use client"
import Image from "next/image"

export function ClosingStatement() {
  return (
    <section className="relative w-full h-[50vh] min-h-[350px] overflow-hidden">
      {/* Background Image */}
      <Image
        src="/construction.jpg" // replace with your image path
        alt="Closing Statement Background"
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-slate-900/70" />

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-center items-center h-full px-6 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-yellow-400">
          Closing Position
        </p>

        <h2 className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
          We Engineer <span className="text-yellow-400">Credibility.</span>
        </h2>

        <p className="mt-6 text-lg md:text-xl text-gray-300 max-w-3xl leading-relaxed">
          We do not merely prepare projects. We engineer credibility. We structure compliance. 
          We build bankable infrastructure foundations.
        </p>

        <p className="mt-8 text-sm uppercase tracking-[0.4em] text-yellow-300">
          Kalpabrikshya Engineering Solutions Pvt. Ltd.
        </p>

        <p className="mt-3 text-base md:text-lg text-gray-400">
          Engineering Infrastructure with Institutional Discipline.
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