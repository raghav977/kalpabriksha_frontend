import { Button } from "@/components/ui/Button"
import Link from "next/link"
import { ArrowRight, Sparkles, Handshake, MessageCircle } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-16 lg:py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left - Title with Icon */}
          <div className="flex items-center gap-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Let&apos;s Connect
            </h2>
            <Sparkles className="w-10 h-10 text-yellow-400" />
          </div>

          {/* Right - CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/contact?type=partner">
              <Button 
                size="lg" 
                className="bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-semibold px-8 py-6 text-lg"
              >
                <Handshake className="w-5 h-5 mr-2" />
                Partner With Us
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/contact?type=consult">
              <Button 
                size="lg" 
                variant="outline"
                className="border-white/30 text-black hover:bg-white/10 hover:text-white font-semibold px-8 py-6 text-lg"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Consult With Us
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
