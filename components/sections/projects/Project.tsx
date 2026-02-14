"use client";
import React from "react";

const ProjectsPage: React.FC = () => {
  return (
    <div className="bg-slate-50 py-16 px-6">
      <div className="max-w-5xl mx-auto space-y-12">

        <h1 className="text-4xl font-bold text-center text-slate-900">
          Projects & Experience
        </h1>

        <div className="space-y-8">

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-semibold">
              Upper Khadam Khola SHP – 990 kW
            </h2>
            <p className="text-slate-500 text-sm">
              Client: Abiral Hydropower Company Limited
            </p>
            <ul className="list-disc list-inside mt-3 text-slate-700">
              <li>Hydrological & hydraulic design</li>
              <li>Power evacuation support</li>
              <li>Pre-commissioning documentation</li>
            </ul>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <h2 className="text-xl font-semibold">
              Lower Khadam Khola SHP – 935 kW
            </h2>
            <p className="text-slate-500 text-sm">
              Feasibility review & regulatory documentation
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default ProjectsPage;
