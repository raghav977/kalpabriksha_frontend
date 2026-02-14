"use client"
import { Target, Eye, Flag } from "lucide-react"
import { siteConfig } from "@/config/siteConfig"

export function VisionMission() {
  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Vision */}
          <div className="bg-white rounded-2xl p-10 shadow-lg border border-slate-100">
            <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mb-6">
              <Eye className="w-8 h-8 text-slate-900" />
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Vision</h2>
            <p className="text-slate-600 text-lg leading-relaxed">
              {siteConfig.vision}
            </p>
          </div>

          {/* Mission */}
          <div className="bg-slate-900 rounded-2xl p-10 shadow-lg">
            <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-slate-900" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <ul className="space-y-4">
              {siteConfig.mission.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Flag className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                  <span className="text-slate-300">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
