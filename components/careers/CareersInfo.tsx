"use client"

import { MapPin, Clock, Briefcase, DollarSign, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"

interface CareerInfoProps {
  career: {
    id: number
    Position?: { title: string }
    location?: string
    employmentType?: string
    salaryRange?: string
    closingDate?: string
    isRemote?: boolean
    description?: string
    responsibilities?: string[]
    requirements?: string[]
  }
}

export default function CareersInfo({ career }: CareerInfoProps) {
  const positionTitle = career.Position?.title || 'Career Opportunity'

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'TBD'
    const date = new Date(dateStr)
    return date.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
  }

  return (
    <div className="space-y-12">
      {/* Quick Info */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <MapPin className="w-4 h-4 text-yellow-500 shrink-0" />
            <span className="text-xs text-slate-600 uppercase font-semibold">Location</span>
          </div>
          <p className="text-lg font-bold text-slate-900">{career.location || 'On-site'}</p>
        </div>

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <Briefcase className="w-4 h-4 text-yellow-500 shrink-0" />
            <span className="text-xs text-slate-600 uppercase font-semibold">Type</span>
          </div>
          <p className="text-lg font-bold text-slate-900 capitalize">{career.employmentType || 'Full-time'}</p>
        </div>

        {career.salaryRange && (
          <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
            <div className="flex items-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-yellow-500 shrink-0" />
              <span className="text-xs text-slate-600 uppercase font-semibold">Salary</span>
            </div>
            <p className="text-lg font-bold text-slate-900">{career.salaryRange}</p>
          </div>
        )}

        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200">
          <div className="flex items-center gap-2 mb-2">
            <Clock className="w-4 h-4 text-yellow-500 shrink-0" />
            <span className="text-xs text-slate-600 uppercase font-semibold">Deadline</span>
          </div>
          <p className="text-lg font-bold text-slate-900">{formatDate(career.closingDate)}</p>
        </div>
      </div>

      {/* Remote Badge */}
      {career.isRemote && (
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-50 text-green-700 rounded-lg border border-green-200 font-medium">
          <CheckCircle className="w-4 h-4" />
          Remote Available
        </div>
      )}

      {/* Description */}
      {career.description && (
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-4">About This Role</h3>
          <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">{career.description}</p>
        </div>
      )}

      {/* Responsibilities */}
      {career.responsibilities && career.responsibilities.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Key Responsibilities</h3>
          <ul className="space-y-3">
            {career.responsibilities.map((responsibility: string, idx: number) => (
              <li key={idx} className="flex items-start gap-3 text-slate-600">
                <span className="shrink-0 w-6 h-6 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center text-sm font-semibold">
                  {idx + 1}
                </span>
                <span>{responsibility}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Requirements */}
      {career.requirements && career.requirements.length > 0 && (
        <div>
          <h3 className="text-2xl font-bold text-slate-900 mb-6">Requirements</h3>
          <ul className="space-y-3">
            {career.requirements.map((requirement: string, idx: number) => (
              <li key={idx} className="flex items-start gap-3 text-slate-600">
                <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                <span>{requirement}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* CTA */}
      <div className="pt-8 border-t">
        <Link
          href={`/contact?type=career&position=${encodeURIComponent(positionTitle)}`}
          className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-slate-900 font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl"
        >
          Apply Now
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  )
}