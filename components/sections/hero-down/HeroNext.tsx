"use client"

import Image from "next/image"
import React from "react"
import founder from "@/public/founder.jpg"

export const HeroNext: React.FC = () => {
  return (
    <section className="relative w-full bg-white py-16 md:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">

          {/* LEFT SIDE - Text Content */}
          <div className="space-y-6 max-w-xl">
            {/* Tagline */}
            <p className="text-primary font-semibold text-sm uppercase tracking-wide">
              Kalpabrikshya Engineering Solutions
            </p>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold leading-tight text-foreground">
              We assist clients achieve their project objectives.
            </h1>

            {/* Description */}
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              Delivering Reliable, High-Quality Project, Program, and Construction 
              Management Services. Delivering Reliable, High-Quality Project, Program, 
              and Construction Management Services
            </p>
          </div>

          {/* RIGHT SIDE - Image Composition */}
          <div className="relative flex justify-center md:justify-end">
            {/* Main composite image container */}
            <div className="relative w-full max-w-lg">
              
              {/* Background building image (top right) */}
              <div className="absolute top-0 right-0 w-48 md:w-56 lg:w-64 h-48 md:h-56 lg:h-64 rounded-lg overflow-hidden shadow-lg z-10">
                <Image
                  src="/globe.svg" 
                  alt="Modern building"
                  fill
                  className="object-cover"
                />
                {/* Placeholder gradient for building - replace with actual image */}
                <div className="absolute inset-0 bg-gradient-to-br from-sky-400 to-sky-600"></div>
              </div>

              {/* Main foreground image with people */}
              <div className="relative mt-16 md:mt-20 ml-0 md:ml-4 w-full aspect-[4/3] rounded-lg overflow-hidden shadow-2xl z-20">
                <Image
                  src={founder}
                  alt="Engineering team - Kalpabrikshya Engineering Solutions"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-primary/10 rounded-full blur-2xl z-0"></div>
              <div className="absolute top-12 -right-4 w-16 h-16 bg-secondary/20 rounded-full blur-xl z-0"></div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
