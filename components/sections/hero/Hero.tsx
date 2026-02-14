"use client"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { siteConfig } from "@/config/siteConfig"
import image1 from "@/public/construction.jpg"
import image2 from "@/public/founder.jpg"
import { Phone, ArrowRight, Globe, Lightbulb, Users } from "lucide-react"

export default function Hero() {
  const slides = [
    {
      badge: "ENGINEERING EXCELLENCE",
      title: "Leading with Excellence,",
      highlight: "Rising with Vision",
      subtitle:
        "Kalpabrikshya Engineering Solutions - Nepal's trusted partner for sustainable energy development and engineering consultancy.",
      img: image2,
      icon: null,
    },
    {
      badge: "GLOBAL VISION",
      title: "Nepal to the World,",
      highlight: "Engineering Beyond Borders",
      subtitle:
        "International expansion, global partnerships, and engineering excellence. Building bridges across Asia, Africa, and emerging markets.",
      img: image1,
      icon: Globe,
    },
    {
      badge: "RESEARCH & INNOVATION",
      title: "Innovation-Driven",
      highlight: "Consultancy Solutions",
      subtitle:
        "Research funding, cutting-edge technology integration, and conference participation. Advancing engineering through continuous innovation.",
      img: image2,
      icon: Lightbulb,
    },
    {
      badge: "GLOBAL ENGINEERING COMMUNITY",
      title: "Engaging with Global",
      highlight: "Engineering Excellence",
      subtitle:
        "Global collaboration, international standards compliance, and interdisciplinary expertise. Connecting engineers worldwide.",
      img: image1,
      icon: Users,
    },
  ]

  const [current, setCurrent] = useState(0)

  // Auto-slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 6000)
    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <section className="relative w-full h-screen min-h-[600px] overflow-hidden">
      
      {/* Slides */}
      <div
        className="flex h-full transition-transform duration-1000 ease-out"
        style={{ transform: `translateX(-${current * 100}%)` }}
      >
        {slides.map((slide, index) => (
          <div key={index} className="relative w-full h-full flex-shrink-0">
            
            {/* Background */}
            <Image
              src={slide.img}
              alt={slide.title}
              fill
              priority={index === 0}
              sizes="100vw"
              className="object-cover"
            />

            {/* Overlays */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Content */}
            <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-12 lg:px-20 max-w-7xl mx-auto">
              
              <div className="max-w-3xl">
                {/* Badge */}
                <div className="inline-block px-4 py-2 bg-yellow-400 text-slate-900 text-sm font-bold rounded mb-6">
                  {slide.badge}
                </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                  {slide.title}
                  <span className="block text-white mt-2">
                    {slide.highlight}
                  </span>
                </h1>

                <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed max-w-2xl">
                  {slide.subtitle}
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link 
                    href="/contact?type=partner"
                    className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
                  >
                    Partner With Us
                    <ArrowRight className="w-5 h-5" />
                  </Link>

                  <Link
                    href="/contact?type=consult"
                    className="inline-flex items-center justify-center gap-3 bg-slate-900/50 hover:bg-slate-900/70 border-2 border-white/20 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 backdrop-blur-sm"
                  >
                    <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Phone className="w-5 h-5 text-slate-900" />
                    </div>
                    <div className="text-left">
                      <span className="block text-xs text-gray-400">Need Consultation?</span>
                      <span className="block text-white font-bold">Consult With Us</span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Wave/Shape */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 50L60 45.7C120 41.3 240 32.7 360 37.2C480 41.7 600 59.3 720 64.8C840 70.3 960 63.7 1080 54.2C1200 44.7 1320 32.3 1380 26.2L1440 20V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V50Z" fill="white"/>
        </svg>
      </div>

      {/* Indicators */}
      <div className="absolute bottom-24 left-6 md:left-20 flex gap-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`h-2 rounded-full transition-all duration-300 ${
              current === index ? "bg-yellow-400 w-10" : "bg-white/40 w-2 hover:bg-white/60"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
