"use client"

import Image from "next/image"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote: "Kalpabrikshya Engineering Solutions provided exceptional consultancy services for our hydropower project. Their technical expertise and professional approach exceeded our expectations.",
    name: "Ramesh Sharma",
    title: "Project Director",
    company: "Khadam Hydropower Pvt. Ltd.",
    image: "/founder.jpg"
  },
  {
    quote: "Their commitment to quality and attention to detail made our collaboration seamless. We highly recommend their engineering services for any renewable energy project.",
    name: "Sita Gurung",
    title: "Managing Director",
    company: "Nepal Energy Development Co.",
    image: "/construction.jpg"
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left - Header */}
          <div>
            <span className="text-yellow-500 font-semibold uppercase tracking-wider text-sm mb-3 block">
              TESTIMONIALS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              What Our Clients Say About Us
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              Our clients trust us to deliver excellence. Here's what they have to say about 
              working with Kalpabrikshya Engineering Solutions.
            </p>
          </div>

          {/* Right - Testimonial Cards */}
          <div className="space-y-6">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index} 
                className="bg-slate-50 rounded-2xl p-6 relative"
              >
                {/* Quote Icon */}
                <Quote className="w-8 h-8 text-yellow-400 mb-4" />
                
                {/* Quote Text */}
                <p className="text-slate-700 mb-6 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                
                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.image}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{testimonial.name}</p>
                    <p className="text-slate-500 text-sm">{testimonial.title}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
