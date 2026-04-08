"use client"

import { useState } from "react"
import { Calendar, MapPin, FileText } from "lucide-react"
import Link from "next/link"
import { usePublicEvents } from "@/hooks/api/useEvents"
import { Pagination } from "@/components/admin"

export default function EventsList() {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(6)

  const { data: eventsData, isLoading } = usePublicEvents({ page, limit })

  const events = eventsData?.events || []
  const pagination = eventsData?.pagination || { total: 0, page: 1, limit, pages: 1 }

  const formatDate = (dateStr?: string | Date) => {
    if (!dateStr) return "TBD"
    const date = new Date(dateStr)
    return date.toLocaleDateString("en-US", { 
      month: "short", 
      day: "numeric", 
      year: "numeric" 
    })
  }

  return (
    <section className="relative py-20 bg-linear-to-b from-white to-slate-50 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gray-100/30 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100/20 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1 bg-white-100 text-yellow-700 rounded-full text-sm font-semibold uppercase tracking-wider mb-4">
            Events & Updates
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-4 leading-tight">
            Our Latest Events
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Stay updated with our upcoming events, conferences, and workshops.
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
        ) : events.length === 0 ? (
          <div className="text-center py-16">
            <Calendar className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-xl text-slate-600 font-medium mb-2">No events available</p>
            <p className="text-slate-500">Check back soon for upcoming events.</p>
          </div>
        ) : (
          <>
            {/* Events Grid */}
            <div className="grid lg:grid-cols-2 gap-6 mb-12">
              {events.map((event: any) => (
                <Link
                  key={event.id}
                  href={`/events/${event.id}`}
                  className="group bg-white rounded-2xl border border-slate-200 hover:border-gray-400 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden flex flex-col"
                >
                  {/* Event Image */}
                  {event.images && event.images.length > 0 && (
                    <div className="relative w-full h-48 bg-slate-200 overflow-hidden">
                      <img
                        src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${event.images[0].url}`}
                        alt={event.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 flex flex-col flex-1">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-gray-600 transition-colors mb-3 line-clamp-2">
                      {event.title}
                    </h3>

                    {/* Description */}
                    <p className="text-slate-600 text-sm mb-4 line-clamp-3 flex-1">
                      {event.description}
                    </p>

                    {/* Info Grid */}
                    <div className="space-y-2 mb-5 pb-5 border-b border-slate-100">
                      {/* Date */}
                      <div className="flex items-center gap-3 text-slate-600">
                        <Calendar className="w-4 h-4 text-yellow-600 shrink-0" />
                        <span className="text-sm font-medium">{formatDate(event.date)}</span>
                      </div>

                      {/* Location */}
                      <div className="flex items-center gap-3 text-slate-600">
                        <MapPin className="w-4 h-4 text-yellow-600 shrink-0" />
                        <span className="text-sm font-medium">{event.location}</span>
                      </div>

                      {/* Files Count */}
                      {event.files && event.files.length > 0 && (
                        <div className="flex items-center gap-3 text-slate-600">
                          <FileText className="w-4 h-4 text-yellow-600 shrink-0" />
                          <span className="text-sm font-medium">
                            {event.files.length} file{event.files.length !== 1 ? 's' : ''}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Files Preview */}
                    {event.files && event.files.length > 0 && (
                      <div className="mb-5">
                        <p className="text-xs font-semibold text-slate-500 mb-2 uppercase tracking-wider">Documents</p>
                        <div className="space-y-2">
                          {event.files.slice(0, 2).map((file: any, idx: number) => (
                            <a
                              key={idx}
                              href={`${process.env.NEXT_PUBLIC_IMAGE_URL}${file.url}`}
                              download
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-700 truncate"
                            >
                              <FileText className="w-3 h-3 shrink-0" />
                              <span className="truncate">{file.filename}</span>
                            </a>
                          ))}
                          {event.files.length > 2 && (
                            <p className="text-xs text-slate-500">+{event.files.length - 2} more</p>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {pagination.pages > 1 && (
              <div className="flex justify-center mt-12">
                <Pagination
                  page={pagination.page}
                  pages={pagination.pages}
                  total={pagination.total}
                  limit={pagination.limit}
                  onPageChange={setPage}
                  onLimitChange={setLimit}
                />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
