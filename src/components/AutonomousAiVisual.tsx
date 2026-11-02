"use client";

import { motion } from "framer-motion";

export default function AutonomousAiVisual() {
  return (
    <div className="relative w-full h-full min-h-[260px] sm:min-h-[320px] flex items-center justify-end overflow-hidden pointer-events-none select-none pr-2 sm:pr-8">
      {/* 1. ATMOSPHERIC AMBIENT GLOW */}
      <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-[340px] h-[340px] rounded-full bg-purple-950/25 blur-[90px] pointer-events-none" />

      {/* 2. FULL-BLEED AUTOMATION PIPELINE WORKFLOW (ENTERPRISE GRAPHIC DESIGN) */}
      <div className="relative w-full max-w-[480px] h-[250px] flex flex-col justify-between p-1">
        
        {/* Top Workflow Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-2">
          <div className="font-mono text-[10px] uppercase tracking-wider text-purple-200/90 font-medium">
            Workflow: Autonomous Pipeline Architecture
          </div>
          <div className="font-mono text-[9px] text-neutral-400">
            Throughput: 12,000 ops/sec
          </div>
        </div>

        {/* Center: Handcrafted Multi-Stage Flowchart Nodes */}
        <div className="relative flex-1 flex items-center justify-between gap-2.5 py-3">
          
          {/* Node 1: Event Ingestion Block */}
          <div className="w-[125px] rounded-xl bg-white/[0.04] border border-white/15 p-2.5 shadow-lg backdrop-blur-md space-y-1.5">
            <div className="font-mono text-[8px] uppercase tracking-wider text-neutral-400">
              01. Ingestion
            </div>
            <div className="text-[11px] font-semibold text-white leading-tight">
              Event Stream
            </div>
            <div className="font-mono text-[8px] text-purple-300/80 bg-purple-500/10 rounded px-1.5 py-0.5 border border-purple-500/20 inline-block">
              POST /webhook
            </div>
            <div className="text-[8px] text-neutral-400 leading-tight">
              Schema validation and payload parsing
            </div>
          </div>

          {/* SVG Connector Branch */}
          <div className="w-8 h-full flex items-center justify-center">
            <svg className="w-full h-12" viewBox="0 0 32 48" fill="none">
              <path
                d="M 2 24 C 14 24, 18 10, 30 10"
                stroke="rgba(192, 132, 252, 0.4)"
                strokeWidth="1.5"
              />
              <path
                d="M 2 24 C 14 24, 18 38, 30 38"
                stroke="rgba(192, 132, 252, 0.4)"
                strokeWidth="1.5"
              />
              <motion.circle
                cx="2"
                cy="24"
                r="2"
                fill="#C084FC"
                animate={{ cx: [2, 30], cy: [24, 10] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
              />
            </svg>
          </div>

          {/* Node 2: Multi-Agent Consensus Swarm (Parallel Tasks) */}
          <div className="flex-1 flex flex-col gap-2">
            {/* Task A */}
            <div className="rounded-xl bg-purple-950/30 border border-purple-400/30 p-2 shadow-md backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8px] uppercase text-purple-300">Agent Worker</span>
                <span className="font-mono text-[8px] text-neutral-400">Task: Resolve</span>
              </div>
              <div className="text-[10px] font-medium text-white">
                Decision & Enrichment
              </div>
            </div>

            {/* Task B */}
            <div className="rounded-xl bg-white/[0.03] border border-white/10 p-2 shadow-md backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8px] uppercase text-neutral-400">Self-Healing</span>
                <span className="font-mono text-[8px] text-neutral-400">Auto-Retry</span>
              </div>
              <div className="text-[10px] font-medium text-neutral-200">
                Fallback Safe Execution
              </div>
            </div>
          </div>

          {/* SVG Connector Branch */}
          <div className="w-8 h-full flex items-center justify-center">
            <svg className="w-full h-12" viewBox="0 0 32 48" fill="none">
              <path
                d="M 2 10 C 14 10, 18 24, 30 24"
                stroke="rgba(192, 132, 252, 0.4)"
                strokeWidth="1.5"
              />
              <path
                d="M 2 38 C 14 38, 18 24, 30 24"
                stroke="rgba(192, 132, 252, 0.4)"
                strokeWidth="1.5"
              />
            </svg>
          </div>

          {/* Node 3: Deterministic Action Dispatch */}
          <div className="w-[120px] rounded-xl bg-white/[0.04] border border-white/15 p-2.5 shadow-lg backdrop-blur-md space-y-1.5">
            <div className="font-mono text-[8px] uppercase tracking-wider text-neutral-400">
              03. Execution
            </div>
            <div className="text-[11px] font-semibold text-white leading-tight">
              Action Dispatch
            </div>
            <div className="font-mono text-[8px] text-neutral-300 bg-white/10 rounded px-1.5 py-0.5 inline-block">
              DB & API Synced
            </div>
            <div className="text-[8px] text-neutral-400 leading-tight">
              Latency: 14ms | Zero loss
            </div>
          </div>

        </div>

        {/* Bottom Technical Spec Footer */}
        <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[9px] font-mono text-neutral-400">
          <span>Pipeline: Fully Automated</span>
          <span>Engine: Antigravity Autonomous Ops</span>
        </div>

      </div>
    </div>
  );
}
