"use client"
import { Eye, Target } from "lucide-react";
import { usePublicSiteConfig } from "@/hooks/api/useSiteConfig";
import { useMemo } from "react";

// Fallback content
const fallbackVision = "To become a leading engineering consultancy firm in South Asia known for technical excellence, sustainability, and research-driven innovation in the fields of hydropower, renewable energy, and infrastructure development.";

const fallbackMission = [
  "To deliver technically rigorous, innovative, and sustainable engineering solutions",
  "To contribute to Nepal's infrastructure and energy development with integrity",
  "To support capacity building and nurture engineering talent",
  "To integrate cutting-edge technology and research into every project",
  "To establish ourselves as a globally competitive consultancy"
];

export default function Coverview(){
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

    return(
        <section className="py-20 lg:py-28 bg-white">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                  <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
                    <div>
                      <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">Company Overview</h2>
                      <div className="prose prose-lg text-muted-foreground">
                        <p className="leading-relaxed mb-4">
                          Rooted in strong engineering ethics and driven by innovation, we specialize in the energy 
                          sector with a primary focus on hydropower and solar energy development.
                        </p>
                        <p className="leading-relaxed mb-4">
                          Established with the vision of positioning Nepal as a global hub for engineering excellence, 
                          Kalpabrikshya Engineering Solutions combines local expertise with international best practices.
                        </p>
                        <p className="leading-relaxed">
                          Our multidisciplinary team provides end-to-end consulting services—from feasibility studies 
                          and design to implementation support and technical review—ensuring reliability, efficiency, 
                          and regulatory compliance.
                        </p>
                      </div>
                    </div>
        
                    <div className="bg-slate-100 rounded-3xl p-8 lg:p-10">
                      <div className="space-y-8">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shrink-0">
                            <Eye className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-foreground text-lg mb-2">Our Vision</h3>
                            <p className="text-muted-foreground">{vision}</p>
                          </div>
                        </div>
        
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center shrink-0">
                            <Target className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-bold text-foreground text-lg mb-2">Our Mission</h3>
                            <ul className="text-muted-foreground space-y-2">
                              {mission.map((item, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 shrink-0" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
    )
}
