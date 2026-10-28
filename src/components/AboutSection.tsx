"use client";

import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section
      id="about"
      className="relative w-full bg-white text-[#1C1D20] pt-20 sm:pt-32 pb-20 sm:pb-28 select-none scroll-mt-12 overflow-hidden"
    >
      <style>{`
        @keyframes dennisDot1 {
          0%, 100% { opacity: 0.35; } 30%, 80% { opacity: 1; }
        }
        @keyframes dennisDot2 {
          0%, 100% { opacity: 0.35; } 45%, 80% { opacity: 1; }
        }
        @keyframes dennisDot3 {
          0%, 100% { opacity: 0.35; } 60%, 80% { opacity: 1; }
        }
        .animate-dot-1 { animation: dennisDot1 2s linear infinite; }
        .animate-dot-2 { animation: dennisDot2 2s linear infinite; }
        .animate-dot-3 { animation: dennisDot3 2s linear infinite; }
      `}</style>

      {/* ========================================================================= */}
      {/* 1. DENNIS SNELLENBERG ABOUT-HEADER (CLEAN, ICONIC H1 TYPOGRAPHY)          */}
      {/* ========================================================================= */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-14 xl:px-24 pb-6 sm:pb-12">
        <h1 className="text-[32px] sm:text-[46px] md:text-[56px] lg:text-[68px] font-normal tracking-[-0.03em] text-[#1C1D20] leading-[1.12] font-sans">
          <span className="block">Helping brands thrive</span>
          <span className="block">in the digital world</span>
        </h1>
      </div>

      {/* ========================================================================= */}
      {/* 2. CLEAN EDITORIAL HORIZONTAL STRIPE DIVIDER                              */}
      {/* ========================================================================= */}
      <div className="w-full border-t border-[#1C1D20]/15 my-4 sm:my-8" />

      {/* ========================================================================= */}
      {/* 3. DENNIS SNELLENBERG ABOUT-IMAGE (ASYMMETRICAL 35% / 65% SPLIT)          */}
      {/* ========================================================================= */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-14 xl:px-24 pt-8 sm:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column (35% in Dennis style): Arrow & Statement */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-32">
            {/* Dennis signature diagonal arrow icon */}
            <div className="w-10 h-10 rounded-full border border-[#1C1D20]/20 flex items-center justify-center text-[#1C1D20] rotate-45 transition-transform duration-500 hover:rotate-90">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <polyline points="2.76923077 0 12 0 12 9.23076923" />
                <line x1="12" y1="0" x2="0" y2="12" />
              </svg>
            </div>

            <p className="text-[22px] sm:text-[26px] md:text-[28px] text-[#1C1D20] font-normal leading-[1.38] tracking-[-0.01em]">
              I help companies from all over the world with tailor-made solutions. With each project, I push my work to new horizons, always putting <strong className="font-semibold text-black">quality</strong>, <strong className="font-semibold text-black">truthfulness (Sidq)</strong>, and <strong className="font-semibold text-black">trust (Amanah)</strong> first.
            </p>

            <p className="text-xs sm:text-sm font-mono uppercase tracking-[0.2em] text-[#777777] flex items-center gap-1.5 pt-1">
              <span>Always exploring</span>
              <span className="inline-flex tracking-normal font-bold">
                <span className="animate-dot-1">.</span>
                <span className="animate-dot-2">.</span>
                <span className="animate-dot-3">.</span>
              </span>
            </p>
          </div>

          {/* Right Column (65% in Dennis style): Single Image Frame (Clean, Pure Art) */}
          <div className="lg:col-span-7">
            <div className="single-about-image relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.08)] bg-[#EBEBEF] aspect-[4/5] max-w-2xl group border border-[#1C1D20]/10">
              <img
                src="/images/sakil_about.jpg"
                alt="Sakil Ahammed — Full-Stack AI Automation & Autonomous Operations Architect"
                className="w-full h-full object-cover object-[center_20%] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 4. DENNIS SNELLENBERG ABOUT-SERVICES (3-COLUMN NUMBERED SERVICES)          */}
      {/* ========================================================================= */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-14 xl:px-24 pt-20 sm:pt-32 pb-6 sm:pb-12 space-y-12">
        <div className="border-b border-[#1C1D20]/15 pb-6">
          <h2 className="text-3xl sm:text-5xl font-normal tracking-tight text-[#1C1D20]">
            I can help you with{" "}
            <span className="text-[#888888] inline-flex">
              <span className="animate-dot-1">.</span>
              <span className="animate-dot-2">.</span>
              <span className="animate-dot-3">.</span>
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-14">
          {/* Service 01 */}
          <div className="space-y-4">
            <span className="font-mono text-xs sm:text-sm text-[#888888] block">01</span>
            <div className="h-px w-full bg-[#1C1D20]/15" />
            <h4 className="text-2xl sm:text-[26px] font-bold text-[#1C1D20] pt-2">
              Autonomous AI &amp; Swarms
            </h4>
            <p className="text-[15px] sm:text-base text-[#3A3B40] leading-relaxed font-normal">
              Architecting self-healing multi-agent swarms, custom LLM pipelines, and resilient workflow automations that run 24/7 with zero bottlenecks—turning manual business operations into autonomous powerhouses.
            </p>
          </div>

          {/* Service 02 */}
          <div className="space-y-4">
            <span className="font-mono text-xs sm:text-sm text-[#888888] block">02</span>
            <div className="h-px w-full bg-[#1C1D20]/15" />
            <h4 className="text-2xl sm:text-[26px] font-bold text-[#1C1D20] pt-2">
              Full-Stack Web Architecture
            </h4>
            <p className="text-[15px] sm:text-base text-[#3A3B40] leading-relaxed font-normal">
              Engineering scalable, ultra-fast web platforms from scratch using Next.js, modern React, and robust Python backends. Focused on fluid micro-interactions, clean architectural design, and sub-millisecond responsiveness.
            </p>
          </div>

          {/* Service 03 (Dennis Signature Star Icon) */}
          <div className="space-y-4">
            <span className="font-mono text-xs sm:text-sm text-[#888888] block">03</span>
            <div className="h-px w-full bg-[#1C1D20]/15" />
            <h4 className="text-2xl sm:text-[26px] font-bold text-[#1C1D20] pt-2 flex items-center gap-2.5">
              <svg width="20" height="20" viewBox="0 0 100 100" className="inline-block fill-[#1C1D20] shrink-0">
                <path d="M99.1731586,50.0066986 C71.9402858,50.4482381 50,72.6619049 50,100 L50,100 L49.9933014,99.1731586 C49.5517619,71.9402858 27.3380951,50 0,50 L0,50 L0.826841425,49.9933014 C28.0597142,49.5517619 50,27.3380951 50,0 L50,0 L50.0066986,0.826841425 C50.4482381,28.0597142 72.6619049,50 100,50 L100,50 Z" />
              </svg>
              The Full Package
            </h4>
            <p className="text-[15px] sm:text-base text-[#3A3B40] leading-relaxed font-normal">
              Complete end-to-end execution: from First-Principles system deconstruction to live autonomous cloud deployment. Grounded in rapid agile learning, deep root-cause resilience, and ethical excellence (Sidq &amp; Amanah).
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}