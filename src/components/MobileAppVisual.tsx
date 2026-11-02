"use client";

import { motion } from "framer-motion";

export default function MobileAppVisual() {
  return (
    <div className="relative w-full h-full min-h-[260px] sm:min-h-[320px] flex items-center justify-end overflow-hidden pointer-events-none select-none pr-2 sm:pr-8">
      {/* 1. ATMOSPHERIC AMBIENT GLOW */}
      <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-emerald-950/25 blur-[90px] pointer-events-none" />

      {/* 2. DUAL REALISTIC SMARTPHONE HANDSET SHOWCASE */}
      <div className="relative w-full max-w-[490px] h-[250px] flex items-center justify-end">
        
        {/* Back Phone (Angled Depth Layer) */}
        <motion.div
          animate={{ y: [0, -3, 0], rotate: [-6, -4, -6] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-36 bottom-3 z-10 w-[145px] h-[215px] rounded-[26px] bg-[#040E08] border border-emerald-400/25 shadow-xl p-2.5 flex flex-col justify-between overflow-hidden opacity-80"
        >
          <div className="w-8 h-1 rounded-full bg-white/30 mx-auto" />
          {/* Notification Card */}
          <div className="space-y-1.5 my-auto">
            <div className="p-2 rounded-xl bg-emerald-900/30 border border-emerald-400/30">
              <div className="font-mono text-[7px] text-emerald-300 font-semibold uppercase">
                Offline-First Reconcile
              </div>
              <div className="text-[9px] text-white font-medium">
                100% Data Synchronized
              </div>
              <div className="text-[7px] text-neutral-400">
                Local SQLite to Cloud Firestore
              </div>
            </div>
            <div className="p-2 rounded-xl bg-white/[0.03] border border-white/10">
              <div className="text-[8px] text-neutral-300">
                Push Notification Ready
              </div>
            </div>
          </div>
          <div className="w-10 h-0.5 rounded-full bg-white/20 mx-auto" />
        </motion.div>

        {/* Front Phone (Primary Showcase Handset) */}
        <motion.div
          animate={{ y: [0, 3, 0], rotate: [2, 0, 2] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-20 w-[165px] sm:w-[180px] h-[235px] rounded-[30px] bg-[#07160E] border-2 border-emerald-400/40 shadow-[0_25px_60px_rgba(0,0,0,0.8)] p-2.5 flex flex-col justify-between overflow-hidden"
        >
          {/* Top Notch / Dynamic Island */}
          <div className="w-full flex items-center justify-between px-1">
            <span className="font-mono text-[8px] text-white/90 font-bold">9:41</span>
            <div className="w-10 h-2 rounded-full bg-black/90 border border-white/10" />
            <span className="font-mono text-[8px] text-emerald-400 font-semibold">60 FPS</span>
          </div>

          {/* Real Mobile App Interface */}
          <div className="flex-1 flex flex-col justify-between py-2 space-y-1.5">
            {/* Balance Card */}
            <div className="p-2 rounded-xl bg-emerald-950/40 border border-emerald-400/30 space-y-1">
              <span className="font-mono text-[7px] text-emerald-300/80 uppercase">Portfolio Overview</span>
              <div className="text-[13px] font-bold text-white leading-none">$148,920.00</div>
              <div className="text-[7px] text-emerald-400 font-medium">+24.6% this month</div>
            </div>

            {/* Spline Motion Chart */}
            <div className="h-[36px] w-full rounded-lg bg-black/40 border border-white/[0.06] p-1 flex items-center">
              <svg className="w-full h-full" viewBox="0 0 140 30" fill="none">
                <path
                  d="M 5 22 C 25 18, 45 28, 70 12 C 95 2, 115 15, 135 6"
                  stroke="#10B981"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            {/* 3 Quick Action Tiles */}
            <div className="grid grid-cols-3 gap-1">
              <div className="rounded-lg bg-white/[0.04] border border-white/10 p-1 text-center font-mono text-[7px] text-neutral-200">
                Native iOS
              </div>
              <div className="rounded-lg bg-white/[0.04] border border-white/10 p-1 text-center font-mono text-[7px] text-neutral-200">
                Android
              </div>
              <div className="rounded-lg bg-emerald-500/15 border border-emerald-400/30 p-1 text-center font-mono text-[7px] text-emerald-300">
                Flutter
              </div>
            </div>
          </div>

          {/* Bottom Dock / Home Indicator */}
          <div className="w-full flex flex-col items-center gap-1 pt-1 border-t border-white/10">
            <div className="w-12 h-1 rounded-full bg-white/40" />
          </div>
        </motion.div>

        {/* Floating Spec Badge (Right Side) */}
        <motion.div
          animate={{ y: [0, -2, 0] }}
          transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute -right-2 top-8 z-30 rounded-xl bg-[#031109]/95 border border-emerald-400/30 p-2 shadow-xl backdrop-blur-xl font-mono text-[8px] space-y-1"
        >
          <div className="text-emerald-300 font-bold uppercase">React Native / Flutter</div>
          <div className="text-neutral-300">Gesture Engine 120Hz</div>
        </motion.div>

      </div>
    </div>
  );
}
