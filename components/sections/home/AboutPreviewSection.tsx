import { siteConfig } from "@/config/siteConfig"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import founder from "@/public/founder.jpg"
import Image from "next/image"
import { CheckCircle } from "lucide-react"

export function AboutPreviewSection() {
  const features = [
    { title: "Professional Expert & Professional Approach", desc: "Our team brings decades of combined experience in engineering consultancy with proven track record." },
    { title: "High Quality Work & Satisfaction Guarantee", desc: "We ensure every project meets international standards with complete client satisfaction." },
  ]

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="mb-12">
          <span className="text-yellow-500 font-semibold uppercase tracking-wider text-sm mb-3 block">
            What our founder say
          </span>
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 leading-tight">
              Message From the Founder
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Kalpabrikshya Engineering Solutions is committed to delivering technically sound, 
              sustainable, and future-ready solutions in hydropower and renewable energy sector.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Content */}
          <div>
            {/* Features with checkmarks */}
            <div className="space-y-6 mb-8">
              {/* {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shrink-0 mt-1">
                    <CheckCircle className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg mb-1">{feature.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </div>
              ))} */}
              <p className="text-justify leading-relaxed">At Kalpabrikshya Engineering Solutions, our journey began with a clear purpose: to contribute
meaningfully to Nepal’s infrastructure and energy development while building a consultancy
capable of competing at the international level.
Nepal holds immense potential in hydropower and renewable energy. Our responsibility as
engineers is not only to harness this potential but to do so with technical excellence,
environmental responsibility, and long-term vision. We believe that quality engineering, backed
by research and innovation, is the foundation for sustainable development.
With our head office in Kathmandu, our long-term goal is to expand globally by establishing
international branches and collaborative partnerships. Through continuous learning, selective
research funding, and adherence to global standards, we aim to elevate Nepali engineering
consultancy onto the world stage.
I warmly invite clients, partners, and young researchers to join us in this journey of growth,
innovation, and excellence.</p>
            </div>

            <Link href="/about">
              <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold">
                Discover More
                <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Button>
            </Link>
          </div>

          {/* Right - Image with floating card */}
          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden">
              <Image 
                src={founder} 
                width={600} 
                height={400} 
                alt="Our Team" 
                className="w-full h-auto object-cover"
              />
            </div>
            
            {/* Floating experience card */}
            <div className="absolute -bottom-6 -left-6 bg-yellow-400 rounded-2xl p-6 shadow-xl">
              <p className="text-slate-900 font-bold text-4xl mb-1">5+</p>
              <p className="text-slate-800 text-sm font-medium">Years of<br/>Experience</p>
            </div>

            {/* Quote box */}
            <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-4 max-w-[200px] border-l-4 border-yellow-400">
              <p className="text-slate-600 text-xs italic leading-relaxed">
                "Quality Engineering, backed by research and innovation, is the foundation for sustainable development."
              </p>
              <p className="text-slate-900 font-semibold text-xs mt-2">— Manoj Bhattarai, MD</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
