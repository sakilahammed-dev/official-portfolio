"use client";

import { motion } from "framer-motion";

export default function UxResearchVisual() {
  return (
    <div className="relative w-full h-full min-h-[260px] sm:min-h-[320px] flex items-center justify-end overflow-hidden pointer-events-none select-none pr-2 sm:pr-8">
      {/* 1. ATMOSPHERIC AMBIENT GLOW */}
      <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-fuchsia-950/25 blur-[90px] pointer-events-none" />

      {/* 2. UX RESEARCH STUDIO CANVAS (FIGJAM & MIRO WORKSHOP STYLE) */}
      <div className="relative w-full max-w-[490px] h-[250px] flex items-center justify-end">
        
        {/* Sticky Note 1: User Friction Finding (Angled Left Layer) */}
        <motion.div
          animate={{ y: [0, -3, 0], rotate: [-4, -2, -4] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-2 top-2 z-20 w-[145px] rounded-xl bg-[#FDF6E2] text-neutral-900 p-3 shadow-xl border border-amber-200/50 space-y-1.5"
        >
          <div className="font-mono text-[7px] uppercase tracking-wider text-amber-800 font-bold border-b border-amber-300/60 pb-1">
            Research Insight #04
          </div>
          <div className="text-[9px] font-semibold text-neutral-800 leading-snug">
            Drop-off occurs at step 3 due to cognitive overload.
          </div>
          <div className="font-mono text-[7px] text-amber-900/80">
            Friction Rate: 38.2%
          </div>
        </motion.div>

        {/* Sticky Note 2: Validated Design Solution (Angled Bottom Left) */}
        <motion.div
          animate={{ y: [0, 2, 0], rotate: [3, 1, 3] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          className="absolute left-14 bottom-2 z-30 w-[150px] rounded-xl bg-[#EDE9FE] text-neutral-900 p-3 shadow-2xl border border-purple-200/60 space-y-1.5"
        >
          <div className="font-mono text-[7px] uppercase tracking-wider text-purple-900 font-bold border-b border-purple-300/60 pb-1">
            Validated UI Solution
          </div>
          <div className="text-[9px] font-semibold text-neutral-900 leading-snug">
            1-Click unified checkout reduces decision steps by 60%.
          </div>
          <div className="font-mono text-[7px] text-purple-800">
            Task Time: 4.2s (was 12s)
          </div>
        </motion.div>

        {/* Center: Main Wireframe User Flow Board */}
        <motion.div
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 w-[270px] sm:w-[310px] h-[225px] rounded-2xl bg-[#14081B]/90 border border-fuchsia-400/25 p-3.5 shadow-2xl backdrop-blur-xl flex flex-col justify-between"
        >
          {/* Canvas Header */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="font-mono text-[8px] uppercase tracking-wider text-fuchsia-300 font-semibold">
              Usability Flow Spec
            </span>
            <span className="font-mono text-[8px] text-neutral-400">
              SUS Score: 92/100 (Grade A)
            </span>
          </div>

          {/* User Flow Sketch Matrix */}
          <div className="space-y-2 my-auto">
            <div className="flex items-center justify-between text-[8px] font-mono text-neutral-300">
              <span>Onboarding</span>
              <span>Selection</span>
              <span>Checkout</span>
            </div>

            {/* Wireframe Mockup Strip */}
            <div className="grid grid-cols-3 gap-2">
              {/* Screen 1 */}
              <div className="h-[65px] rounded-lg bg-white/[0.04] border border-white/15 p-1.5 flex flex-col justify-between">
                <div className="w-8 h-1 rounded bg-white/40" />
                <div className="space-y-1">
                  <div className="w-full h-1 rounded bg-white/20" />
                  <div className="w-10 h-1 rounded bg-white/20" />
                </div>
                <div className="w-full h-3 rounded bg-fuchsia-500/20" />
              </div>

              {/* Screen 2 */}
              <div className="h-[65px] rounded-lg bg-fuchsia-950/40 border border-fuchsia-400/35 p-1.5 flex flex-col justify-between">
                <div className="w-10 h-1 rounded bg-fuchsia-300" />
                <div className="w-full h-6 rounded bg-fuchsia-500/20 border border-fuchsia-400/30" />
                <div className="w-full h-3 rounded bg-fuchsia-400/40" />
              </div>

              {/* Screen 3 */}
              <div className="h-[65px] rounded-lg bg-white/[0.04] border border-white/15 p-1.5 flex flex-col justify-between">
                <div className="w-6 h-1 rounded bg-white/40" />
                <div className="w-8 h-8 rounded-full bg-white/10 mx-auto" />
                <div className="w-full h-3 rounded bg-emerald-500/20" />
              </div>
            </div>
          </div>

          {/* Bottom Heuristic Scorecard */}
          <div className="flex items-center justify-between border-t border-white/10 pt-2 font-mono text-[8px]">
            <span className="text-neutral-400">Accessibility: WCAG AAA</span>
            <span className="text-fuchsia-300 font-semibold">Success: 99.4%</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
