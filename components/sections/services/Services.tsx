"use client";
import React from "react";

const Services: React.FC = () => {
  return (
    <div className="bg-slate-50 py-16 px-6">
      <div className="max-w-6xl mx-auto space-y-16">

        <h1 className="text-4xl font-bold text-slate-900 text-center">
          Our Services
        </h1>

        <div className="grid md:grid-cols-2 gap-10">

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">
              Hydropower Engineering
            </h2>
            <ul className="space-y-2 list-disc list-inside text-slate-700">
              <li>Project identification & screening</li>
              <li>Pre-feasibility & feasibility studies</li>
              <li>Hydrological & hydraulic design</li>
              <li>Construction supervision & commissioning support</li>
            </ul>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-xl font-semibold text-blue-700 mb-4">
              Solar Energy Systems
            </h2>
            <ul className="space-y-2 list-disc list-inside text-slate-700">
              <li>Solar resource assessment</li>
              <li>Grid-connected & off-grid PV systems</li>
              <li>Hybrid renewable integration</li>
              <li>Technical due diligence</li>
            </ul>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Services;
