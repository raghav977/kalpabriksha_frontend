"use client"
import { FileText, Send } from "lucide-react"
import Link from "next/link"

const proposalStructure = [
  "Cover Page",
  "Executive Summary",
  "Background & Problem Statement",
  "Research Objectives",
  "Scope & Limitations",
  "Methodology",
  "Innovation & Original Contribution",
  "Expected Outcomes & Deliverables",
  "Practical & Industry Relevance",
  "Work Plan & Timeline",
  "Budget & Cost Justification",
  "Risk Assessment & Mitigation",
  "Research Team & Capacity",
  "Ethical, Environmental & ESG Considerations",
  "References & Standards",
]

export function ResearchProposal() {
  return (
    <section className="py-20 px-6 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left Content */}
          <div>
            <span className="text-yellow-600 font-semibold uppercase tracking-wider text-sm">
              Submit Your Research
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mt-3 mb-6">
              Proposal Submission Structure
            </h2>
            <p className="text-slate-600 leading-relaxed mb-8">
              We welcome research proposals that align with our focus areas. Follow our structured 
              format to ensure your proposal receives proper evaluation.
            </p>

            <Link
              href="/contact?type=partner"
              className="inline-flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold px-8 py-4 rounded-lg transition-all duration-300 hover:-translate-y-0.5 shadow-lg"
            >
              <Send className="w-5 h-5" />
              Partner With Us
            </Link>
          </div>

          {/* Right - Structure List */}
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center">
                <FileText className="w-6 h-6 text-slate-900" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Required Sections</h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {proposalStructure.map((item, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 text-slate-700"
                >
                  <span className="w-6 h-6 bg-slate-100 rounded-full flex items-center justify-center text-xs font-bold text-slate-600">
                    {index + 1}
                  </span>
                  <span className="text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
