"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [complete, setComplete] = useState(false);
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    "INITIALIZING AUTONOMOUS CORE...",
    "CALIBRATING MULTI-AGENT SWARMS...",
    "SAKIL AHAMMED • ARCHITECT ONLINE",
  ];

  useEffect(() => {
    // Cycle through steps quickly
    const stepInterval = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        }
        clearInterval(stepInterval);
        return prev;
      });
    }, 450);

    // Fade out curtain after 1.5 seconds
    const timer = setTimeout(() => {
      setComplete(true);
    }, 1600);

    return () => {
      clearInterval(stepInterval);
      clearTimeout(timer);
    };
  }, [steps.length]);

  return (
    <AnimatePresence>
      {!complete && (
        <motion.div
          initial={{ y: "0%" }}
          exit={{
            y: "-100%",
            transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] bg-[#050608] flex flex-col items-center justify-center text-white select-none pointer-events-auto"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute w-[400px] h-[400px] bg-brand-blue/20 rounded-full blur-[120px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center space-y-6 text-center px-6">
            {/* Minimal Brand Monogram */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-2"
            >
              <span className="w-2.5 h-2.5 rounded-full bg-brand-cyan animate-ping" />
              <span className="font-bold tracking-widest text-lg font-mono text-white">
                SAKIL AHAMMED
              </span>
            </motion.div>

            {/* Changing Telemetry Step */}
            <div className="h-6 overflow-hidden">
              <motion.p
                key={stepIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.25 }}
                className="font-mono text-xs tracking-widest text-text-secondary uppercase"
              >
                {steps[stepIndex]}
              </motion.p>
            </div>

            {/* Minimal progress line */}
            <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.4, ease: "easeInOut" }}
                className="h-full bg-gradient-to-r from-brand-blue via-brand-cyan to-brand-emerald"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
