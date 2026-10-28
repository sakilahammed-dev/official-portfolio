"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function MarqueeTicker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const tickerText1 = useRef<HTMLDivElement>(null);
  const tickerText2 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    let xPos = 0;
    const speed = 1.2;
    let direction = -1;

    // Track scroll velocity & direction (Dennis Snellenberg roll mechanism)
    ScrollTrigger.create({
      onUpdate: (self) => {
        direction = self.direction === 1 ? -1 : 1;
      },
    });

    const loop = () => {
      xPos += speed * direction;
      if (xPos <= -100) {
        xPos = 0;
      } else if (xPos >= 0) {
        xPos = -100;
      }

      if (tickerText1.current && tickerText2.current) {
        tickerText1.current.style.transform = `translateX(${xPos}%)`;
        tickerText2.current.style.transform = `translateX(${xPos}%)`;
      }

      requestAnimationFrame(loop);
    };

    const animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const items = [
    "AUTONOMOUS MULTI-AGENT SWARMS",
    "ENTERPRISE n8n ORCHESTRATION",
    "RESILIENT FAIL-SAFE AI PIPELINES",
    "ROOT-CAUSE AUTOMATION ARCHITECTURE",
    "FULL-STACK INTELLIGENT SYSTEMS",
    "100% ETHICAL & HIGH-ROI ENGINEERING",
  ];

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden border-y border-white/5 py-4 sm:py-6 bg-black/40 backdrop-blur-md select-none"
    >
      {/* Subtle edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="flex whitespace-nowrap will-change-transform">
        <div ref={tickerText1} className="flex shrink-0 items-center gap-8 px-4 transition-transform ease-linear">
          {items.map((item, idx) => (
            <div key={`t1-${idx}`} className="flex items-center gap-8">
              <span className="text-sm sm:text-base font-mono uppercase tracking-wider text-text-secondary/80 hover:text-brand-cyan transition-colors duration-300">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
            </div>
          ))}
        </div>

        <div ref={tickerText2} className="flex shrink-0 items-center gap-8 px-4 transition-transform ease-linear">
          {items.map((item, idx) => (
            <div key={`t2-${idx}`} className="flex items-center gap-8">
              <span className="text-sm sm:text-base font-mono uppercase tracking-wider text-text-secondary/80 hover:text-brand-cyan transition-colors duration-300">
                {item}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
