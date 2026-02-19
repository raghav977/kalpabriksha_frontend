"use client"
import { Target, Eye, Flag } from "lucide-react"
import { usePublicSiteConfig } from "@/hooks/api/useSiteConfig"
import { useMemo } from "react"

// Fallback content
const fallbackVision = "To become a leading engineering consultancy firm in South Asia known for technical excellence, sustainability, and research-driven innovation in the fields of hydropower, renewable energy, and infrastructure development.";

const fallbackMission = [
  "To deliver technically rigorous, innovative, and sustainable engineering solutions",
  "To contribute to Nepal's infrastructure and energy development with integrity",
  "To support capacity building and nurture engineering talent",
  "To integrate cutting-edge technology and research into every project",
  "To establish ourselves as a globally competitive consultancy"
];

export function VisionMission() {
  const { data: configData = [] } = usePublicSiteConfig();
  
  const { vision, mission } = useMemo(() => {
    if (!configData || configData.length === 0) {
      return { vision: fallbackVision, mission: fallbackMission };
    }
    
    const configMap: Record<string, string> = {};
    configData.forEach((item) => {
      configMap[item.key] = item.value;
    });
    
    let parsedMission = fallbackMission;
    if (configMap['company_mission']) {
      try {
        parsedMission = JSON.parse(configMap['company_mission']);
      } catch {
        parsedMission = fallbackMission;
      }
    }
    
    return {
      vision: configMap['company_vision'] || fallbackVision,
      mission: parsedMission
    };
  }, [configData]);

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
              {vision}
            </p>
          </div>

          {/* Mission */}
          <div className="bg-slate-900 rounded-2xl p-10 shadow-lg">
            <div className="w-16 h-16 bg-yellow-400 rounded-2xl flex items-center justify-center mb-6">
              <Target className="w-8 h-8 text-slate-900" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-6">Our Mission</h2>
            <ul className="space-y-4">
              {mission.map((item, index) => (
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
