"use client"
import { Mountain, Map, Droplets, Zap, Building, Route, HardHat, Leaf } from "lucide-react"
import { usePublicSiteConfig } from "@/hooks/api/useSiteConfig"
import { useMemo } from "react"

const iconMap: Record<string, React.ElementType> = {
  Mountain,
  Map,
  Droplets,
  Zap,
  Building,
  Route,
  HardHat,
  Leaf
}

// Fallback additional services
const fallbackServices = [
  { title: "Geological Mapping & Surveys", icon: "Mountain" },
  { title: "GIS & Remote Sensing", icon: "Map" },
  { title: "Hydrology & Water Resources", icon: "Droplets" },
  { title: "Transmission Line Design", icon: "Zap" },
  { title: "Structural Engineering", icon: "Building" },
  { title: "Road & Access Design", icon: "Route" },
  { title: "Construction Supervision", icon: "HardHat" },
  { title: "Environmental Assessment", icon: "Leaf" }
];

export function AdditionalServicesSection() {
  const { data: configData = [] } = usePublicSiteConfig();
  
  const additionalServices = useMemo(() => {
    if (!configData || configData.length === 0) {
      return fallbackServices;
    }
    
    const configMap: Record<string, string> = {};
    configData.forEach((item) => {
      configMap[item.key] = item.value;
    });
    
    if (configMap['additional_services']) {
      try {
        return JSON.parse(configMap['additional_services']) as typeof fallbackServices;
      } catch {
        return fallbackServices;
      }
    }
    
    return fallbackServices;
  }, [configData]);

  return (
    <section className="py-20 bg-slate-900">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-yellow-400 font-semibold text-sm tracking-wider uppercase">
            Comprehensive Support
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-3 mb-4">
            Additional Engineering & Technical Services
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Beyond our core consultancy services, we provide a full range of 
            technical support for infrastructure and energy projects.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {additionalServices.map((service, index) => {
            const IconComponent = iconMap[service.icon] || Mountain
            return (
              <div 
                key={index}
                className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-yellow-400 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-14 h-14 bg-yellow-400/10 group-hover:bg-yellow-400 rounded-xl flex items-center justify-center mb-4 transition-colors">
                  <IconComponent className="w-7 h-7 text-yellow-400 group-hover:text-slate-900 transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-white">{service.title}</h3>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
