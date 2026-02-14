"use client"
import Image from "next/image"

interface LoadingSkeletonProps {
  type?: "page" | "section" | "card" | "text" | "custom"
  count?: number
  className?: string
}

export function LoadingSkeleton({ type = "section", count = 1, className }: LoadingSkeletonProps) {
  // Custom skeleton with just className
  if (type === "custom" || (className && !type)) {
    return <div className={`animate-pulse bg-slate-200 ${className || ''}`} />
  }

  if (type === "page") {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
        <div className="relative w-24 h-24 mb-6 animate-pulse">
          <Image
            src="/logo.jpg"
            alt="KES Logo"
            fill
            className="object-contain"
            priority
          />
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <div className="w-3 h-3 bg-yellow-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
        <p className="mt-4 text-slate-600 font-medium">Loading...</p>
      </div>
    )
  }

  if (type === "card") {
    return (
      <div className="space-y-4">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="bg-white rounded-2xl p-6 border border-slate-200 animate-pulse">
            <div className="flex items-start gap-4">
              <div className="w-14 h-14 bg-slate-200 rounded-xl" />
              <div className="flex-1 space-y-3">
                <div className="h-5 bg-slate-200 rounded w-1/3" />
                <div className="h-4 bg-slate-200 rounded w-2/3" />
                <div className="h-4 bg-slate-200 rounded w-1/2" />
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (type === "text") {
    return (
      <div className="space-y-3 animate-pulse">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="h-4 bg-slate-200 rounded" style={{ width: `${Math.random() * 40 + 60}%` }} />
        ))}
      </div>
    )
  }

  // Default section skeleton
  return (
    <div className="py-20 bg-slate-50 animate-pulse">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <div className="h-4 bg-slate-200 rounded w-32 mx-auto mb-4" />
          <div className="h-8 bg-slate-200 rounded w-64 mx-auto mb-4" />
          <div className="h-4 bg-slate-200 rounded w-96 mx-auto" />
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 h-48" />
          ))}
        </div>
      </div>
    </div>
  )
}

// Page loading wrapper with logo
export function PageLoader() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
      <div className="relative">
        {/* Logo with pulse animation */}
        <div className="relative w-32 h-32 mb-8">
          <Image
            src="/logo.jpg"
            alt="Kalpabrikshya Engineering Solutions"
            fill
            className="object-contain"
            priority
          />
          {/* Animated ring around logo */}
          <div className="absolute inset-0 border-4 border-yellow-400 rounded-full animate-ping opacity-20" />
        </div>
        
        {/* Company name */}
        <h2 className="text-xl font-bold text-slate-900 text-center mb-2">
          Kalpabrikshya Engineering
        </h2>
        <p className="text-slate-500 text-center text-sm mb-6">
          Engineering Solutions
        </p>
        
        {/* Loading bar */}
        <div className="w-48 h-1 bg-slate-200 rounded-full overflow-hidden">
          <div className="h-full bg-gradient-to-r from-primary to-yellow-400 rounded-full animate-loading-bar" />
        </div>
      </div>
    </div>
  )
}
