"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Home,
  User,
  Briefcase,
  Layers,
  Award,
  TrendingUp,
  UserCheck,
  BookOpen,
  MessageSquare,
  X,
} from "lucide-react";

interface NavbarProps {
  className?: string;
}

export default function Navbar({ className = "" }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("home");
  const [hoveredNav, setHoveredNav] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Items from Screenshot 2 (Personal Portfolio Structure)
  // "About" is positioned right after "Projects" as requested
  const navItems = [
    { id: "home", label: "Home", href: "#home", icon: Home },
    { id: "features", label: "Features", href: "#features", icon: Briefcase },
    { id: "portfolio", label: "Projects", href: "#portfolio", icon: Layers },
    { id: "about", label: "About", href: "#about", icon: User },
  ];

  const allItemsWithContact = [
    ...navItems,
    { id: "contact", label: "Contact", href: "#contact", icon: MessageSquare },
  ];

  // ScrollSpy & Sticky Background Blur
  useEffect(() => {
    const sections = ["home", "features", "portfolio", "about", "contact"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveNav(sections[i]);
          break;
        }
      }
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. TOP NAVBAR (CUBERTO STYLE ON DESKTOP: LOGO LEFT, ALL LINKS FAR RIGHT)   */}
      {/* ========================================================================= */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/90 backdrop-blur-xl border-b border-white/5 py-3.5 shadow-2xl shadow-black/90"
            : "bg-transparent py-6 sm:py-8"
        } ${className}`}
      >
        <div className="w-full max-w-[1720px] mx-auto px-8 sm:px-14 flex items-center justify-between">
          {/* Brand Logo & Name (Left Side) */}
          <a href="#home" className="flex items-center gap-3.5 group select-none shrink-0">
            <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
              <svg
                className="w-full h-full text-white transition-transform duration-700 group-hover:rotate-90"
                viewBox="0 0 400 400"
                fill="currentColor"
              >
                <path d="M 200 115 C 235 115, 270 90, 295 105 C 320 120, 285 165, 285 200 C 285 235, 320 280, 295 295 C 270 310, 235 285, 200 285 C 165 285, 130 310, 105 295 C 80 280, 115 235, 115 200 C 115 165, 80 120, 105 105 C 130 90, 165 115, 200 115 Z" />
              </svg>
            </div>
            <span className="font-bold tracking-tight text-base sm:text-lg text-white font-mono uppercase">
              SAKIL AHAMMED
            </span>
          </a>

          {/* Desktop Nav Items Grouped on the FAR RIGHT (Exact Cuberto Layout, Screenshot 3) */}
          <div className="hidden lg:flex items-center gap-6 xl:gap-8 shrink-0">
            <nav
              onMouseLeave={() => setHoveredNav(null)}
              className="flex items-center gap-2 xl:gap-3 relative"
            >
              {navItems.map((item) => {
                const isActive = activeNav === item.id;
                const isHovered = hoveredNav === item.id;

                return (
                  <a
                    key={item.id}
                    href={item.href}
                    onMouseEnter={() => setHoveredNav(item.id)}
                    onClick={() => setActiveNav(item.id)}
                    className="group relative px-4 py-2 rounded-full text-[14px] xl:text-[15px] font-semibold tracking-normal select-none transition-all duration-300 cursor-pointer flex items-center justify-center"
                  >
                    {/* CUBERTO SIGNATURE ROUNDED WHITE HOVER PILL ("গোল হয়ে পুরো ক্যাটালগটা হোয়াইট হয়ে যায়") */}
                    {isHovered && (
                      <motion.span
                        layoutId="cuberto-hover-pill"
                        transition={{ type: "spring", stiffness: 450, damping: 32 }}
                        className="absolute inset-0 rounded-full bg-white shadow-xl shadow-white/20 z-0 pointer-events-none"
                      />
                    )}

                    {/* Cuberto Signature Rolling Wave Text (One rolls up and out, another rolls in) */}
                    <span
                      className={`relative z-10 inline-block overflow-hidden h-[22px] leading-[22px] transition-colors duration-200 ${
                        isHovered
                          ? "text-black font-bold"
                          : isActive
                          ? "text-white font-bold drop-shadow-[0_0_12px_rgba(255,255,255,0.7)]"
                          : "text-white/85 hover:text-white"
                      }`}
                    >
                      {/* Primary Text */}
                      <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                        {item.label}
                      </span>
                      {/* Duplicate Rolling Text */}
                      <span
                        className={`absolute top-full left-0 block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full ${
                          isHovered ? "text-black font-bold" : "text-white"
                        }`}
                        aria-hidden="true"
                      >
                        {item.label}
                      </span>
                    </span>

                    {/* THE SELECTED "FUTA" (INDICATOR DOT) IN VIBRANT NEON PINK (#FF0055) */}
                    {isActive && (
                      <motion.span
                        layoutId="cuberto-active-pink-dot"
                        transition={{ type: "spring", stiffness: 450, damping: 30 }}
                        className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#FF0055] shadow-[0_0_14px_#FF0055] z-20 pointer-events-none"
                      />
                    )}
                  </a>
                );
              })}
            </nav>

            {/* Cuberto High-Contrast [ Contacts ] Pill with Rolling Text Wave */}
            <a
              href="#contact"
              onClick={() => setActiveNav("contact")}
              className={`group relative inline-flex items-center justify-center px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer select-none overflow-hidden ${
                activeNav === "contact"
                  ? "bg-[#FF0055] text-white shadow-[0_0_25px_rgba(255,0,85,0.5)]"
                  : "bg-white text-black hover:bg-white/95 hover:shadow-[0_0_25px_rgba(255,255,255,0.35)]"
              }`}
            >
              <span className="relative inline-block overflow-hidden h-[20px] leading-[20px]">
                <span className="block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full">
                  Contacts
                </span>
                <span
                  className="absolute top-full left-0 block transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-full font-bold"
                  aria-hidden="true"
                >
                  Contacts
                </span>
              </span>

              {/* Pink dot if Contacts is selected */}
              {activeNav === "contact" && (
                <motion.span
                  layoutId="cuberto-active-pink-dot"
                  transition={{ type: "spring", stiffness: 450, damping: 30 }}
                  className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_white] z-20 pointer-events-none"
                />
              )}
            </a>
          </div>

          {/* Mobile Menu Toggle Button (< lg) */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white text-xs font-mono uppercase tracking-wider transition-all border border-white/5 active:scale-95 cursor-pointer"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF0055] animate-pulse" />
              <span>Menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. MOBILE MENU DRAWER (EXACT ITEMS & ICON STYLE FROM SCREENSHOT 2)        */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-10 select-none overflow-y-auto lg:hidden"
          >
            {/* Ambient Background Flare */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF0055]/20 rounded-full blur-[100px] pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-blue/20 rounded-full blur-[100px] pointer-events-none" />

            {/* Top Bar inside Mobile Menu */}
            <div className="relative z-10 flex items-center justify-between w-full">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center">
                  <svg className="w-full h-full text-white" viewBox="0 0 400 400" fill="currentColor">
                    <path d="M 200 115 C 235 115, 270 90, 295 105 C 320 120, 285 165, 285 200 C 285 235, 320 280, 295 295 C 270 310, 235 285, 200 285 C 165 285, 130 310, 105 295 C 80 280, 115 235, 115 200 C 115 165, 80 120, 105 105 C 130 90, 165 115, 200 115 Z" />
                  </svg>
                </div>
                <span className="font-bold tracking-tight text-base text-white font-mono uppercase">
                  SAKIL AHAMMED
                </span>
              </div>

              <button
                onClick={() => setIsMobileMenuOpen(false)}
                className="px-4 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-1.5 border border-white/10 active:scale-95 cursor-pointer"
              >
                <span>Close</span>
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Main Menu List (Screenshot 2 Styling with Icons) */}
            <div className="relative z-10 w-full max-w-md mx-auto my-auto py-8">
              <div className="bg-[#15171B]/90 border border-white/10 rounded-2xl p-3 shadow-2xl backdrop-blur-xl space-y-1">
                {allItemsWithContact.map((item, idx) => {
                  const Icon = item.icon;
                  const isActive = activeNav === item.id;
                  return (
                    <motion.a
                      key={item.id}
                      href={item.href}
                      onClick={() => {
                        setActiveNav(item.id);
                        setIsMobileMenuOpen(false);
                      }}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.04, duration: 0.3 }}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                        isActive
                          ? "bg-[#23262D] text-[#FF0055] border border-[#FF0055]/30 shadow-inner"
                          : "text-white/80 hover:text-white hover:bg-white/5"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <Icon
                          className={`w-5 h-5 transition-colors ${
                            isActive ? "text-[#FF0055]" : "text-white/50"
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>

                      {/* Pink Active Indicator on Mobile */}
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-[#FF0055] shadow-[0_0_8px_#FF0055]" />
                      )}
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
