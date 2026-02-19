'use client';

import { Users } from 'lucide-react';

export function TeamHero() {
  return (
    <section className="relative bg-slate-900 py-20 lg:py-28 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Users className="w-4 h-4" />
          Our Expert Team
        </div>
        
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
          Meet the Team Behind
          <span className="block text-yellow-400 mt-2">Engineering Excellence</span>
        </h1>
        
        <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
          Our multidisciplinary team of engineers, geologists, and consultants bring decades of 
          combined experience in hydropower, renewable energy, and infrastructure development.
        </p>
      </div>

      {/* Wave Decoration */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 50L60 45.7C120 41.3 240 32.7 360 37.2C480 41.7 600 59.3 720 64.8C840 70.3 960 63.7 1080 54.2C1200 44.7 1320 32.3 1380 26.2L1440 20V100H1380C1320 100 1200 100 1080 100C960 100 840 100 720 100C600 100 480 100 360 100C240 100 120 100 60 100H0V50Z" fill="#f8fafc"/>
        </svg>
      </div>
    </section>
  );
}
