"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type Props = {
  onFinish: () => void;
};

export default function IntroScreen({ onFinish }: Props) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Sequence timings (ms)
    const logoDuration = 800; // logo anim in
    const taglineDelay = 500; // after logo
    const taglineDuration = 600;
    const hold = 1500; // hold before exit

    const total = logoDuration + taglineDelay + taglineDuration + hold;

    const exitTimer = setTimeout(() => setExiting(true), total);

    const finishTimer = setTimeout(() => {
      try {
        // sessionStorage.setItem("introSeen", "true");
      } catch (e) {
        // ignore
      }
      onFinish();
    }, total + 700); // match fade-out duration (700ms)

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(finishTimer);
    };
  }, [onFinish]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: exiting ? 0 : 1 }}
      transition={{ duration: 0.7 }}
      className="fixed inset-0 z-50 flex items-center justify-center transition-opacity duration-700"
      style={{
        background:
          "linear-gradient(180deg, rgba(6,6,7,1) 0%, rgba(15,15,15,1) 50%, rgba(10,10,12,1) 100%)",
      }}
      
      
    >
      {/* subtle blurred gradient background */}
      <video
        autoPlay
        muted
        loop
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/kalpabriksh.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 overflow-hidden">
        {/* <div
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full filter blur-3xl opacity-80"
          style={{
            background:
              "radial-gradient(circle at 20% 20%, rgba(250,204,21,0.12), rgba(236,72,153,0.04), transparent 40%)",
          }}
        /> */}
        <div
          className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full filter blur-2xl opacity-60"
          style={{
            background:
              "radial-gradient(circle at 80% 80%, rgba(99,102,241,0.06), rgba(125,211,252,0.03), transparent 40%)",
          }}
        />
      </div>

      <div className="relative flex flex-col items-center gap-6 px-6">
        {/* glow behind logo */}
        <div
          className="absolute -z-10 w-56 h-56 rounded-full filter blur-3xl"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, rgba(250,204,21,0.18), rgba(236,72,153,0.06), transparent 50%)",
          }}
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative flex items-center justify-center"
        >
          {/* Inline compact SVG logo (small, fast) */}
          <div className="w-36 h-36 rounded-full bg-white/5 flex items-center justify-center">
            <svg
              width="72"
              height="72"
              viewBox="0 0 72 72"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <defs>
                <linearGradient id="g1" x1="0" x2="1">
                  <stop offset="0%" stopColor="#FACC15" />
                  <stop offset="100%" stopColor="#F472B6" />
                </linearGradient>
              </defs>
              <rect width="72" height="72" rx="18" fill="#0F172A" />
              <path d="M18 48c6-8 12-12 18-12s12 4 18 12" stroke="url(#g1)" strokeWidth="4" strokeLinecap="round" />
              <circle cx="36" cy="24" r="8" fill="url(#g1)" />
            </svg>
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center text-slate-300 text-lg max-w-xl"
        >
          Cultivating sustainable growth through Earth-first engineering.
        </motion.p>
      </div>
    </motion.div>
  );
}
