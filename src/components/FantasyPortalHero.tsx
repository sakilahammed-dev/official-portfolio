"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDown, Cpu, Sparkles, Activity, ShieldCheck } from "lucide-react";

export default function FantasyPortalHero() {
  const [introStep, setIntroStep] = useState<"name" | "emblem" | "bloom" | "done">("name");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Step 1 (0s to 1.5s): Center Name "SAKIL AHAMMED" glides in from the right
    const t1 = setTimeout(() => {
      setIntroStep("emblem");
    }, 1500);

    // Step 2 (1.5s to 3.4s): Star floats with full clarity & red light actively swirls around it
    const t2 = setTimeout(() => {
      setIntroStep("bloom");
    }, 3400);

    // Step 3 (3.4s to 4.6s): Red bloom washes across screen & Sakil portrait emerges
    const t3 = setTimeout(() => {
      setIntroStep("done");
    }, 4600);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 2;
    const y = (clientY / innerHeight - 0.5) * 2;
    setMousePos({ x, y });
  };

  return (
    <>
      <section
        id="home"
        onMouseMove={handleMouseMove}
        className="relative w-full h-[100dvh] min-h-[680px] bg-black text-white overflow-hidden flex flex-col justify-between select-none"
      >
        {/* ========================================================================= */}
        {/* FANTASY FULLSCREEN PRELOADER OVERLAY (z-[9999] Pure Pitch Black Screen)   */}
        {/* Phase 1: Name "SAKIL AHAMMED" in center                                  */}
        {/* Phase 2: 4-Lobed Red Squircle Emblem in center (Hollow black inside)      */}
        {/* Phase 3: Squircle scales to edges, spreading crimson bloom across screen */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {introStep !== "done" && (
            <motion.div
              key="fantasy-preloader-overlay"
              initial={{ opacity: 1 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={`fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden pointer-events-none select-none transition-colors duration-700 ${
                introStep === "bloom" ? "bg-transparent" : "bg-black"
              }`}
            >
              <AnimatePresence mode="wait">
                {/* STEP 1: INITIAL CENTER NAME GLIDING IN FROM RIGHT (0s to 1.5s) */}
                {introStep === "name" && (
                  <motion.div
                    key="step-name"
                    initial={{ opacity: 0, x: 90 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 flex items-center justify-center text-center px-6"
                  >
                    <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-sans uppercase font-medium tracking-[0.42em] select-none drop-shadow-[0_0_35px_rgba(255,255,255,0.7)]">
                      SAKIL AHAMMED
                    </h1>
                  </motion.div>
                )}

                {/* STEP 2 & 3: EXACT 4-LOBED SQUIRCLE WITH SWIRLING RED LIGHT (1.5s to 3.4s) */}
                {(introStep === "emblem" || introStep === "bloom") && (
                  <motion.div
                    key="step-emblem-container"
                    initial={{ opacity: 0, scale: 0.88 }}
                    animate={
                      introStep === "emblem"
                        ? {
                            opacity: 1,
                            scale: [0.92, 1.04, 0.98, 1],
                            transition: {
                              opacity: { duration: 0.45 },
                              scale: { duration: 1.6, ease: "easeInOut" },
                            },
                          }
                        : {
                            scale: [1, 2.6, 8],
                            opacity: [1, 0.85, 0],
                            filter: ["blur(0px)", "blur(12px)", "blur(35px)"],
                            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] },
                          }
                    }
                    className="relative flex items-center justify-center"
                  >
                    {/* Ambient Velvet Crimson Glow Halo spreading across screen */}
                    <motion.div
                      animate={
                        introStep === "bloom"
                          ? {
                              scale: [1, 3.5, 9],
                              opacity: [0.55, 0.95, 0],
                              transition: { duration: 1.2, ease: "easeOut" },
                            }
                          : {
                              scale: 1,
                              opacity: 0.55,
                            }
                      }
                      className="absolute w-[550px] sm:w-[750px] h-[550px] sm:h-[750px] rounded-full bg-gradient-to-tr from-[#FF0055]/55 via-[#E60045]/35 to-transparent blur-[110px] pointer-events-none"
                    />

                    {/* Exact Fantasy Squircle with Actively Swirling Crimson Light (30fps) */}
                    <div className="relative w-96 sm:w-[480px] md:w-[540px] h-96 sm:h-[480px] md:h-[540px] flex items-center justify-center">
                      <img
                        src="/images/fantasy_swirling_squircle.webp"
                        alt="Sakil Swirling Emblem"
                        className="w-full h-full object-contain pointer-events-none drop-shadow-[0_0_60px_rgba(255,0,85,0.8)] filter brightness-110"
                      />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ========================================================================= */}
        {/* PHASE 3 EXPANDING CRIMSON WAVE RIPPLE                                     */}
        {/* ========================================================================= */}
        <AnimatePresence>
          {introStep === "bloom" && (
            <motion.div
              key="expanding-red-bloom"
              initial={{ scale: 1, opacity: 1 }}
              animate={{
                scale: [1, 3.2, 8.5],
                opacity: [1, 0.85, 0],
                filter: ["blur(0px)", "blur(14px)", "blur(40px)"],
              }}
              transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
              className="fixed inset-0 z-[9990] flex items-center justify-center pointer-events-none overflow-hidden"
            >
              <div className="relative w-96 sm:w-[520px] h-96 sm:h-[520px] flex items-center justify-center">
                <img
                  src="/images/fantasy_bloom_wave.png"
                  alt="Bloom Wave"
                  className="w-full h-full object-contain scale-120"
                />
                <div className="absolute w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-[#FF0055]/65 via-[#E60045]/35 to-transparent blur-[100px]" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Top Spacer maintaining vertical alignment with fixed Cuberto Navbar */}
        <div className="h-20 sm:h-28 w-full pointer-events-none select-none" aria-hidden="true" />

        {/* ========================================================================= */}
        {/* 2. SUBTLE GIANT BACKGROUND TYPOGRAPHY: 'SAKIL AHAMMED'                    */}
        {/* Placed deeply behind Sakil in elegant translucent white for 3D depth      */}
        {/* ========================================================================= */}
        <div className="absolute inset-0 z-5 flex items-center justify-center pointer-events-none overflow-hidden px-4 sm:px-8">
          <motion.div
            animate={{
              x: mousePos.x * -15,
              y: mousePos.y * -10,
            }}
            transition={{ type: "spring", stiffness: 100, damping: 25 }}
            className="w-full text-center tracking-tight sm:tracking-tighter uppercase font-black select-none whitespace-nowrap"
          >
            <span className="block text-[8.5vw] sm:text-[9.8vw] lg:text-[10.5vw] leading-none font-black text-transparent bg-clip-text bg-gradient-to-b from-white/[0.22] via-white/[0.10] to-transparent drop-shadow-[0_0_80px_rgba(255,255,255,0.06)]">
              SAKIL AHAMMED
            </span>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* 3. CENTER STAGE: SAKIL'S PORTRAIT REVEAL FROM APERTURE                    */}
        {/* ========================================================================= */}
        <div className="relative z-20 flex-1 flex items-center justify-center w-full overflow-hidden">
          {/* SAKIL'S CINEMATIC PORTRAIT */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{
              opacity: introStep === "bloom" || introStep === "done" ? 1 : 0,
            }}
            transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full h-full flex items-end justify-center"
          >
            {/* Atmospheric Studio Backlight (Crimson & Cyan Studio Glow) */}
            <div className="absolute inset-0 pointer-events-none">
              {/* Crimson Backlight (Right side aura matching the car in Fantasy) */}
              <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-l from-[#FF0055]/20 via-[#E60045]/10 to-transparent blur-[140px] opacity-75" />

              {/* Cyan Key Light on Left side */}
              <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[550px] h-[550px] rounded-full bg-gradient-to-r from-brand-blue/25 via-brand-cyan/15 to-transparent blur-[140px] opacity-60" />

              {/* Studio Floor Horizon Perspective Grid */}
              <div
                className="absolute bottom-0 left-0 right-0 h-[40vh] opacity-25"
                style={{
                  backgroundImage:
                    "linear-gradient(to top, rgba(0, 0, 0, 1), transparent 85%), linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
                  backgroundSize: "100% 100%, 72px 72px, 72px 72px",
                  transform: "perspective(600px) rotateX(68deg)",
                  transformOrigin: "bottom center",
                }}
              />
            </div>

            {/* Central Stage: Pure Transparent Cutout of Sakil Grounded at Bottom */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-xl sm:max-w-2xl h-[78vh] sm:h-[84vh] max-h-[820px] flex items-end justify-center z-20 pointer-events-none">
              <motion.img
                initial={{ opacity: 0, scale: 0.88, y: 35 }}
                animate={{
                  opacity: introStep === "bloom" || introStep === "done" ? 1 : 0,
                  scale: introStep === "bloom" || introStep === "done" ? 1 : 0.88,
                  y: introStep === "bloom" || introStep === "done" ? 0 : 35,
                  x: mousePos.x * 12,
                }}
                transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
                src="/images/sakil_cutout.png"
                alt="Sakil Ahammed • Full-Stack AI Automation & Autonomous Operations Architect"
                className="relative z-20 h-full w-auto object-contain object-bottom drop-shadow-[0_25px_60px_rgba(0,0,0,0.95)]"
                style={{
                  maskImage: "linear-gradient(to bottom, black 92%, transparent 100%)",
                  WebkitMaskImage: "linear-gradient(to bottom, black 92%, transparent 100%)",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* ========================================================================= */}
        {/* 4. BOTTOM BAR: Exact Fantasy Clean Layout (Single Statement Left, Arrow)  */}
        {/* ========================================================================= */}
        <footer className="relative z-30 pb-8 sm:pb-10 px-8 sm:px-14 flex items-end justify-between w-full pointer-events-none">
          {/* Bottom Left: Pure Single Statement */}
          <div className="pointer-events-auto">
            <h1 className="text-base sm:text-lg font-normal text-white tracking-normal font-sans">
              Lead by Autonomous Intelligence
            </h1>
          </div>

          {/* Bottom Right: Minimal Scroll Down Arrow */}
          <a
            href="#features"
            className="group p-2 rounded-full hover:bg-white/10 transition-colors duration-300 flex items-center justify-center cursor-pointer pointer-events-auto"
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
    </>
  );
}
