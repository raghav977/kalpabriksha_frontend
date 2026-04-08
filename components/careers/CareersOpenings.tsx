"use client"

import { useState } from "react"
import { MapPin, Clock, Briefcase, DollarSign, CheckCircle } from "lucide-react"
import Link from "next/link"
import { usePublicCareers } from "@/hooks/api/useCareers"
import { Pagination } from "@/components/admin"

interface CareerData {
  id: number
  positionId: number
  salaryRange?: string
  closingDate?: string
  isRemote?: boolean
  employmentType?: string
  location?: string
  createdAt?: string
  Position?: {
    title: string
  }
}

export default function CareersOpenings() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(6)

  const { data: careersData, isLoading } = usePublicCareers({ page, limit })

  const careers = careersData?.careers || []
  const pagination = careersData?.pagination || { total: 0, page: 1, limit, pages: 1 }

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return "TBD"
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
  }

  return (
    <section className="relative py-20 bg-linear-to-b from-white to-slate-50 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-100/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
            We're Hiring
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            Join Our Engineering Team
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Be part of a talented team driving innovation in sustainable energy and infrastructure projects across Nepal.
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="grid lg:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-slate-200 p-8 animate-pulse">
                <div className="h-8 bg-slate-200 rounded w-3/4 mb-4" />
                <div className="space-y-3">
                  <div className="h-4 bg-slate-200 rounded w-full" />
                  <div className="h-4 bg-slate-200 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : careers.length === 0 ? (
          <div className="text-center py-16">
            <Briefcase className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-xl text-slate-600 font-medium mb-2">No openings available</p>
            <p className="text-slate-500">Check back soon for new career opportunities.</p>
          </div>
        ) : (
          <>
            {/* Job Listings Grid */}
            <div className="grid lg:grid-cols-2 gap-6 mb-12">
              {careers.map((career: CareerData) => {
                const positionTitle = career.Position?.title || `Position ${career.positionId}`

                return (
                  <div
                    key={career.id}
                    className="group bg-white rounded-2xl border border-slate-200 hover:border-yellow-400 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
                  >
                    {/* Header with Department Badge */}
                    <div className="p-6 pb-4 border-b border-slate-100">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex-1">
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-yellow-600 transition-colors line-clamp-2">
                            {positionTitle}
                          </h3>
                        </div>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-semibold rounded-full whitespace-nowrap">
                          Engineering
                        </span>
                      </div>
                    </div>

                    {/* Job Details */}
                    <div className="p-6 flex-1 flex flex-col">
                      {/* Meta Information */}
                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <MapPin className="w-4 h-4 text-yellow-500 shrink-0" />
                          <span className="truncate">{career.location || "On-site"}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Briefcase className="w-4 h-4 text-yellow-500 shrink-0" />
                          <span className="capitalize">{career.employmentType || "Full-time"}</span>
                        </div>

                        {career.salaryRange && (
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <DollarSign className="w-4 h-4 text-yellow-500 shrink-0" />
                            <span>{career.salaryRange}</span>
                          </div>
                        )}

                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Clock className="w-4 h-4 text-yellow-500 shrink-0" />
                          <span>Close: {formatDate(career.closingDate)}</span>
                        </div>
                      </div>

                      {/* Remote Badge */}
                      {career.isRemote && (
                        <div className="mb-4">
                          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-50 text-green-700 text-xs font-semibold rounded-lg border border-green-200">
                            <CheckCircle className="w-3 h-3" />
                            Remote Available
                          </span>
                        </div>
                      )}

                      {/* CTA */}
                      <div className="mt-auto flex items-center justify-between pt-4 border-t border-slate-100">
                        <Link
                          href={`/careers?position=${encodeURIComponent(career.Position?.title || "")}`}
                          className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-linear-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-600 text-slate-900 font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg"
                        >
                          Apply Now
                          <span className="text-lg">→</span>
                        </Link>
                        <Link
                          href={`/careers/${career.Position?.title}-${career.id}`}
                          className="inline-flex items-center px-4 py-3 border bg-linear-to-r from-slate-100 to-slate-200 hover:from-slate-200 hover:to-slate-300 text-slate-700 font-medium rounded-lg transition-all duration-300"
                        >
                          View
                          <span className="text-lg">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex justify-center">
                <Pagination
                  page={pagination.page}
                  pages={pagination.pages}
                  total={pagination.total}
                  limit={pagination.limit}
                  onPageChange={setPage}
                  onLimitChange={(l) => {
                    setLimit(l)
                    setPage(1)
                  }}
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

