"use client"
import Image from "next/image"
import { siteConfig } from "@/config/siteConfig"

export function VisionFounderMessage() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Image */}
          <div className="lg:col-span-2">
            <div className="relative">
              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src="/founder.jpg"
                  alt={siteConfig.founder.name}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-yellow-400 rounded-2xl -z-10" />
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-slate-900 rounded-2xl -z-10" />
            </div>
          </div>

          {/* Message */}
          <div className="lg:col-span-3">
            <span className="text-yellow-500 font-semibold text-sm tracking-wider uppercase">
              From Our Founder
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 mb-6">
              A Message About Our Vision
            </h2>
            
            <div className="prose prose-lg text-slate-600">
              {siteConfig.founder.message.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-slate-200">
              <p className="text-xl font-bold text-slate-900">{siteConfig.founder.name}</p>
              <p className="text-yellow-600">{siteConfig.founder.title}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
