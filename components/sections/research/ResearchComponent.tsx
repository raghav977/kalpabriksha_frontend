"use client";
import React, { useState } from "react";

type FocusArea = {
  title: string;
  content: string[];
};

type FocusAreas = {
  hydropower: FocusArea;
  hydrology: FocusArea;
  geology: FocusArea;
  climate: FocusArea;
  innovation: FocusArea;
};

export const ResearchComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState<keyof FocusAreas>("hydropower");

  const focusAreas: FocusAreas = {
    hydropower: {
      title: "Hydropower & Energy",
      content: [
        "Hydropower system optimization and efficiency enhancement",
        "Small and medium hydropower development challenges",
        "Power evacuation and grid interconnection studies",
        "Hybrid renewable energy systems (hydro–solar integration)",
      ],
    },
    hydrology: {
      title: "Hydrology & Water Resources",
      content: [
        "Advanced hydrological and flood modeling",
        "Climate change impact on river basins",
        "Sediment transport and river morphology",
        "Design flood estimation and extreme event analysis",
      ],
    },
    geology: {
      title: "Geology & Geotechnical",
      content: [
        "Engineering geological mapping",
        "Rock mass characterization (RMR, Q-system, GSI)",
        "Slope stability and landslide risk assessment",
        "Tunnel and foundation geotechnics",
      ],
    },
    climate: {
      title: "Climate-Resilient Infrastructure",
      content: [
        "Climate-resilient hydraulic structures",
        "Nature-based slope and river stabilization",
        "Sustainable construction practices",
      ],
    },
    innovation: {
      title: "Applied Engineering Innovation",
      content: [
        "Integration of geological and hydrological data",
        "GIS, remote sensing & numerical modeling",
        "Development of engineering tools and best practices",
      ],
    },
  };

  return (
    <div className="bg-slate-50 text-slate-800 py-16 px-6">
      <div className="max-w-6xl mx-auto space-y-20">

        {/* 1. Research Philosophy */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Research Philosophy</h2>
          <p className="leading-relaxed text-slate-600">
            At Kalpabrikshya Engineering Solutions, research is directly integrated into practical engineering.
            Strong scientific foundations lead to safer infrastructure, optimized energy systems, and sustainable
            development. Our approach bridges academic research with real-world hydropower, renewable energy,
            geology, and infrastructure projects.
          </p>
        </section>

        {/* 2. Research Support Program */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Research Support Program</h2>
          <p className="mb-4 text-slate-600">
            We selectively support research aligned with our core technical domains through:
          </p>
          <ul className="grid md:grid-cols-2 gap-4 text-slate-700">
            <li className="bg-slate-100 p-4 rounded-lg"><strong>Financial Sponsorship:</strong> Full or partial research funding</li>
            <li className="bg-slate-100 p-4 rounded-lg"><strong>Technical Mentorship:</strong> Expert review and engineering guidance</li>
            <li className="bg-slate-100 p-4 rounded-lg"><strong>Data Access:</strong> Project data and site exposure (confidentiality applies)</li>
            <li className="bg-slate-100 p-4 rounded-lg"><strong>Conference Support:</strong> Paper refinement and sponsorship assistance</li>
          </ul>
        </section>

        {/* 3. Research Focus Areas */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Research Focus Areas</h2>

          <div className="flex flex-wrap gap-3 mb-6">
            {(Object.keys(focusAreas) as (keyof FocusAreas)[]).map((key) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`px-4 py-2 rounded-full border text-sm font-medium transition
                  ${activeTab === key
                    ? "bg-yellow-700 text-white border-black-700 shadow"
                    : "bg-white text-yellow-700 border-black-300 hover:bg-yellow-50"
                  }`}
              >
                {focusAreas[key].title}
              </button>
            ))}
          </div>

          <ul className="space-y-3 text-slate-700">
            {focusAreas[activeTab].content.map((item: string, index: number) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-blue-700 font-bold">•</span>
                {item}
              </li>
            ))}
          </ul>
        </section>

        {/* 4. Proposal Submission Structure */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Proposal Submission Structure</h2>
          <ol className="grid md:grid-cols-2 gap-x-12 gap-y-3 text-slate-700 list-decimal list-inside">
            <li>Cover Page</li>
            <li>Executive Summary</li>
            <li>Background & Problem Statement</li>
            <li>Research Objectives</li>
            <li>Scope & Limitations</li>
            <li>Methodology</li>
            <li>Innovation & Original Contribution</li>
            <li>Expected Outcomes & Deliverables</li>
            <li>Practical & Industry Relevance</li>
            <li>Work Plan & Timeline</li>
            <li>Budget & Cost Justification</li>
            <li>Risk Assessment & Mitigation</li>
            <li>Research Team & Capacity</li>
            <li>Ethical, Environmental & ESG Considerations</li>
            <li>References & Standards</li>
          </ol>

          <button className="mt-8 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg shadow transition">
            Submit Proposal
          </button>
        </section>

        {/* 5. Conference Support */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Conference Support</h2>
          <p className="text-slate-600 mb-4">
            We actively support dissemination of research outcomes through national and international conferences.
          </p>
          <ul className="space-y-3 text-slate-700">
            <li>✔ Conference registration sponsorship</li>
            <li>✔ Technical paper review and refinement</li>
            <li>✔ Partial or full travel & accommodation support (case-specific)</li>
            <li>✔ Branding and acknowledgment partnership</li>
          </ul>
          <p className="mt-4 text-slate-600">
            Our Research–Conference Integration Model ensures supported research achieves global visibility,
            technical recognition, and practical consultancy impact.
          </p>
        </section>

      </div>
    </div>
  );
};

export default ResearchComponent;
