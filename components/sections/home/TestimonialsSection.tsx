"use client"

import Image from "next/image"
import { Quote } from "lucide-react"
import { useActiveTestimonials } from "@/hooks/api/useTestimonial";
import { ErrorState, LoadingSpinner, PageHeader } from "@/components/admin";
import { useState } from "react";
import { Testimonial } from "@/lib/api";

export function TestimonialsSection() {

  const [page] = useState(1);
  const [limit] = useState(5);

  const { data, isLoading, error } = useActiveTestimonials(page, limit);

  // API returns { testimonials, pagination }
  const testimonials = data?.testimonials || [];

  if (isLoading) {
    return (
      <div>
        <PageHeader title="Loading Testimonials..." backButton />
        <LoadingSpinner />
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <PageHeader title="Failed to load Testimonials" backButton />
        <ErrorState message="Failed to load testimonials. Please try again later." />
      </div>
    )
  }

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">

          {/* Left */}
          <div>
            <span className="text-yellow-500 font-semibold uppercase tracking-wider text-sm mb-3 block">
              TESTIMONIALS
            </span>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              What Our Clients Say About Us
            </h2>

            <p className="text-slate-600 text-lg leading-relaxed">
              Our clients trust us to deliver excellence. Here's what they have to say.
            </p>
          </div>

          {/* Right */}
          <div className="space-y-6">
            {testimonials.length === 0 ? (
              <p className="text-slate-500">No testimonials available.</p>
            ) : (
              testimonials.map((testimonial: Testimonial) => (
                <div
                  key={testimonial.id} // ✅ FIXED
                  className="bg-slate-50 rounded-2xl p-6 relative"
                >
                  <Quote className="w-8 h-8 text-yellow-400 mb-4" />

                  <p className="text-slate-700 mb-6 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <img
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${testimonial.image || "/default-avatar.png"}`} // ✅ fallback
                        alt={testimonial.name}  
                        className="object-cover"
                      />
                    </div>

                    <div>
                      <p className="font-bold text-slate-900">
                        {testimonial.name}
                      </p>
                      <p className="text-slate-500 text-sm">
                        {testimonial.company || ''}
                      </p>
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>

        </div>
      </div>
    </section>
  )
}