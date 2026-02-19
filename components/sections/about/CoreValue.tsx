"use client"
import { Award, Shield, Leaf, Lightbulb, Globe } from "lucide-react"
import { usePublicSiteConfig } from "@/hooks/api/useSiteConfig"
import { useMemo } from "react"

const valueIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  Award,
  Shield,
  Leaf,
  Lightbulb,
  Globe,
}

// Fallback core values
const fallbackCoreValues = [
  { title: "Technical Excellence", icon: "Award" },
  { title: "Integrity & Ethics", icon: "Shield" },
  { title: "Sustainability", icon: "Leaf" },
  { title: "Innovation", icon: "Lightbulb" },
  { title: "Global Outlook", icon: "Globe" }
];

export default function CoreValue(){
    const { data: configData = [] } = usePublicSiteConfig();
    
    const coreValues = useMemo(() => {
      if (!configData || configData.length === 0) {
        return fallbackCoreValues;
      }
      
      const configMap: Record<string, string> = {};
      configData.forEach((item) => {
        configMap[item.key] = item.value;
      });
      
      if (configMap['company_core_values']) {
        try {
          return JSON.parse(configMap['company_core_values']) as typeof fallbackCoreValues;
        } catch {
          return fallbackCoreValues;
        }
      }
      
      return fallbackCoreValues;
    }, [configData]);

    return(
        <section className="py-20 lg:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
              What Drives Us
            </span>
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">Our Core Values</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {coreValues.map((value) => {
              const Icon = valueIcons[value.icon] || Award
              return (
                <div key={value.title} className="text-center p-6 bg-slate-50 rounded-2xl hover:bg-primary group transition-colors duration-300">
                  <div className="w-14 h-14 bg-primary/10 group-hover:bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors">
                    <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="font-semibold text-foreground group-hover:text-white text-sm transition-colors">
                    {value.title}
                  </h3>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    )
}
