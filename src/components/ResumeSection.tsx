"use client";

import { motion } from "framer-motion";
import { Award, FileText, Download, CheckCircle2, Terminal, Code2, Server, Database } from "lucide-react";

export default function ResumeSection() {
  const skills = [
    { category: "Autonomous & AI Swarms", items: ["LangChain", "CrewAI", "AutoGen", "Gemini API", "Claude API", "Ollama"] },
    { category: "Workflow Orchestration", items: ["n8n Enterprise", "Python Async", "Headless Browsers", "Event Queues", "Webhook Relays"] },
    { category: "Full-Stack Web Engineering", items: ["Next.js 15", "React 19", "Node.js", "FastAPI", "TypeScript", "Tailwind CSS"] },
    { category: "Data, Cloud & Security", items: ["PostgreSQL", "Vector DBs (Pinecone/Chroma)", "Docker", "Linux Systemd", "Sidq & Amanah"] },
  ];

  const highlights = [
    "Full-Stack AI Automation & Autonomous Operations Architect",
    "Specialized in zero-failover enterprise workflow automation",
    "Pioneering multi-agent collaborative neural taskforce pipelines",
    "Root-cause resilience with deterministic self-healing protocols",
  ];

  return (
    <section id="resume" className="relative w-full bg-[#0B0C0F] text-white py-28 px-6 sm:px-12 border-t border-white/5 select-none">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 font-mono text-xs text-brand-emerald uppercase">
            <Award className="w-3.5 h-3.5" />
            <span>// 04 ARCHITECT CREDENTIALS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Resume &amp; Technical Arsenal
          </h2>
          <p className="text-base sm:text-lg text-text-secondary font-light">
            Comprehensive foundation spanning frontier AI models, resilient distributed orchestration, and high-performance full-stack architectures.
          </p>
        </div>

        {/* Credentials Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Architect Profile & Highlights */}
          <div className="p-8 sm:p-10 rounded-3xl bg-[#121418] border border-white/10 space-y-6 flex flex-col justify-between">
            <div className="space-y-6">
              <div className="space-y-2">
                <span className="font-mono text-xs text-text-muted uppercase tracking-wider">OFFICIAL TITLE</span>
                <h3 className="text-2xl font-bold text-white">Sakil Ahammed</h3>
                <p className="text-sm font-mono text-brand-cyan">
                  Full-Stack AI Automation &amp; Autonomous Operations Architect
                </p>
              </div>

              <div className="space-y-3 pt-4 border-t border-white/5">
                {highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-3 text-xs sm:text-sm text-text-secondary">
                    <CheckCircle2 className="w-4 h-4 text-brand-emerald shrink-0 mt-0.5" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <a
                href="#contact"
                className="w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-white text-black font-semibold text-sm hover:scale-102 active:scale-98 transition-all duration-300 shadow-xl"
              >
                <Download className="w-4 h-4" />
                <span>Request Architecture Blueprint</span>
              </a>
            </div>
          </div>

          {/* Right Column: 4 Skill Blocks */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skills.map((group, idx) => (
              <div
                key={group.category}
                className="p-8 rounded-3xl bg-[#121418] border border-white/10 hover:border-white/20 transition-all space-y-4"
              >
                <span className="font-mono text-xs text-brand-cyan uppercase tracking-wider">
                  0{idx + 1} // {group.category}
                </span>
                <div className="flex flex-wrap gap-2 pt-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/5 text-xs font-mono text-white/90 hover:border-white/20 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
