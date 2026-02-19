"use client"
import Image from "next/image"
import { usePublicSiteConfig } from "@/hooks/api/useSiteConfig"
import { useMemo } from "react"

// Fallback founder info
const fallbackFounder = {
  name: "Manoj Bhattarai",
  title: "Founder & Managing Director",
  image: "/founder.jpg",
  message: `At Kalpabrikshya Engineering Solutions, our journey began with a clear purpose: to contribute meaningfully to Nepal's infrastructure and energy development while building a consultancy capable of competing at the international level.

Nepal holds immense potential in hydropower and renewable energy. Our responsibility as engineers is not only to harness this potential but to do so with technical excellence, environmental responsibility, and long-term vision. We believe that quality engineering, backed by research and innovation, is the foundation for sustainable development.

Our commitment is to deliver world-class consultancy services that balance technical rigor with environmental sustainability. As we grow, we remain dedicated to nurturing engineering talent, fostering innovation, and contributing to Nepal's broader development goals.

We invite partners, collaborators, and clients who share our vision to join us on this journey.`
};

export function VisionFounderMessage() {
  const { data: configData = [] } = usePublicSiteConfig();
  
  const founder = useMemo(() => {
    if (!configData || configData.length === 0) {
      return fallbackFounder;
    }
    
    const configMap: Record<string, string> = {};
    configData.forEach((item) => {
      configMap[item.key] = item.value;
    });
    
    return {
      name: configMap['founder_name'] || fallbackFounder.name,
      title: configMap['founder_title'] || fallbackFounder.title,
      image: configMap['founder_image'] || fallbackFounder.image,
      message: configMap['founder_message'] || fallbackFounder.message
    };
  }, [configData]);

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          {/* Image */}
          <div className="lg:col-span-2">
            <div className="relative">
              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Decorative Elements */}
              <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-yellow-400 rounded-2xl -z-10" />
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-slate-900 rounded-2xl -z-10" />
            </div>
          </div>

          {/* Message */}
          <div className="lg:col-span-3">
            <span className="text-yellow-500 font-semibold text-sm tracking-wider uppercase">
              From Our Founder
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 mb-6">
              A Message About Our Vision
            </h2>
            
            <div className="prose prose-lg text-slate-600">
              {founder.message.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-4 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="mt-8 pt-8 border-t border-slate-200">
              <p className="text-xl font-bold text-slate-900">{founder.name}</p>
              <p className="text-yellow-600">{founder.title}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
