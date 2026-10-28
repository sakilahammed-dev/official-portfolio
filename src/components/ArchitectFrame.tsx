"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Shield, Cpu, Activity, Sparkles, Terminal } from "lucide-react";

interface ArchitectFrameProps {
  photoSrc?: string;
}

export default function ArchitectFrame({ photoSrc }: ArchitectFrameProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Subtle 3D tilt
    setRotateX(-y * 0.04);
    setRotateY(x * 0.04);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
    setIsHovered(false);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto select-none perspective-1000">
      {/* Ambient background energy behind the frame */}
      <div className="absolute -inset-1 rounded-[42px] bg-gradient-to-tr from-brand-blue/30 via-brand-cyan/20 to-brand-emerald/20 blur-2xl opacity-60 transition-opacity duration-500 group-hover:opacity-100 pointer-events-none" />

      {/* Monolithic 3D Card Container */}
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        animate={{
          rotateX,
          rotateY,
          scale: isHovered ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{ transformStyle: "preserve-3d" }}
        className="relative rounded-4xl bg-gradient-to-b from-[#14161A] to-[#0A0B0D] border border-white/10 p-6 shadow-2xl shadow-black/80 overflow-hidden"
      >
        {/* Futuristic Technical Top Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-white/5 font-mono text-[11px] text-text-secondary">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-emerald animate-ping" />
            <span className="text-brand-emerald font-semibold uppercase tracking-wider">CORE: ONLINE</span>
          </div>
          <span className="text-text-muted">ID: SAKIL-ARCH-01</span>
        </div>

        {/* Central Portrait / Cybernetic Architect Stage */}
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden mt-4 border border-white/10 bg-gradient-to-b from-white/[0.04] to-black/80 flex items-center justify-center group">
          {/* Subtle Grid Overlay */}
          <div
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />

          {/* Crosshair Target Corners (Fantasy High-Tech Aesthetic) */}
          <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-brand-cyan/70" />
          <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-brand-cyan/70" />
          <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-brand-cyan/70" />
          <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-brand-cyan/70" />

          {photoSrc ? (
            /* Real User Photo (When provided) */
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={photoSrc}
              alt="Sakil Ahammed"
              className="w-full h-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            /* High-Tech Futuristic Cybernetic Architect Stage (Placeholder until photo upload) */
            <div className="relative z-10 flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="relative w-28 h-28 rounded-full bg-gradient-to-tr from-brand-blue to-brand-cyan p-0.5 shadow-xl shadow-brand-blue/30">
                <div className="w-full h-full rounded-full bg-background flex items-center justify-center overflow-hidden">
                  <Cpu className="w-12 h-12 text-brand-cyan animate-pulse" />
                </div>
                <div className="absolute -bottom-1 -right-1 p-2 rounded-full bg-brand-blue text-white shadow-lg">
                  <Shield className="w-4 h-4" />
                </div>
              </div>

              <div className="space-y-1">
                <span className="text-xs font-mono tracking-widest text-brand-cyan uppercase">
                  ARCHITECT STAGE
                </span>
                <h4 className="text-xl font-bold tracking-tight text-white">
                  SAKIL AHAMMED
                </h4>
                <p className="text-xs text-text-secondary max-w-xs font-light">
                  Full-Stack AI Automation &amp; Autonomous Operations Architect
                </p>
              </div>

              {/* Ready for photo pill */}
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-cyan/10 border border-brand-cyan/30 text-[10px] font-mono text-brand-cyan">
                <Sparkles className="w-3 h-3" />
                <span>PHOTO STAGE READY FOR SAKIL</span>
              </div>
            </div>
          )}

          {/* Floating Telemetry Glass Pill on top of photo */}
          <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl card-glass border border-white/10 flex items-center justify-between font-mono text-[10px] text-text-secondary">
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-brand-cyan animate-pulse" />
              <span>FAILOVER: 0%</span>
            </div>
            <div className="h-3 w-px bg-white/10" />
            <div className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-brand-blue" />
              <span>RESILIENCE: 99.98%</span>
            </div>
            <div className="h-3 w-px bg-white/10" />
            <span className="text-brand-emerald font-semibold">100% SIDQ</span>
          </div>
        </div>

        {/* Bottom Metadata Badges */}
        <div className="mt-5 grid grid-cols-2 gap-3 pt-4 border-t border-white/5 font-mono text-xs">
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
            <span className="text-[10px] text-text-muted block">SPECIALIZATION</span>
            <span className="text-text-primary font-semibold text-xs mt-0.5 block truncate">
              Autonomous Swarms
            </span>
          </div>
          <div className="p-3 rounded-2xl bg-white/[0.02] border border-white/5">
            <span className="text-[10px] text-text-muted block">ARCHITECTURE</span>
            <span className="text-text-primary font-semibold text-xs mt-0.5 block truncate">
              Root-Cause Resilience
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
