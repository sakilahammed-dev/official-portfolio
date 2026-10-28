"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Cpu, Sparkles, Activity, ShieldCheck, Terminal } from "lucide-react";
import MenuDrawer from "./MenuDrawer";

export default function Hero() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentCapability, setCurrentCapability] = useState(0);

  // Dynamic showcase capabilities that rotate like Fantasy's sizzle reel
  const capabilities = [
    { title: "AUTONOMOUS MULTI-AGENT SWARMS", code: "SWARM_CORE // 01", desc: "Self-healing collaborative LLM pipelines" },
    { title: "ENTERPRISE n8n ORCHESTRATION", code: "WORKFLOW_ENGINE // 02", desc: "High-throughput deterministic business automation" },
    { title: "RESILIENT ROOT-CAUSE ENGINEERING", code: "FAILOVER_ZERO // 03", desc: "Zero-downtime mission-critical AI infrastructure" },
    { title: "FULL-STACK INTELLIGENT SYSTEMS", code: "NEXT_AGENTIC // 04", desc: "Production Next.js, FastAPI & Vector DB architectures" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentCapability((prev) => (prev + 1) % capabilities.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [capabilities.length]);

  return (
    <>
      <MenuDrawer isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <section className="relative w-full h-[100dvh] min-h-[650px] bg-black text-white overflow-hidden flex flex-col justify-between select-none">
        {/* 1. Cinematic Ambient Spotlight & Volumetric Fog (Fantasy Tone) */}
        <div className="absolute inset-0 pointer-events-none z-0">
          {/* Central Blue/Cyan Spotlight directly behind Sakil */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] sm:w-[950px] h-[700px] sm:h-[950px] rounded-full bg-gradient-to-tr from-brand-blue/30 via-brand-cyan/15 to-transparent blur-[160px] opacity-40" />

          {/* Top subtle studio rim light */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[300px] bg-gradient-to-b from-white/10 to-transparent blur-3xl opacity-20" />

          {/* Floor Horizon Stage Reflection (Fantasy Perspective) */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[40vh] opacity-20"
            style={{
              backgroundImage:
                "linear-gradient(to top, rgba(0, 0, 0, 0.98), transparent 90%), linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
              backgroundSize: "100% 100%, 72px 72px, 72px 72px",
              transform: "perspective(600px) rotateX(68deg)",
              transformOrigin: "bottom center",
            }}
          />
        </div>

        {/* 2. Top Header Bar (Exact Fantasy Layout: Logo Left, Menu Pill Right) */}
        <header className="relative z-30 pt-8 sm:pt-10 px-8 sm:px-14 flex items-center justify-between w-full">
          {/* Fantasy-style Geometric Star Logo + Wordmark */}
          <a href="#" className="flex items-center gap-3 group">
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 text-white transition-transform duration-500 group-hover:rotate-90"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
            </svg>
            <span className="font-bold tracking-tight text-base sm:text-lg text-white font-mono uppercase">
              SAKIL AHAMMED
            </span>
          </a>

          {/* Fantasy-style Menu Button (Rounded Pill with Backdrop Blur) */}
          <button
            onClick={() => setIsMenuOpen(true)}
            className="px-6 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-sm font-medium tracking-wide transition-all duration-300 border border-white/5 active:scale-95 cursor-pointer"
          >
            Menu
          </button>
        </header>

        {/* 3. The Centerpiece Stage: Sakil Standing Tall in the Spotlight (Replacing the Fantasy Car) */}
        <div className="relative z-10 flex-1 flex items-end justify-center pointer-events-none pb-0">
          <div className="relative w-full max-w-xl sm:max-w-2xl h-[72vh] sm:h-[80vh] flex items-end justify-center">
            {/* Ambient Silhouette Glow */}
            <div className="absolute bottom-8 w-2/3 h-2/3 rounded-full bg-brand-blue/25 blur-[120px] pointer-events-none" />

            {/* Sakil's High-Resolution Portrait */}
            <motion.img
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
              src="/images/sakil.jpg"
              alt="Sakil Ahammed • Full-Stack AI Automation & Autonomous Operations Architect"
              className="relative z-10 max-h-full w-auto object-contain object-bottom drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
            />

            {/* Seamless Bottom Shadow Blend */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black via-black/80 to-transparent z-20 pointer-events-none" />

            {/* Floating Dynamic Capability Badge (Changing like a live reel) */}
            <div className="absolute bottom-16 sm:bottom-20 z-30 pointer-events-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentCapability}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="px-5 py-2 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl flex items-center gap-3 font-mono text-xs"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse" />
                  <span className="text-text-muted">{capabilities[currentCapability].code}</span>
                  <span className="text-white/30">•</span>
                  <span className="text-white font-semibold tracking-wider">
                    {capabilities[currentCapability].title}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* 4. Bottom Bar (Exact Fantasy Layout: Signature Left, Down Arrow Right) */}
        <footer className="relative z-30 pb-8 sm:pb-10 px-8 sm:px-14 flex items-end justify-between w-full">
          {/* Bottom Left: Understated Poetic Signature Statement (Fantasy's 'Lead by Design') */}
          <div className="space-y-1">
            <h1 className="text-base sm:text-lg font-medium text-white tracking-normal font-sans">
              Lead by Autonomous Intelligence
            </h1>
            <p className="text-xs sm:text-sm text-text-secondary/80 font-light">
              Full-Stack AI Automation &amp; Autonomous Operations Architect
            </p>
          </div>

          {/* Bottom Right: Minimal Scroll Down Arrow (Fantasy's '↓') */}
          <a
            href="#overview"
            className="group p-2 rounded-full hover:bg-white/10 transition-colors duration-300 flex items-center justify-center cursor-pointer"
            aria-label="Scroll to explore"
          >
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="w-5 h-5 sm:w-6 sm:h-6 text-white/90 group-hover:text-white transition-colors" />
            </motion.div>
          </a>
        </footer>
      </section>

      {/* 5. The Content Unfolding upon Scroll (Section 2) */}
      <section id="overview" className="relative w-full bg-[#08090A] text-white py-24 sm:py-32 px-6 sm:px-12 border-t border-white/5">
        <div className="max-w-6xl mx-auto space-y-16">
          {/* Monolithic Statement Header */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/[0.04] border border-white/10 font-mono text-xs text-brand-cyan uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>THE ARCHITECTURAL CONVICTION</span>
            </div>
            <h2 className="text-3xl sm:text-6xl font-bold tracking-tight text-white leading-[1.08]">
              Engineering autonomous workflows, multi-agent swarms, and resilient digital architectures that scale enterprises with zero downtime.
            </h2>
            <p className="text-base sm:text-xl text-text-secondary font-light max-w-3xl leading-relaxed">
              We turn intricate human operations into deterministic, self-healing automated systems. Built on Sidq, root-cause resilience, and world-class engineering.
            </p>
          </div>

          {/* 3 Core Superpowers (Fantasy 3 Pillars) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-brand-blue/40 transition-all duration-500 space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center text-brand-blue group-hover:scale-110 transition-transform">
                <Cpu className="w-6 h-6" />
              </div>
              <span className="font-mono text-xs text-brand-cyan uppercase">PILLAR 01</span>
              <h3 className="text-2xl font-bold text-white">Agile &amp; Rapid Learner</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Deconstructing emerging foundation models, agentic protocols, and enterprise technologies at lightning speed to build immediate real-world value.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-brand-cyan/40 transition-all duration-500 space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="font-mono text-xs text-brand-cyan uppercase">PILLAR 02</span>
              <h3 className="text-2xl font-bold text-white">Deep Resilience</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Relentless root-cause debugging and zero-failover logic. Systems engineered to self-heal, endure high concurrency, and execute flawlessly.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-brand-emerald/40 transition-all duration-500 space-y-4 group">
              <div className="w-12 h-12 rounded-2xl bg-brand-emerald/10 border border-brand-emerald/20 flex items-center justify-center text-brand-emerald group-hover:scale-110 transition-transform">
                <Activity className="w-6 h-6" />
              </div>
              <span className="font-mono text-xs text-brand-emerald uppercase">PILLAR 03</span>
              <h3 className="text-2xl font-bold text-white">Humanity &amp; Growth</h3>
              <p className="text-sm text-text-secondary leading-relaxed">
                Technology anchored in Sidq &amp; Amanah. Ethical automation that empowers human potential, respects values, and drives massive commercial ROI.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
