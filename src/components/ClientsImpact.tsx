"use client";

import { motion } from "framer-motion";
import { TrendingUp, ShieldCheck, Zap, Clock, Globe, ArrowUpRight, CheckCircle2, Cpu } from "lucide-react";

export default function ClientsImpact() {
  const metrics = [
    {
      value: "99.98%",
      label: "Autonomous System Uptime",
      description: "Deterministic self-healing protocols & multi-agent failover loops that keep enterprise workflows online 24/7/365.",
      badge: "High Availability",
      color: "from-emerald-400 to-teal-500",
      accentBorder: "group-hover:border-emerald-500/30",
    },
    {
      value: "< 48H",
      label: "Rapid Architecture Staging",
      description: "From multi-agent architectural blueprint to live, validated enterprise staging environment in record turnaround.",
      badge: "Fast Turnaround",
      color: "from-cyan-400 to-blue-500",
      accentBorder: "group-hover:border-cyan-500/30",
    },
    {
      value: "10x+",
      label: "Operational Speedup",
      description: "Eliminating manual bottlenecks, human latency, and repetitive friction across high-frequency business pipelines.",
      badge: "Efficiency Multiplier",
      color: "from-purple-400 to-indigo-500",
      accentBorder: "group-hover:border-purple-500/30",
    },
    {
      value: "100%",
      label: "Sidq & Ethical Compliance",
      description: "Halal, high-integrity architecture with complete audit logging, deterministic state control, and zero data leakage.",
      badge: "Amanah Protocol",
      color: "from-amber-400 to-orange-500",
      accentBorder: "group-hover:border-amber-500/30",
    },
  ];

  const industrySectors = [
    { name: "Autonomous Workflow OS", detail: "Self-Healing Agent Swarms" },
    { name: "Fintech & Transaction Relays", detail: "Real-Time Ledger Automations" },
    { name: "Enterprise ERP & CRM Sync", detail: "Bi-Directional Zero-Loss Relays" },
    { name: "Neural Voice Dispatch", detail: "Sub-200ms Telephony AI" },
    { name: "Dynamic Media Pipelines", detail: "Deterministic Video Engines" },
    { name: "Predictive Analytics", detail: "Root-Cause Anomaly Solvers" },
  ];

  return (
    <section
      id="clients"
      className="relative w-full bg-[#08090A] text-white pt-24 sm:pt-32 pb-28 sm:pb-36 px-6 sm:px-12 xl:px-20 rounded-t-[36px] sm:rounded-t-[48px] shadow-[0_-24px_60px_rgba(0,0,0,0.18)] z-20 select-none scroll-mt-8"
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-gradient-to-b from-white/[0.03] to-transparent blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto space-y-20 sm:space-y-24">
        {/* ========================================================= */}
        {/* 1. SECTION HEADER                                         */}
        {/* ========================================================= */}
        <div className="space-y-6 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 font-mono text-xs text-brand-cyan uppercase tracking-wider">
            <TrendingUp className="w-3.5 h-3.5 text-brand-emerald" />
            <span>// 04 ENTERPRISE IMPACT &amp; VELOCITY</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.03em] text-white leading-[1.08] font-sans">
            Measurable Operational Velocity
          </h2>

          <p className="text-base sm:text-lg text-[#888888] font-light leading-relaxed max-w-2xl">
            We measure success not in empty agency promises, but in validated uptime, reduced operational overhead, and scalable autonomous execution.
          </p>
        </div>

        {/* ========================================================= */}
        {/* 2. FOUR HARD METRIC PILLARS                               */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((m, idx) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={`group relative p-8 sm:p-9 rounded-3xl bg-[#0F1114] border border-white/10 ${m.accentBorder} hover:bg-[#14161B] transition-all duration-300 flex flex-col justify-between space-y-8 shadow-[0_12px_32px_rgba(0,0,0,0.25)]`}
            >
              {/* Badge */}
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[#777777] px-2.5 py-1 rounded-full bg-white/[0.03] border border-white/5">
                  {m.badge}
                </span>
                <span className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-white transition-colors" />
              </div>

              {/* Number Value */}
              <div className="space-y-3">
                <div
                  className={`text-5xl sm:text-6xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-br ${m.color} font-sans leading-none`}
                >
                  {m.value}
                </div>
                <h3 className="text-lg font-bold text-white tracking-tight leading-snug">
                  {m.label}
                </h3>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-[13px] text-[#777777] font-normal leading-relaxed pt-3 border-t border-white/5 group-hover:text-[#999999] transition-colors">
                {m.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ========================================================= */}
        {/* 3. ARCHITECTURAL DOMAINS WE POWER                         */}
        {/* ========================================================= */}
        <div className="space-y-6 pt-4">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-white/10 pb-4">
            <h3 className="text-lg sm:text-xl font-bold text-white tracking-tight">
              Enterprise Domains &amp; Autonomous Frontiers
            </h3>
            <span className="text-xs font-mono text-[#666666]">
              Verified Production Architecture
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
            {industrySectors.map((sector) => (
              <div
                key={sector.name}
                className="p-4 sm:p-5 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/15 transition-all duration-300 space-y-1.5"
              >
                <div className="text-xs sm:text-sm font-semibold text-white/90 leading-tight">
                  {sector.name}
                </div>
                <div className="text-[11px] font-mono text-[#666666] leading-tight">
                  {sector.detail}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ========================================================= */}
        {/* 4. WORLDWIDE ENTERPRISE SCOPE BANNER                      */}
        {/* ========================================================= */}
        <div className="relative overflow-hidden p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-[#121418] via-[#161920] to-[#121418] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left shadow-2xl">
          {/* Ambient Corner Blur */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-brand-cyan/5 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2.5 max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 text-xs font-mono text-brand-emerald">
              <span className="w-2 h-2 rounded-full bg-brand-emerald animate-pulse" />
              <span>GLOBAL OPERATIONS ARCHITECTURE</span>
            </div>
            <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white tracking-tight leading-snug">
              Based in Dhaka (GMT+6) • Engineering for Enterprises Worldwide
            </h4>
            <p className="text-xs sm:text-sm text-[#777777] font-light leading-relaxed">
              Collaborating asynchronously and synchronously with founders, engineering leads, and forward-thinking enterprises across North America, Europe, and Asia-Pacific.
            </p>
          </div>

          <a
            href="#contact"
            className="group relative z-10 inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-white text-black font-semibold text-xs sm:text-sm tracking-tight hover:bg-[#F0EDE6] active:scale-95 transition-all duration-300 shadow-xl shrink-0"
          >
            <span>Initiate Technical Briefing</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.2] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </section>
  );
}
