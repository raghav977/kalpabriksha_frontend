import { siteConfig } from "@/config/siteConfig"
import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

export function MessageFounder() {
  return (
    <section className="py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 border">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 border text-center">
          {/* Left - Title with Icon */}
          <div className="flex items-center gap-4 border">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black text-center">
            Message From Founder
            </h2>
            <Sparkles className="w-10 h-10 text-yellow-400" />
          </div>

          {/* Right - CTA Button */}
        </div>
      </div>
    </section>
  )
}
