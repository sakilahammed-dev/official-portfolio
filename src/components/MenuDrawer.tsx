"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowUpRight, Github, Linkedin, Mail, Twitter, Globe, Send } from "lucide-react";

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MenuDrawer({ isOpen, onClose }: MenuDrawerProps) {
  // World-class personal portfolio navigation links
  const links = [
    { tag: "01", label: "Home", href: "#home", desc: "Index & Aperture Stage" },
    { tag: "02", label: "About", href: "#about", desc: "Story & Core Superpowers" },
    { tag: "03", label: "Works", href: "#projects", desc: "Autonomous Systems & Case Studies" },
    { tag: "04", label: "Skills", href: "#skills", desc: "AI, Automation & Tech Stack" },
    { tag: "05", label: "Contact", href: "#contact", desc: "Get In Touch & Consultations" },
  ];

  const socials = [
    { name: "GitHub", href: "https://github.com", icon: Github },
    { name: "LinkedIn", href: "https://linkedin.com", icon: Linkedin },
    { name: "Twitter / X", href: "https://x.com", icon: Twitter },
    { name: "Email", href: "mailto:sakil.ahammed.dev@gmail.com", icon: Mail },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-2xl flex flex-col justify-between p-6 sm:p-12 md:p-16 select-none overflow-y-auto"
        >
          {/* Subtle Ambient Background Gradient Flares */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FF0055]/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-blue/15 rounded-full blur-[140px] pointer-events-none" />

          {/* 1. TOP HEADER INSIDE MENU */}
          <div className="relative z-10 flex items-center justify-between w-full max-w-6xl mx-auto">
            {/* Brand Logo & Name Matching Hero */}
            <div className="flex items-center gap-3.5">
              <div className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center">
                <svg
                  className="w-full h-full text-white"
                  viewBox="0 0 400 400"
                  fill="currentColor"
                >
                  <path d="M 200 115 C 235 115, 270 90, 295 105 C 320 120, 285 165, 285 200 C 285 235, 320 280, 295 295 C 270 310, 235 285, 200 285 C 165 285, 130 310, 105 295 C 80 280, 115 235, 115 200 C 115 165, 80 120, 105 105 C 130 90, 165 115, 200 115 Z" />
                </svg>
              </div>
              <span className="font-bold tracking-tight text-base sm:text-lg text-white font-mono uppercase">
                SAKIL AHAMMED
              </span>
            </div>

            {/* Close Pill Button */}
            <button
              onClick={onClose}
              className="px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs uppercase tracking-wider font-semibold transition-all flex items-center gap-2 border border-white/10 active:scale-95 cursor-pointer"
            >
              <span>Close</span>
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* 2. MAIN PERSONAL PORTFOLIO NAVIGATION */}
          <div className="relative z-10 max-w-6xl mx-auto w-full my-auto py-10 sm:py-14">
            <div className="text-[11px] font-mono tracking-widest uppercase text-white/40 mb-6 sm:mb-8">
              // NAVIGATION
            </div>

            <ul className="space-y-4 sm:space-y-6">
              {links.map((link, idx) => (
                <motion.li
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.07, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={link.href}
                    onClick={onClose}
                    className="group flex flex-col sm:flex-row sm:items-baseline justify-between border-b border-white/10 pb-4 sm:pb-6 text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white/70 hover:text-white transition-all duration-300"
                  >
                    <div className="flex items-baseline gap-4 sm:gap-6 group-hover:translate-x-2 transition-transform duration-300">
                      <span className="font-mono text-xs sm:text-sm text-white/40 group-hover:text-[#FF0055] transition-colors">
                        {link.tag}
                      </span>
                      <span className="group-hover:text-white transition-colors">
                        {link.label}
                      </span>
                      <span className="hidden md:inline-block text-xs font-mono text-white/30 group-hover:text-white/60 tracking-normal font-normal pl-2 transition-colors">
                        — {link.desc}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 mt-2 sm:mt-0 opacity-40 group-hover:opacity-100 transition-opacity">
                      <span className="text-xs font-mono tracking-wider uppercase text-white/60 hidden sm:inline-block">
                        View
                      </span>
                      <ArrowUpRight className="w-6 h-6 sm:w-8 sm:h-8 text-white/40 group-hover:text-[#FF0055] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300" />
                    </div>
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* 3. BOTTOM FOOTER & SOCIAL CONNECTIVITY */}
          <div className="relative z-10 max-w-6xl mx-auto w-full pt-8 border-t border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 text-xs font-mono text-white/60">
            {/* Location & Status */}
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-white">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-medium tracking-wide">DHAKA, BANGLADESH • AVAILABLE WORLDWIDE</span>
              </div>
              <p className="text-[11px] text-white/40">
                Full-Stack AI Automation &amp; Autonomous Operations Architect
              </p>
            </div>

            {/* Direct Social Links */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-white/60 hover:text-white transition-colors duration-200"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    <span>{social.name}</span>
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
