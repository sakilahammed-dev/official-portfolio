"use client";

import { motion } from "framer-motion";
import { BookOpen, ArrowUpRight, Calendar, Clock } from "lucide-react";

export default function BlogSection() {
  const articles = [
    {
      title: "Deterministic Multi-Agent Swarms: Building Zero-Failover Systems",
      category: "AI Architecture",
      readTime: "7 min read",
      date: "Oct 2026",
      summary:
        "Why probabilistic LLM outputs require deterministic validation loops, state machines, and fail-safe recovery logic in enterprise settings.",
    },
    {
      title: "The Death of Fragile Workflows: Event-Driven Agent Orchestration",
      category: "Autonomous Operations",
      readTime: "5 min read",
      date: "Sep 2026",
      summary:
        "Transitioning from brittle linear automation scripts to resilient, event-driven autonomous multi-agent networks using n8n and Python.",
    },
    {
      title: "Sidq & Amanah in High-Throughput Autonomous Machine Intelligence",
      category: "Islamic Tech Ethics",
      readTime: "6 min read",
      date: "Aug 2026",
      summary:
        "How foundational Islamic principles of truthfulness and trust provide the ultimate ethical framework for autonomous software and AI agents.",
    },
  ];

  return (
    <section
      id="blog"
      className="relative w-full bg-[#0B0C0F] text-white pt-24 sm:pt-32 pb-28 px-6 sm:px-12 rounded-t-[36px] sm:rounded-t-[48px] shadow-[0_-24px_60px_rgba(0,0,0,0.22)] border-t border-white/10 z-20 select-none scroll-mt-12"
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/10 font-mono text-xs text-brand-blue uppercase">
            <BookOpen className="w-3.5 h-3.5" />
            <span>// 06 AI RESEARCH &amp; INSIGHTS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white leading-tight">
            Architectural Insights &amp; Research
          </h2>
          <p className="text-base sm:text-lg text-text-secondary font-light">
            Deconstructing cutting-edge autonomous engineering, agent swarms, and enterprise-grade resilience frameworks.
          </p>
        </div>

        {/* 3 Articles Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {articles.map((post, idx) => (
            <motion.article
              key={post.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              className="group p-8 rounded-3xl bg-[#121418] border border-white/10 hover:border-brand-blue/40 transition-all duration-300 flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs font-mono text-text-muted">
                  <span className="text-brand-cyan">{post.category}</span>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3 h-3" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-brand-cyan transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-sm text-text-secondary font-light leading-relaxed">
                  {post.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono">
                <span className="text-text-muted">{post.date}</span>
                <span className="inline-flex items-center gap-1 text-white group-hover:translate-x-1 transition-transform">
                  Read Article <ArrowUpRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
