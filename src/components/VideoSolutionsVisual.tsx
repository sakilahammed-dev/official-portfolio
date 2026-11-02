"use client";

import { motion } from "framer-motion";

export default function VideoSolutionsVisual() {
  return (
    <div className="relative w-full h-full min-h-[260px] sm:min-h-[320px] flex items-center justify-end overflow-hidden pointer-events-none select-none pr-2 sm:pr-8">
      {/* 1. ATMOSPHERIC AMBIENT GLOW */}
      <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-rose-950/25 blur-[90px] pointer-events-none" />

      {/* 2. CINEMA MOTION SUITE & PARAMETRIC TIMELINE (REMOTION & AFTER EFFECTS STYLE) */}
      <div className="relative w-full max-w-[490px] h-[250px] flex items-center justify-end">
        
        {/* Film Strip Banner (Top Left Floating Layer) */}
        <motion.div
          animate={{ x: [0, -6, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute left-0 top-1 z-20 h-10 rounded-lg bg-[#180509] border border-rose-400/35 px-2 flex items-center gap-1.5 shadow-xl"
        >
          {/* Perforations & Frames */}
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-1">
              <div className="w-1.5 h-6 rounded-sm bg-black/60 border border-white/10" />
              <div className="w-8 h-7 rounded bg-rose-950/60 border border-rose-400/30 flex items-center justify-center font-mono text-[7px] text-rose-300">
                0{i + 1}
              </div>
            </div>
          ))}
          <span className="font-mono text-[7px] text-rose-300/80 uppercase px-1">
            35mm 4K Film
          </span>
        </motion.div>

        {/* Main Timeline & Motion Graph Workstation (Center Layer) */}
        <motion.div
          animate={{ y: [0, 2, 0] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut" }}
          className="relative z-10 w-[340px] sm:w-[380px] h-[225px] rounded-2xl bg-[#120407]/90 border border-rose-400/25 shadow-[0_20px_50px_rgba(0,0,0,0.7)] backdrop-blur-xl p-3.5 flex flex-col justify-between overflow-hidden"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2">
            <span className="font-mono text-[8px] uppercase tracking-wider text-rose-300 font-semibold">
              Motion Suite: Remotion & FFmpeg Pipeline
            </span>
            <span className="font-mono text-[8px] text-neutral-400">
              Output: ProRes 422 HQ
            </span>
          </div>

          {/* Center: Multi-Track Video Timeline */}
          <div className="space-y-1.5 my-auto">
            {/* Track 1: Keyframe Video Layers */}
            <div className="h-6 rounded-lg bg-black/40 border border-white/10 px-2 flex items-center justify-between font-mono text-[7px]">
              <span className="text-neutral-400">Track 01: Video</span>
              <div className="flex gap-1">
                <div className="w-12 h-3.5 rounded bg-rose-500/20 border border-rose-400/30 flex items-center justify-center text-rose-200">
                  Intro 00:02
                </div>
                <div className="w-16 h-3.5 rounded bg-rose-600/30 border border-rose-400/40 flex items-center justify-center text-white">
                  Dynamic Core
                </div>
                <div className="w-10 h-3.5 rounded bg-rose-500/20 border border-rose-400/30 flex items-center justify-center text-rose-200">
                  Outro
                </div>
              </div>
            </div>

            {/* Track 2: Parametric Bezier Graph with Scrubbing Playhead */}
            <div className="relative h-11 rounded-lg bg-black/40 border border-white/10 px-2 flex items-center overflow-hidden">
              <span className="font-mono text-[7px] text-neutral-400 absolute left-2 top-1">
                Bezier Easing: cubic-bezier(0.16, 1, 0.3, 1)
              </span>

              {/* Vector Bezier Motion Curve */}
              <svg className="w-full h-8 mt-3" viewBox="0 0 280 32" fill="none">
                <path
                  d="M 20 28 C 80 28, 120 4, 260 4"
                  stroke="#FB7185"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
                <circle cx="20" cy="28" r="3" fill="#FB7185" />
                <circle cx="260" cy="4" r="3" fill="#FB7185" />
              </svg>

              {/* Animated Playhead Line */}
              <motion.div
                className="absolute top-0 bottom-0 w-[1.5px] bg-white shadow-[0_0_8px_rgba(255,255,255,0.9)] z-20"
                animate={{ left: ["10%", "90%"] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
              />
            </div>

            {/* Track 3: Synchronous Audio Waveform */}
            <div className="h-5 rounded-lg bg-black/40 border border-white/10 px-2 flex items-center justify-between font-mono text-[7px]">
              <span className="text-neutral-400">Audio 48kHz</span>
              <div className="flex items-center gap-0.5 h-2.5">
                {[3, 6, 9, 5, 11, 8, 4, 10, 7, 12, 6, 8, 10, 4, 7, 5, 9, 11, 4, 8].map((h, i) => (
                  <div
                    key={i}
                    className="w-1 rounded-sm bg-rose-400/70"
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Render Status Bar */}
          <div className="flex items-center justify-between border-t border-white/10 pt-2 font-mono text-[8px]">
            <span className="text-neutral-400">Resolution: 3840 x 2160 @ 60 FPS</span>
            <span className="text-rose-300 font-semibold">Render: 100% Synced</span>
          </div>
        </motion.div>

      </div>
    </div>
  );
}
