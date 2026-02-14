"use client";

import Image from "next/image";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white z-50 flex items-center justify-center">
      <div className="relative flex items-center justify-center">

        {/* Rotating Technical Ring */}
        <div className="absolute w-40 h-40 border border-slate-200 rounded-full animate-spin-slow" />
        <div className="absolute w-48 h-48 border-t-2 border-blue-700 rounded-full animate-spin-reverse opacity-70" />

        {/* Logo */}
        <div className="relative w-28 h-28 animate-float">
          <Image
            src="/logo.jpg"
            alt="Kalpabrikshya Engineering Solutions"
            fill
            className="object-contain drop-shadow-xl"
            priority
          />
        </div>
      </div>

      <style jsx>{`
        /* Slow rotation */
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        /* Reverse rotation */
        @keyframes spinReverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }

        /* Floating + breathing */
        @keyframes float {
          0% { transform: translateY(0px) scale(1); opacity: 0.85; }
          50% { transform: translateY(-6px) scale(1.05); opacity: 1; }
          100% { transform: translateY(0px) scale(1); opacity: 0.85; }
        }

        .animate-spin-slow {
          animation: spinSlow 12s linear infinite;
        }

        .animate-spin-reverse {
          animation: spinReverse 18s linear infinite;
        }

        .animate-float {
          animation: float 3.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
