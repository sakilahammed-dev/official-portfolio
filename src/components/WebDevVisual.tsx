"use client";

import { motion } from "framer-motion";

export default function WebDevVisual() {
  return (
    <div className="relative w-full h-full min-h-[260px] sm:min-h-[320px] flex items-center justify-end overflow-hidden pointer-events-none select-none pr-2 sm:pr-8">
      {/* 1. ATMOSPHERIC AMBIENT GLOW */}
      <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-sky-950/25 blur-[90px] pointer-events-none" />

      {/* 2. LAYERED EDITORIAL WEBSITE SHOWCASE (FIGMA & AWWWARDS STUDIO STYLE) */}
      <div className="relative w-full max-w-[490px] h-[250px] flex items-center justify-end">
        
        {/* Floating Design Token Card (Bottom Left Layer) */}
        <motion.div
          animate={{ y: [0, -3, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-0 bottom-2 z-20 w-[140px] rounded-xl bg-[#071322]/95 border border-sky-400/30 p-2.5 shadow-2xl backdrop-blur-xl space-y-2"
        >
          <div className="font-mono text-[8px] uppercase tracking-wider text-sky-300 font-semibold border-b border-white/10 pb-1">
            Design Tokens
          </div>
          {/* Color Swatches */}
          <div className="flex items-center gap-1.5">
            <div className="w-5 h-5 rounded-md bg-[#0F172A] border border-white/20" />
            <div className="w-5 h-5 rounded-md bg-[#38BDF8] border border-white/20" />
            <div className="w-5 h-5 rounded-md bg-[#F8FAFC] border border-white/20" />
          </div>
          {/* Typography Token */}
          <div className="font-mono text-[7px] text-neutral-300 leading-tight">
            Font: Inter Display 700<br />
            Grid: 12-Col / 24px Gutter
          </div>
        </motion.div>

        {/* Main Desktop Browser Canvas (Center Layer) */}
        <motion.div
          animate={{ y: [0, 2, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 w-[350px] sm:w-[390px] h-[220px] rounded-2xl bg-[#0A1628]/90 border border-sky-400/25 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-xl overflow-hidden flex flex-col justify-between"
        >
          {/* Browser Window Header */}
          <div className="px-3 py-2 bg-white/[0.04] border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/20" />
            </div>
            {/* Address Bar */}
            <div className="w-48 h-4 rounded-md bg-black/40 border border-white/10 flex items-center px-2">
              <span className="font-mono text-[8px] text-neutral-400 truncate">
                https://platform.architecture.dev
              </span>
            </div>
            <span className="font-mono text-[8px] text-sky-400 font-semibold">100% Vitals</span>
          </div>

          {/* Website Canvas Body */}
          <div className="p-3.5 flex-1 flex flex-col justify-between">
            {/* Nav Header */}
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-1.5">
              <div className="text-[10px] font-bold text-white tracking-tight">
                STUDIO ARCHITECT
              </div>
              <div className="flex items-center gap-2.5 font-mono text-[8px] text-neutral-400">
                <span>Projects</span>
                <span>Stack</span>
                <span className="text-sky-300">Contact</span>
              </div>
            </div>

            {/* Hero Banner Grid */}
            <div className="grid grid-cols-12 gap-2 my-auto items-center">
              <div className="col-span-7 space-y-1">
                <div className="font-mono text-[7px] text-sky-400 uppercase tracking-widest">
                  Next.js 15 & React 19
                </div>
                <div className="text-[14px] font-bold text-white leading-[1.1] tracking-tight">
                  High-Performance Web Platforms
                </div>
                <div className="text-[8px] text-neutral-400 leading-relaxed">
                  Sub-second edge streaming, headless UI, and modern motion architecture.
                </div>
              </div>
              {/* Media Card Placeholder */}
              <div className="col-span-5 h-[65px] rounded-lg bg-gradient-to-br from-sky-500/20 to-blue-600/10 border border-sky-400/30 p-2 flex flex-col justify-between">
                <span className="font-mono text-[7px] text-sky-200">Interactive Canvas</span>
                <div className="w-full h-1.5 rounded bg-sky-400/40" />
              </div>
            </div>

            {/* Bottom Tech Bar */}
            <div className="flex items-center justify-between border-t border-white/[0.06] pt-1.5 font-mono text-[8px] text-neutral-400">
              <span>TypeScript / Tailwind CSS</span>
              <span className="text-white">60 FPS Smooth Scroll</span>
            </div>
          </div>
        </motion.div>

        {/* Layered Mobile Responsive Preview (Right Layer) */}
        <motion.div
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
          className="absolute -right-3 bottom-1 z-30 w-[78px] h-[155px] rounded-2xl bg-[#06101D] border-2 border-sky-400/40 shadow-2xl p-1.5 flex flex-col justify-between overflow-hidden"
        >
          <div className="w-6 h-1 rounded-full bg-white/30 mx-auto" />
          <div className="space-y-1 my-auto">
            <div className="w-10 h-1.5 rounded bg-sky-400" />
            <div className="w-14 h-1 rounded bg-white/40" />
            <div className="w-12 h-1 rounded bg-white/20" />
            <div className="w-full h-12 rounded-lg bg-sky-500/20 border border-sky-400/30" />
          </div>
          <div className="w-8 h-0.5 rounded-full bg-white/30 mx-auto" />
        </motion.div>

      </div>
    </div>
  );
}
