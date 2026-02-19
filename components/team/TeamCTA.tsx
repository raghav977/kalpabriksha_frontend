'use client';

import Link from 'next/link';
import { ArrowRight, Users } from 'lucide-react';

export function TeamCTA() {
  return (
    <section className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-medium mb-6">
          <Users className="w-4 h-4" />
          Join Our Team
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
          Want to Be Part of Our
          <span className="text-yellow-400"> Growing Team?</span>
        </h2>

        <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-10">
          We're always looking for talented engineers, geologists, and consultants who share our 
          passion for sustainable development and engineering excellence.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/careers"
            className="inline-flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-slate-900 font-bold py-4 px-8 rounded-xl transition-all hover:shadow-lg hover:shadow-yellow-400/30"
          >
            View Open Positions
            <ArrowRight className="w-5 h-5" />
          </Link>
          <Link
            href="/contact?type=career"
            className="inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-xl transition-all border border-white/20"
          >
            Send Your CV
          </Link>
        </div>
      </div>
    </section>
  );
}
