"use client"
import { usePublicSiteConfig } from "@/hooks/api/useSiteConfig";
import { useMemo } from "react";
import founder from "@/public/founder.jpg"
import Image from "next/image";

// Fallback founder info
const fallbackFounder = {
  name: "Manoj Bhattarai",
  title: "Founder & Managing Director",
  message: `At Kalpabrikshya Engineering Solutions, our journey began with a clear purpose: to contribute meaningfully to Nepal's infrastructure and energy development while building a consultancy capable of competing at the international level.

Nepal holds immense potential in hydropower and renewable energy. Our responsibility as engineers is not only to harness this potential but to do so with technical excellence, environmental responsibility, and long-term vision.

Our commitment is to deliver world-class consultancy services that balance technical rigor with environmental sustainability. As we grow, we remain dedicated to nurturing engineering talent, fostering innovation, and contributing to Nepal's broader development goals.`
};

export default function MdMessage(){
    const { data: configData = [] } = usePublicSiteConfig();
    
    const founderInfo = useMemo(() => {
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
        message: configMap['founder_message'] || fallbackFounder.message
      };
    }, [configData]);

    return(
        <section className="relative py-16 lg:py-24 bg-slate-50 overflow-hidden">
        {/* Top Wave */}
        <div className="absolute top-0 left-0 w-full leading-none rotate-180">
          <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-16 lg:h-24">
            <path
              d="M0,64L60,69.3C120,75,240,85,360,80C480,75,600,53,720,48C840,43,960,53,1080,64C1200,75,1320,85,1380,90.7L1440,96V120H0Z"
              className="fill-white"
            />
          </svg>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <span className="inline-block px-4 py-1.5 bg-primary/10 text-primary text-sm font-semibold rounded-full mb-4">
                Leadership
              </span>
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Message from the Managing Director
              </h2>
            </div>

<div className="bg-white rounded-3xl p-8 lg:p-12 shadow-lg">
  <div className="flex flex-col md:flex-row gap-8 items-start">
    
    {/* Founder Image */}
    <div className="w-32 h-32 relative rounded-2xl overflow-hidden shrink-0 bg-slate-200">
      <Image
        src={founder}
        alt={founderInfo.name}
        fill
        className="object-cover"
        sizes="128px"
        priority
      />
    </div>

    <div>
      <h3 className="text-xl font-bold text-foreground mb-1">
        {founderInfo.name}
      </h3>
      <p className="text-primary font-medium mb-6">
        {founderInfo.title}
      </p>

      <div className="text-muted-foreground space-y-4 leading-relaxed">
        {founderInfo.message.split("\n\n").map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </div>

  </div>
</div>
          </div>
        </div>
      </section>
    )
}
