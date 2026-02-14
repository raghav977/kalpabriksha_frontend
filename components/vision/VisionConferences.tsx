"use client"
import { Calendar, MapPin, Award, Users, Mic, BookOpen } from "lucide-react"

export function VisionConferences() {
  const conferenceActivities = [
    {
      icon: Mic,
      title: "Conference Participation",
      description: "Active participation in international engineering and renewable energy conferences to share knowledge and showcase expertise."
    },
    {
      icon: Award,
      title: "Sponsorship Programs",
      description: "Sponsoring technical conferences and events to support the growth of the engineering community and promote sustainable development."
    },
    {
      icon: BookOpen,
      title: "Research Presentations",
      description: "Presenting research findings and case studies at international forums to contribute to global engineering knowledge."
    },
    {
      icon: Users,
      title: "Networking Events",
      description: "Organizing and participating in networking events to build connections with global engineering professionals and organizations."
    }
  ]

  const upcomingFocus = [
    "International Hydropower Association (IHA) events",
    "Asian Development Bank energy summits",
    "Regional renewable energy conferences in South Asia",
    "African energy and infrastructure forums",
    "ASEAN engineering collaboration events"
  ]

  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-yellow-400 font-semibold text-sm tracking-wider uppercase">
            Knowledge Sharing
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
            Conferences & Events
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Engaging with the global engineering community through conferences, 
            research presentations, and industry events.
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {conferenceActivities.map((item, index) => (
            <div 
              key={index}
              className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-yellow-400 transition-all duration-300 text-center group"
            >
              <div className="w-14 h-14 bg-yellow-400/10 group-hover:bg-yellow-400 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors">
                <item.icon className="w-7 h-7 text-yellow-400 group-hover:text-slate-900 transition-colors" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
              <p className="text-slate-400 text-sm">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Focus Areas */}
        <div className="bg-slate-800/30 rounded-2xl p-8 border border-slate-700">
          <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
            <Calendar className="w-6 h-6 text-yellow-400" />
            Target Conference Areas
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {upcomingFocus.map((item, index) => (
              <div 
                key={index}
                className="flex items-center gap-3 bg-slate-800/50 rounded-xl px-4 py-3"
              >
                <MapPin className="w-4 h-4 text-yellow-400 shrink-0" />
                <span className="text-slate-300 text-sm">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
