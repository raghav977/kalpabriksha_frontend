"use client"
import { Lightbulb } from "lucide-react"

export function ResearchPhilosophy() {
  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            <span className="text-yellow-600 font-semibold uppercase tracking-wider text-sm">
              Our Philosophy
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 mb-6">
              Research Philosophy
            </h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              At Kalpabrikshya Engineering Solutions, research is directly integrated into practical engineering.
              Strong scientific foundations lead to safer infrastructure, optimized energy systems, and sustainable
              development.
            </p>
            <p className="text-slate-600 leading-relaxed">
              Our approach bridges academic research with real-world hydropower, renewable energy,
              geology, and infrastructure projects — ensuring every innovation serves a practical purpose.
            </p>
          </div>

          {/* Right - Icon Card */}
          <div className="bg-white p-10 rounded-2xl shadow-lg border border-slate-100">
            <div className="w-16 h-16 bg-yellow-400 rounded-xl flex items-center justify-center mb-6">
              <Lightbulb className="w-8 h-8 text-slate-900" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Innovation Meets Practice
            </h3>
            <ul className="space-y-3 text-slate-600">
              <li className="flex items-start gap-3">
                <span className="text-yellow-500 font-bold mt-1">✓</span>
                Scientific foundations for safer infrastructure
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-500 font-bold mt-1">✓</span>
                Optimized energy systems through research
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-500 font-bold mt-1">✓</span>
                Sustainable development practices
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-500 font-bold mt-1">✓</span>
                Real-world application of academic findings
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
