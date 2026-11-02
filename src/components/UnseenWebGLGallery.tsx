"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  ExternalLink,
  Github,
  Globe,
  Layers,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";

interface ArchitecturalModule {
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
}

interface WorkflowStep {
  step: string;
  title: string;
  desc: string;
}

interface ProjectDetails {
  tagline?: string;
  overview: string;
  vision?: string;
  challenge: string;
  solution: string;
  keyFeatures: string[];
  techStack: string[];
  metrics?: { label: string; value: string }[];
  modules?: ArchitecturalModule[];
  workflow?: WorkflowStep[];
}

interface ProjectItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  media: string;
  posterImage: string;
  isVideo: boolean;
  filterType: "ai-automation" | "website" | "app" | "motion-video" | "business-solver";
  liveUrl?: string;
  githubUrl?: string;
  badge?: string;
  details?: ProjectDetails;
}

const flagshipProjects: ProjectItem[] = [
  {
    id: "unnoto-khabar",
    number: "01",
    title: "Unnoto Khabar (উন্নত খাবার)",
    subtitle: "Full-Stack Pure Food D2C Platform & 1-Click Order Engine",
    category: "Full-Stack Web & E-Commerce",
    description: "High-performance direct-to-consumer organic pure food platform engineered with Next.js 16, Prisma ORM, and frictionless 1-click checkout architecture.",
    media: "/images/projects/unnoto_khabar_showcase.png",
    posterImage: "/images/projects/unnoto_khabar_showcase.png",
    isVideo: false,
    filterType: "website",
    badge: "Official Production System",
    liveUrl: "http://localhost:3000",
    githubUrl: "https://github.com/sakilahammed-dev/unnoto-khabar",
    details: {
      tagline: "স্বাস্থ্যসম্মত ও বিশুদ্ধ খাদ্য নিশ্চিতকরণে আধুনিক ফুল-স্ট্যাক ই-কমার্স ইকোসিস্টেম",
      overview: "উন্নত খাবার (Unnoto Khabar) হলো বাংলাদেশের মানুষের কাছে ভেজালমুক্ত খাঁটি ও অর্গানিক খাদ্যপণ্য পৌঁছে দেওয়ার জন্য শাকিল আহাম্মেদ দ্বারা গ্রাউন্ড-আপ থেকে ডিজাইন ও ডেভেলপ করা একটি পূর্ণাঙ্গ ফুল-স্ট্যাক ই-কমার্স প্ল্যাটফর্ম। এটি প্রচলিত জটিল অনলাইন শপিংয়ের বিকল্প হিসেবে নির্মিত, যেখানে কোনো অপ্রয়োজনীয় অ্যাকাউন্ট রেজিস্ট্রেশন বা পাসওয়ার্ডের ঝামেলা ছাড়াই যে কেউ মাত্র এক ক্লিকে ক্যাশ অন ডেলিভারিতে অর্ডার করতে পারেন।",
      vision: "বাংলাদেশে আধুনিক কৃষিপণ্য ও গ্রামীণ খাঁটি খাদ্যসামগ্রীকে সরাসরি ক্রেতার দোরগোড়ায় পৌঁছে দেওয়ার ক্ষেত্রে আস্থার সংকট দূর করা এবং সুপার-ফাস্ট ডিজিটাল আর্কিটেকচারের মাধ্যমে একটি স্বয়ংসম্পূর্ণ নিরাপদ খাদ্য সরবরাহ বলয় গড়ে তোলা।",
      challenge: "সাধারণ ই-কমার্স প্ল্যাটফর্মে অতিরিক্ত স্টেপযুক্ত চেকআউট ফানেল (যেমন: ওটিপি ভেরিফিকেশন, প্রোফাইল ক্রিয়েশন ও জটিল ফর্ম ফিলিং)-এর কারণে প্রায় ৬৮% এর বেশি গ্রাহক মাঝপথেই কার্ট ছেড়ে চলে যায়। এছাড়া ধীরগতির পেজ লোড এবং অস্বচ্ছ ডেলিভারি ট্র্যাকিংয়ের ফলে অর্গানিক ফুড সার্ভিসে গ্রাহকের আস্থার সংকট তৈরি হয়।",
      solution: "Next.js অ্যাপ রাউটার এবং আধুনিক সার্ভার কম্পোনেন্টস আর্কিটেকচার ব্যবহার করে সাব-সেকেন্ড পেজ লোড নিশ্চিত করা হয়েছে। ১-ক্লিক এক্সপ্রেস চেকআউট মডেল, রিয়েল-টাইম ডেলিভারি ক্যালকুলেশন এবং সেলফ-হিলিং প্রিজমা ডেটাবেজ ম্যানেজমেন্ট দিয়ে একটি বিরামহীন ও অত্যন্ত দ্রুতগতির গ্রাহক অভিজ্ঞতা গড়ে তোলা হয়েছে।",
      metrics: [
        { label: "Checkout Time", value: "< 5 Seconds" },
        { label: "Core Web Vitals", value: "98+ Performance" },
        { label: "Architecture", value: "Next.js App Router" },
        { label: "DB Latency", value: "< 15ms (Prisma)" },
        { label: "Cart Drop Reduction", value: "-42% Churn" },
        { label: "Mobile Optimization", value: "100% PWA Ready" }
      ],
      keyFeatures: [
        "১-ক্লিক এক্সপ্রেস চেকআউট ফানেল (Frictionless Quick-Order Modal)",
        "রিয়েল-টাইম লাইভ অর্ডার ট্র্যাকিং ও ৪-ধাপের ডেলিভারি স্টেট মেশিন",
        "ওজন ও ভ্যারিয়েশন ভিত্তিক স্বয়ংক্রিয় প্রাইসিং ও রিয়েলটাইম কার্ট ড্রয়ার",
        "সেন্ট্রাল অ্যাডমিন অপারেশনাল ড্যাশবোর্ড ও ইনভেন্টরি স্টক কন্ট্রোল",
        "মোবাইল-ফার্স্ট রেসপনসিভ আর্কিটেকচার ও আল্ট্রা-ফাস্ট পেজ রেসপন্স",
        "কাস্টমার রিভিউ ও সোশ্যাল প্রুফ ট্রাস্ট ইঞ্জিন",
        "স্বয়ংক্রিয় কুরিয়ার ফি ক্যালকুলেটর (ঢাকা সিটি ৳৭০ / ঢাকার বাইরে ৳১৩০)",
        "টাইপ-সেফ প্রিজমা ওআরএম ও রিলেশনাল ডেটাবেজ আর্কিটেকচার"
      ],
      modules: [
        {
          title: "১-ক্লিক এক্সপ্রেস চেকআউট ইঞ্জিন",
          subtitle: "Frictionless Instant Checkout Modal",
          description: "কোনো সাইন-আপ, ওটিপি বা পাসওয়ার্ড মনে রাখার প্রয়োজন নেই। শুধু নাম, ফোন নাম্বার এবং ঠিকানা দিলেই তাৎক্ষণিক ক্যাশ অন ডেলিভারি অর্ডার প্রস্তুত হয়ে যায়।",
          highlights: [
            "জিরো-ফ্রিকশন ৩-ফিল্ড চেকআউট ফানেল",
            "অটোমেটিক ঢাকা ও ঢাকার বাইরের কুরিয়ার ফি গণনা",
            "কুপন কোড ও ইনস্ট্যান্ট ডিসকাউন্ট রিক্যালকুলেশন"
          ]
        },
        {
          title: "রিয়েল-টাইম লাইভ অর্ডার ট্র্যাকার",
          subtitle: "Dedicated /track Pipeline & State Machine",
          description: "গ্রাহক তার মোবাইল নাম্বার অথবা অর্ডার আইডি ইনপুট করে মুহূর্তের মধ্যে অর্ডারের লাইভ অগ্রগতি ট্র্যাক করতে পারেন।",
          highlights: [
            "৪-ধাপের ভিজ্যুয়াল পাইপলাইন (অর্ডার গৃহীত > প্যাকিং > কুরিয়ার > ডেলিভার্ড)",
            "স্বচ্ছ ডেলিভারি টাইমলাইন ও কুরিয়ার পার্টনার স্ট্যাটাস",
            "গ্রাহকের আস্থাবৃদ্ধিতে লাইভ হেল্পলাইন ইন্টিগ্রেশন"
          ]
        },
        {
          title: "ইন্টেলিজেন্ট কার্ট ও ভ্যারিয়েশন প্রাইসিং",
          subtitle: "Dynamic Tiered Weight & Variation Engine",
          description: "পণ্যভেদে ওজন ও সাইজ পরিবর্তনের সাথে সাথে রিয়েল-টাইমে প্রাইস আপডেট হয় (যেমন: খাঁটি মধু বা ঘিয়ে ১ কেজি, ৫০০ গ্রাম, ২৫০ গ্রাম)।",
          highlights: [
            "স্লাইড-ইন কার্ট ড্রয়ার ও ফ্লোটিং কার্ট ট্রিগার ট্যাব",
            "ভ্যারিয়েশন ভিত্তিক স্টক লিমিট ও স্বয়ংক্রিয় সাবটোটাল ক্যালকুলেশন",
            "লোকাল স্টোরেজ সিনক্রোনাইজেশন ও কার্ট পারসিস্টেন্স"
          ]
        },
        {
          title: "সেন্ট্রাল অ্যাডমিন অপারেশনাল ড্যাশবোর্ড",
          subtitle: "Executive Operations & Inventory Control (/admin)",
          description: "ব্যবসার সার্বিক অপারেশন পরিচালনার জন্য নির্মিত পূর্ণাঙ্গ অ্যাডমিন কন্ট্রোল সেন্টার।",
          highlights: [
            "রিয়েল-টাইম সেলস রেভিনিউ, আজকের অর্ডার ও ট্রানজ্যাকশন মেট্রিক্স",
            "১-ক্লিকে অর্ডার স্ট্যাটাস ট্রানজিশন ও ফিল্টারিং",
            "ইনভেন্টরি স্টক অ্যালার্ট ও প্রোডাক্ট ক্যাটালগ ম্যানেজমেন্ট"
          ]
        },
        {
          title: "ফুল-স্ট্যাক রিলেশনাল ডেটাবেজ ও প্রিজমা ওআরএম",
          subtitle: "Type-Safe High-Performance Data Layer",
          description: "প্রিজমা ওআরএম ব্যবহারের মাধ্যমে টাইপ-সেফ কুয়েরি এবং রিলেশনাল মডেলের নিরাপত্তা নিশ্চিত করা হয়েছে।",
          highlights: [
            "নর্মালাইজড রিলেশনাল স্কিমা (Order, OrderItem, Product, Customer)",
            "সাব-১৫ মিলিসেকেন্ড আল্ট্রা-ফাস্ট কোয়েরি এক্সিকিউশন",
            "ক্লাউড ডেটাবেজ ও ব্যাকআপ রেপ্লিকেশন রেডি"
          ]
        },
        {
          title: "সার্ভার অ্যাকশনস ও সিকিউরিটি আর্কিটেকচার",
          subtitle: "Next.js 16 Server Components & Data Integrity",
          description: "ক্লায়েন্ট সাইডের কোনো সেনসিটিভ লজিক এক্সপোজ না করে সম্পূর্ণ সার্ভার অ্যাকশনসের মাধ্যমে অর্ডার প্রসেসিং সম্পন্ন হয়।",
          highlights: [
            "কড়া ইনপুট স্যানিটাইজেশন ও স্প্যাম অর্ডার প্রিভেনশন",
            "জিরো লেআউট শিফট (CLS: 0) ও অপ্টিমাইজড ইমেজ অ্যাসেটস",
            "ক্লাউডফ্লেয়ার ওয়ার্কার্স ও এজ-রেডি রেসপন্সিভনেস"
          ]
        }
      ],
      workflow: [
        {
          step: "০১",
          title: "পণ্য নির্বাচন ও কার্ট সংযোজন",
          desc: "গ্রাহক ক্যাটালগ থেকে পছন্দমতো ভ্যারিয়েশন নির্বাচন করে ১-ক্লিক অর্ডার বা কার্টে যুক্ত করেন।"
        },
        {
          step: "০২",
          title: "১-ক্লিক এক্সপ্রেস চেকআউট",
          desc: "নাম, ফোন ও ডেলিভারি এরিয়া সিলেক্ট করতেই সিস্টেম স্বয়ংক্রিয়ভাবে কুরিয়ার ফি যোগ করে মোট বিল দেখায়।"
        },
        {
          step: "০৩",
          title: "সার্ভার অ্যাকশন ও ডেটাবেজ ট্রানজ্যাকশন",
          desc: "Next.js সার্ভার অ্যাকশনের মাধ্যমে ডেটা ভ্যালিডেট হয়ে প্রিজমা ডেটাবেজে ইউনিক অর্ডার ক্রিয়েট হয়।"
        },
        {
          step: "০৪",
          title: "লাইভ ট্র্যাকিং ও অ্যাডমিন নোটিফিকেশন",
          desc: "গ্রাহক সরাসরি ট্র্যাকিং স্ক্রিনে চলে যান এবং অ্যাডমিন ড্যাশবোর্ডে নতুন অর্ডারের লাইভ সিঙ্ক সম্পন্ন হয়।"
        }
      ],
      techStack: [
        "Next.js 16 (App Router)",
        "React 19",
        "TypeScript",
        "Tailwind CSS v4",
        "Prisma ORM",
        "SQLite / PostgreSQL",
        "Bun Engine",
        "Cloudflare Workers / OpenNext",
        "Lucide Icons"
      ]
    }
  },
  {
    id: "amanat-os",
    number: "02",
    title: "Amanat OS",
    subtitle: "Autonomous Business Workflow OS, Immersive AI",
    category: "AI Automation",
    description: "Deterministic, self-healing multi-agent workflow architecture orchestrating complex enterprise processes.",
    media: "/images/projects/sov_1-1024x538.jpg",
    posterImage: "/images/projects/sov_1-1024x538.jpg",
    isVideo: false,
    filterType: "ai-automation",
    details: {
      tagline: "Autonomous Multi-Agent Enterprise Orchestration Platform",
      overview: "Amanat OS bridges disparate enterprise silos into deterministic, self-healing automated workflows driven by autonomous AI agent fleets.",
      challenge: "Legacy automation scripts break on edge cases, lack contextual recovery, and demand continuous human supervision.",
      solution: "Engineered an event-driven multi-agent consensus kernel with rollback checkpoints and zero-touch exception handling.",
      keyFeatures: [
        "Self-healing agent runtime with automated failure recovery",
        "Deterministic workflow state machines with verifiable audit logs",
        "Sub-100ms distributed task dispatch across cloud workers",
        "Enterprise-grade security boundaries and access controls"
      ],
      techStack: [
        "Python",
        "FastAPI",
        "TypeScript",
        "Redis",
        "Docker",
        "Agentic LLM Architectures"
      ],
      metrics: [
        { label: "Recovery Rate", value: "99.4%" },
        { label: "Manual Touch Reduction", value: "85%" },
        { label: "Throughput", value: "10k+ Tasks/min" }
      ]
    }
  },
  {
    id: "titan-web",
    number: "03",
    title: "Titan Web Platform",
    subtitle: "High-Performance Autonomous Web Engine, 60 FPS",
    category: "Website & Platform",
    description: "Next-generation web application architecture with sub-millisecond interaction latency and fluid 3D experiences.",
    media: "/videos/project_web_titan_crop.mp4",
    posterImage: "/images/projects/titan_web-1024x538.jpg",
    isVideo: true,
    filterType: "website",
    details: {
      tagline: "Ultra-Responsive Web Engine for Complex Interactive Experiences",
      overview: "Titan Web Platform delivers native-speed interactive 3D web applications with seamless 60 FPS rendering and minimal memory footprints.",
      challenge: "Heavy 3D graphics and complex client-side applications frequently cause jank, high battery drain, and poor mobile performance.",
      solution: "Implemented WebGL shader pipeline optimization, GPU instancing, and off-main-thread compute workers.",
      keyFeatures: [
        "Custom WebGL/Three.js shader pipelines with adaptive LOD",
        "Sub-millisecond input handling and frame pacing",
        "Zero-layout-shift asset streaming architecture",
        "Seamless cross-platform mobile GPU compatibility"
      ],
      techStack: [
        "Next.js",
        "TypeScript",
        "Three.js / WebGL",
        "GLSL Shaders",
        "Tailwind CSS"
      ],
      metrics: [
        { label: "Frame Rate", value: "60 FPS Constant" },
        { label: "Memory Footprint", value: "< 45 MB" },
        { label: "LCP", value: "0.8s" }
      ]
    }
  },
  {
    id: "hyperframe-motion",
    number: "04",
    title: "Hyperframe Engine",
    subtitle: "Algorithmic Motion Synthesis & Dynamic Media",
    category: "Motion & Film",
    description: "Cloud-native deterministic video composition pipeline converting real-time data into cinema-grade visual stories.",
    media: "/videos/project_hyperframe_demo.mp4",
    posterImage: "/images/projects/hyperframe_engine-1024x538.jpg",
    isVideo: true,
    filterType: "motion-video",
    details: {
      tagline: "Programmatic Video Generation & Motion Synthesis",
      overview: "Hyperframe Engine converts programmatic data streams into cinema-grade video assets using code-driven animation templates.",
      challenge: "Traditional video editing is manual, slow, and cannot scale dynamically for personalized media production.",
      solution: "Created a headless browser rendering farm with frame-accurate audio sync and dynamic motion graphics composition.",
      keyFeatures: [
        "Deterministic frame-by-frame rendering with FFmpeg acceleration",
        "Dynamic typography and generative motion graphics",
        "Cloud-native parallel video synthesis pipeline",
        "Audio ducking and dynamic waveform synchronization"
      ],
      techStack: [
        "Remotion / HyperFrames",
        "Node.js",
        "FFmpeg",
        "GSAP",
        "Web Audio API"
      ],
      metrics: [
        { label: "Render Speed", value: "4x Realtime" },
        { label: "Resolution", value: "4K 60FPS" },
        { label: "Automation", value: "100% Headless" }
      ]
    }
  },
  {
    id: "sentinel-analytics",
    number: "05",
    title: "Sentinel Intelligence",
    subtitle: "Predictive Enterprise Operations & Anomaly Resolver",
    category: "Business Problem Solver",
    description: "Autonomous diagnostic engine converting opaque data streams into root-cause solutions and automated remediation.",
    media: "/videos/project_promax_showcase.mp4",
    posterImage: "/images/projects/sentinel_analytics-1024x538.jpg",
    isVideo: true,
    filterType: "business-solver",
  },
  {
    id: "omni-connect",
    number: "06",
    title: "OmniConnect Mobile",
    subtitle: "Real-Time Distributed Operations Hub, Cross-Platform",
    category: "Mobile App",
    description: "Unified cross-platform operations center empowering field engineers with instantaneous telemetry and secure edge execution.",
    media: "/images/projects/25res-1024x538.jpg",
    posterImage: "/images/projects/25res-1024x538.jpg",
    isVideo: false,
    filterType: "app",
  },
  {
    id: "cortex-workflow",
    number: "07",
    title: "Cortex AutoPilot",
    subtitle: "Neural Workflow Orchestrator & Self-Evolving Pipelines",
    category: "AI Automation",
    description: "Self-optimizing autonomous agent fleet capable of continuous reflection, tool synthesis, and zero-touch operations.",
    media: "/images/projects/hubtown_unseen-1024x538.jpg",
    posterImage: "/images/projects/hubtown_unseen-1024x538.jpg",
    isVideo: false,
    filterType: "ai-automation",
  },
  {
    id: "lumina-visuals",
    number: "08",
    title: "Lumina Brand Identity",
    subtitle: "Dynamic Generative Aesthetics & Motion System",
    category: "Motion & Film",
    description: "Parametric brand design system translating algorithmic physics into bespoke visual narratives and broadcast motion.",
    media: "/images/projects/klook2-1024x538.jpg",
    posterImage: "/images/projects/klook2-1024x538.jpg",
    isVideo: false,
    filterType: "motion-video",
  },
  {
    id: "apex-commerce",
    number: "09",
    title: "Apex Cloud Infrastructure",
    subtitle: "Scalable Micro-Frontend Architecture, Global CDN",
    category: "Website & Platform",
    description: "Enterprise multi-tenant digital platform built for millions of concurrent interactions with flawless resilience.",
    media: "/images/projects/Frame-29-1024x538.jpg",
    posterImage: "/images/projects/Frame-29-1024x538.jpg",
    isVideo: false,
    filterType: "website",
  },
  {
    id: "clarity-bi",
    number: "10",
    title: "Clarity Decision Engine",
    subtitle: "Executive Strategic Modeling & Scenario Simulator",
    category: "Business Problem Solver",
    description: "Monte Carlo predictive modeling tool enabling boardroom executives to stress-test complex market transformations.",
    media: "/images/projects/Frame-1000004051-1024x538.jpg",
    posterImage: "/images/projects/Frame-1000004051-1024x538.jpg",
    isVideo: false,
    filterType: "business-solver",
  },
  {
    id: "neural-voice",
    number: "11",
    title: "Aura Neural Voice",
    subtitle: "Sub-200ms Conversational Agent & Telephony Backbone",
    category: "AI Automation",
    description: "Ultra-low latency bidirectional neural voice interface integrated with telephony and CRM systems.",
    media: "/images/projects/poly-1024x538.jpg",
    posterImage: "/images/projects/poly-1024x538.jpg",
    isVideo: false,
    filterType: "ai-automation",
  },
];

// =========================================================================
// UNSEEN STUDIO GLSL SHADERS (REVERSE-ENGINEERED)
// =========================================================================
const vertexShader = `
  varying vec2 vUv;
  varying vec3 vWorldPos;
  varying float zPos;

  uniform float u_time;
  uniform vec2 u_bendPoint;
  uniform float u_heightOffset;

  void main() {
    vUv = uv;
    vec4 worldPosition = modelMatrix * vec4(position, 1.0);
    vWorldPos = worldPosition.xyz;

    vec3 transformed = position;

    // Organic wave ripple
    float ripple = sin((vWorldPos.x - vWorldPos.y) * 0.012 - u_time * 1.5) * 6.0;
    transformed.z += ripple;

    // Cylindrical bend over top horizon:
    // Vertices above bendPoint.x smoothly bend backward along the cylinder
    float bend = smoothstep(u_bendPoint.x, u_bendPoint.y, vWorldPos.y);
    transformed.z -= 1150.0 * bend;
    transformed.y -= 1.35 * bend * u_heightOffset;

    zPos = transformed.z;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
  }
`;

const fragmentShader = `
  varying vec2 vUv;
  varying vec3 vWorldPos;

  uniform sampler2D uTexture;
  uniform vec3 fogColor;
  uniform float fogNear;
  uniform float fogFar;
  uniform float u_opacity;
  uniform vec2 u_resolution;
  uniform float u_radius;

  // Signed distance function for smooth anti-aliased rounded box corners (Cuberto cards)
  float roundedBoxSDF(vec2 centerPos, vec2 size, float radius) {
    vec2 q = abs(centerPos) - size + vec2(radius);
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - radius;
  }

  void main() {
    // Anti-aliased rounded corner mask
    float cornerAlpha = 1.0;
    if (u_radius > 0.0) {
      vec2 p = (vUv - 0.5) * u_resolution;
      float d = roundedBoxSDF(p, u_resolution * 0.5, u_radius);
      cornerAlpha = 1.0 - smoothstep(0.0, 1.5, d);
    }

    vec4 texColor = texture2D(uTexture, vUv);
    
    // Depth fog calculation
    float depth = gl_FragCoord.z / gl_FragCoord.w;
    float fogFactor = smoothstep(fogNear, fogFar, depth);

    // Warm stone / pure white atmosphere fog mixing
    vec3 finalRgb = mix(texColor.rgb, fogColor, fogFactor);

    // Smooth vanishing as it curves over horizon into deep space
    float alpha = texColor.a * cornerAlpha * smoothstep(1950.0, 1150.0, depth) * u_opacity;

    gl_FragColor = vec4(finalRgb, alpha);
  }
`;

function createTextTexture(title: string, subtitle: string) {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 110;
  const ctx = canvas.getContext("2d");
  if (!ctx) return new THREE.CanvasTexture(canvas);

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Title (Clean dark display typography supporting English & Bengali)
  ctx.fillStyle = "#111111";
  ctx.font = '600 34px "Neue Montreal", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans Bengali", "Kalpurush", sans-serif';
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(title, 0, 8);

  // Subtitle / Category
  ctx.fillStyle = "#666666";
  ctx.font = '400 22px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Noto Sans Bengali", sans-serif';
  ctx.fillText(subtitle, 0, 56);

  // Arrow ↗
  ctx.fillStyle = "#111111";
  ctx.font = 'bold 36px sans-serif';
  ctx.textAlign = "right";
  ctx.fillText("↗", canvas.width - 12, 12);

  const texture = new THREE.CanvasTexture(canvas);
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  return texture;
}

export default function UnseenWebGLGallery() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: -200, y: -200 });
  const [isHovered, setIsHovered] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [layoutKey, setLayoutKey] = useState(0);

  // Lock background scroll and pause Lenis while project case study modal is open
  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
      if (typeof window !== "undefined" && (window as any).lenis) {
        (window as any).lenis.stop();
      }
    } else {
      document.body.style.overflow = "";
      if (typeof window !== "undefined" && (window as any).lenis) {
        (window as any).lenis.start();
      }
    }
    return () => {
      document.body.style.overflow = "";
      if (typeof window !== "undefined" && (window as any).lenis) {
        (window as any).lenis.start();
      }
    };
  }, [selectedProject]);

  useEffect(() => {
    // On mobile devices (< 768px), we use the native high-performance responsive mobile feed.
    // This eliminates heavy WebGL memory, prevents GPU context drops, and guarantees a 100% flawless mobile experience.
    if (window.innerWidth < 768) {
      const handleMobileResize = () => {
        if (window.innerWidth >= 768) {
          setLayoutKey((k) => k + 1);
        }
      };
      window.addEventListener("resize", handleMobileResize);
      return () => window.removeEventListener("resize", handleMobileResize);
    }

    const canvas = canvasRef.current;
    const section = sectionRef.current;
    if (!canvas || !section) return;

    let animId: number;
    let renderer: THREE.WebGLRenderer;
    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;

    const clock = new THREE.Clock();
    const stoneColor = new THREE.Color("#FFFFFF");

    const width = window.innerWidth;
    const height = window.innerHeight;

    // 1. Renderer Setup with sRGB color space for crystal-clear visuals
    renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false);
    renderer.setClearColor(stoneColor, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Gracefully handle GPU / WebGL context lost to prevent browser tab crash (SIGILL)
    const onContextLost = (event: Event) => {
      event.preventDefault();
      console.warn("WebGL context lost. Gracefully preventing crash.");
    };
    canvas.addEventListener("webglcontextlost", onContextLost, false);

    // 2. Scene & Fog Setup (Matching Features pure white)
    scene = new THREE.Scene();
    scene.fog = new THREE.Fog(stoneColor, 800, 2600);

    // 3. Camera Setup
    camera = new THREE.PerspectiveCamera(50, width / height, 10, 5000);
    camera.position.set(0, 0, 1000);

    // 4. Projects Master Group
    const projectsGroup = new THREE.Group();
    scene.add(projectsGroup);

    const isMobile = width < 768;
    const cols = isMobile ? 1 : 2;
    // MUCH BIGGER CARDS: Desktop fills 42% of width (up to 620px), Mobile fills width - 32px
    const cardW = isMobile ? Math.min(width - 32, 420) : Math.min(620, Math.floor(width * 0.42));
    const cardH = Math.round(cardW * (10 / 16));
    const gapX = isMobile ? 0 : 64;
    const gapY = isMobile ? 64 : 88;
    const textH = isMobile ? 44 : 50;
    const rowH = cardH + textH + gapY;

    const activeProjects = flagshipProjects;

    const timeUniform = { value: 0 };
    // In camera space (Z=1000, FOV=50), screen top is ~ +466.
    // Bend starts at +180 (well above resting card top ~+130) and completes at +520.
    // Result: Cards are 100% FLAT, straight, uncropped and crystal clear at rest!
    const bendPoint = new THREE.Vector2(180, 520);

    const cardGeometry = new THREE.PlaneGeometry(cardW, cardH, 24, 24);
    const textGeometry = new THREE.PlaneGeometry(cardW, textH, 16, 8);

    const texturesToDispose: THREE.Texture[] = [];
    const interactiveMeshes: THREE.Mesh[] = [];
    const textureLoader = new THREE.TextureLoader();

    activeProjects.forEach((proj, index) => {
      const cardGroup = new THREE.Group();
      cardGroup.userData = { project: proj };

      // High-performance, crash-free texture loading (eliminates Skia GPU mailbox SIGILL crash)
      const textureSource = proj.posterImage || proj.media;
      const mediaTexture = textureLoader.load(textureSource);
      mediaTexture.colorSpace = THREE.SRGBColorSpace;
      mediaTexture.minFilter = THREE.LinearFilter;
      mediaTexture.magFilter = THREE.LinearFilter;
      mediaTexture.generateMipmaps = true;
      texturesToDispose.push(mediaTexture);

      const cardMaterial = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTexture: { value: mediaTexture },
          fogColor: { value: stoneColor },
          fogNear: { value: 600 },
          fogFar: { value: 1900 },
          u_time: timeUniform,
          u_bendPoint: { value: bendPoint },
          u_heightOffset: { value: 1.0 },
          u_opacity: { value: 1.0 },
          u_resolution: { value: new THREE.Vector2(cardW, cardH) },
          u_radius: { value: isMobile ? 24.0 : 36.0 },
        },
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      });

      const mediaMesh = new THREE.Mesh(cardGeometry, cardMaterial);
      mediaMesh.userData = { project: proj, parentGroup: cardGroup };
      interactiveMeshes.push(mediaMesh);
      cardGroup.add(mediaMesh);

      const textTexture = createTextTexture(proj.title, proj.subtitle);
      texturesToDispose.push(textTexture);
      const textMaterial = new THREE.ShaderMaterial({
        vertexShader,
        fragmentShader,
        uniforms: {
          uTexture: { value: textTexture },
          fogColor: { value: stoneColor },
          fogNear: { value: 600 },
          fogFar: { value: 1900 },
          u_time: timeUniform,
          u_bendPoint: { value: bendPoint },
          u_heightOffset: { value: 0.2 },
          u_opacity: { value: 1.0 },
          u_resolution: { value: new THREE.Vector2(cardW, textH) },
          u_radius: { value: 0.0 },
        },
        transparent: true,
        depthWrite: false,
        side: THREE.DoubleSide,
      });

      const textMesh = new THREE.Mesh(textGeometry, textMaterial);
      textMesh.position.set(0, -cardH / 2 - textH / 2 - 14, 0);
      cardGroup.add(textMesh);

      const colIndex = index % cols;
      const rowIndex = Math.floor(index / cols);

      // Cuberto signature staggered layout: Column 2 starts slightly lower than Column 1
      const colOffset = !isMobile && colIndex === 1 ? -110 : 0;
      const posX = cols === 1 ? 0 : (colIndex === 0 ? -1 : 1) * (cardW / 2 + gapX / 2);
      const posY = (isMobile ? -rowIndex * rowH - 40 : -rowIndex * rowH - 60) + colOffset;

      cardGroup.position.set(posX, posY, 0);
      projectsGroup.add(cardGroup);
    });

    // Exact max scroll computation:
    // Ensures the final row of cards arrives in the comfortable viewing sweet spot
    // exactly when scroll progress hits 100%, without any dead/empty void!
    const lastRowIndex = Math.floor((activeProjects.length - 1) / cols);
    const maxScroll = isMobile 
      ? lastRowIndex * rowH + 40
      : lastRowIndex * rowH + 90;

    // Direct frame-level scroll synchronization
    let currentScroll = 0;
    let targetScroll = 0;

    let lastIsMobile = isMobile;
    const onResize = () => {
      if (!canvas || !renderer || !camera) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);

      const nowMobile = w < 768;
      if (nowMobile !== lastIsMobile) {
        lastIsMobile = nowMobile;
        setLayoutKey((k) => k + 1);
      }
    };
    window.addEventListener("resize", onResize);

    // Raycaster for Hover & Click
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2(-999, -999);

    const onPointerMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });

      const rect = canvas.getBoundingClientRect();
      if (
        e.clientX < rect.left ||
        e.clientX > rect.right ||
        e.clientY < rect.top ||
        e.clientY > rect.bottom
      ) {
        setIsHovered(false);
        return;
      }

      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes, false);
      setIsHovered(intersects.length > 0);
    };
    window.addEventListener("mousemove", onPointerMove);

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(interactiveMeshes, false);
      if (intersects.length > 0) {
        const hit = intersects[0].object;
        if (hit.userData?.project) {
          setSelectedProject(hit.userData.project);
        }
      }
    };
    canvas.addEventListener("click", onClick);

    // Render loop
    const animate = () => {
      animId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      timeUniform.value += delta;

      // Read real viewport bounding box continuously
      const rect = section.getBoundingClientRect();
      const scrollableDistance = section.clientHeight - window.innerHeight;
      if (scrollableDistance > 0) {
        // Clamp progress strictly between 0 and 1
        const progress = Math.max(0, Math.min(1, -rect.top / scrollableDistance));
        targetScroll = progress * maxScroll;
      }

      currentScroll += (targetScroll - currentScroll) * 0.14;
      projectsGroup.position.y = currentScroll;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onPointerMove);
      canvas.removeEventListener("click", onClick);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      texturesToDispose.forEach((t) => t.dispose());
      renderer.dispose();
    };
  }, [layoutKey]);

  return (
    <>
      {/* ========================================================================= */}
      {/* 1. MOBILE NATIVE PROJECT FEED (SCREEN WIDTH < 768px)                      */}
      {/* Eliminates WebGL context issues, gives ultra-crisp responsive cards       */}
      {/* ========================================================================= */}
      <div className="block md:hidden w-full bg-white text-[#111111] pt-20 sm:pt-28 pb-16 px-4 sm:px-6 select-none">
        {/* Mobile Header */}
        <div className="text-center pb-8 sm:pb-12 max-w-md mx-auto">
          <h2 className="text-[36px] sm:text-[46px] font-normal tracking-[-0.035em] text-[#111111] leading-none font-sans">
            My projects
          </h2>
        </div>

        {/* Vertical Feed of Full-Width Responsive Project Cards */}
        <div className="space-y-8 max-w-md mx-auto">
          {flagshipProjects.map((proj) => (
            <div
              key={proj.id}
              onClick={() => setSelectedProject(proj)}
              className="group cursor-pointer active:scale-[0.98] transition-all duration-200"
            >
              {/* Card Artwork Box */}
              <div className="relative w-full aspect-[16/10] rounded-[20px] overflow-hidden bg-[#F0F2F5] border border-[#1C1D20]/8 shadow-[0_10px_28px_rgba(0,0,0,0.06)] flex flex-col justify-between">
                {/* Minimalist editorial header for website projects */}
                {proj.filterType === "website" && (
                  <div className="absolute top-0 inset-x-0 z-10 flex items-center justify-between px-4 py-2 bg-white/95 backdrop-blur-md border-b border-[#111111]/8">
                    <span className="text-[10px] font-mono text-[#555555] tracking-widest uppercase">
                      {proj.id === "unnoto-khabar" ? "Live Platform" : "Web Platform"}
                    </span>
                    <span className="text-[10px] font-mono text-[#888888]">
                      {proj.number}
                    </span>
                  </div>
                )}

                <img
                  src={proj.posterImage || proj.media}
                  alt={proj.title}
                  className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                    proj.filterType === "website" ? "pt-7" : ""
                  }`}
                  loading="lazy"
                />

                {/* Floating Category Pill */}
                <div className="absolute bottom-3.5 left-3.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-mono font-bold text-[#111111] shadow-sm tracking-wide">
                  {proj.number} • {proj.category}
                </div>

                {/* Floating Action Arrow */}
                <div className="absolute bottom-3.5 right-3.5 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md text-[#111111] flex items-center justify-center text-sm font-bold shadow-sm group-hover:bg-[#111111] group-hover:text-white transition-colors duration-200">
                  <ArrowUpRight className="w-4 h-4" />
                </div>
              </div>

              {/* Card Typography Meta */}
              <div className="pt-3 px-1 space-y-1">
                <h3 className="text-xl sm:text-2xl font-bold text-[#111111] tracking-tight group-hover:text-[#2563EB] transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#666666] leading-relaxed line-clamp-1">
                  {proj.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. DESKTOP 3D THREE.JS WEBGL MASONRY (SCREEN WIDTH >= 768px)              */}
      {/* ========================================================================= */}
      <div
        ref={sectionRef}
        className="hidden md:block relative w-full h-[210vh] bg-white select-none"
      >
        {/* Sticky 100vh Viewport Container */}
        <div className="sticky top-0 h-[100dvh] w-full overflow-hidden flex flex-col justify-between bg-white">
          {/* Top Header */}
          <div className="relative z-20 pt-28 sm:pt-32 md:pt-28 lg:pt-24 pb-8 text-center max-w-4xl mx-auto px-4 pointer-events-auto bg-gradient-to-b from-white via-white/95 to-transparent">
            <h2 className="text-[44px] sm:text-[58px] md:text-[68px] lg:text-[76px] font-normal tracking-[-0.035em] text-[#111111] leading-none font-sans">
              My projects
            </h2>
          </div>

          {/* Three.js Canvas */}
          <canvas
            ref={canvasRef}
            style={{ width: "100%", height: "100%" }}
            className="absolute inset-0 w-full h-full z-10 pointer-events-auto cursor-pointer"
          />

          {/* Dennis Snellenberg / Cuberto Floating Magnetic Cursor */}
          <div
            style={{
              transform: `translate3d(${cursorPos.x - 48}px, ${cursorPos.y - 48}px, 0)`,
            }}
            className={`pointer-events-none fixed z-50 w-24 h-24 rounded-full bg-[#111111] text-white flex items-center justify-center shadow-2xl transition-all duration-200 ${
              isHovered ? "opacity-100 scale-100" : "opacity-0 scale-50"
            }`}
          >
            <span className="text-[12px] font-medium tracking-wider flex items-center gap-1 uppercase select-none">
              EXPLORE <span className="text-sm">↗</span>
            </span>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. BESPOKE HUMAN-CRAFTED EDITORIAL CASE STUDY MODAL                       */}
      {/* ========================================================================= */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          data-lenis-prevent="true"
          className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent="true"
            className="bg-white rounded-[24px] sm:rounded-[28px] max-w-4xl w-full shadow-2xl cursor-default border border-[#111111]/10 max-h-[92vh] flex flex-col overflow-hidden"
          >
            {/* 1. MINIMALIST EDITORIAL HEADER */}
            <div className="shrink-0 px-6 sm:px-10 py-5 sm:py-6 border-b border-[#111111]/8 bg-white flex items-center justify-between gap-4 z-20">
              <div className="space-y-1">
                <span className="text-[11px] font-mono tracking-widest text-[#888888] uppercase block">
                  Project {selectedProject.number} / {selectedProject.category}
                </span>
                <h3 className="text-2xl sm:text-3xl font-semibold text-[#111111] tracking-tight">
                  {selectedProject.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#666666] font-normal leading-relaxed">
                  {selectedProject.subtitle}
                </p>
              </div>

              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close dialog"
                className="w-10 h-10 rounded-full border border-[#111111]/15 text-[#111111] hover:bg-[#111111] hover:text-white transition-colors flex items-center justify-center font-bold text-sm shrink-0 cursor-pointer"
              >
                ✕
              </button>
            </div>

            {/* 2. SPACIOUS EDITORIAL BODY (NO EMOJIS, NO STATUS DOTS, NO CLUTTER) */}
            <div
              data-lenis-prevent="true"
              className="flex-1 overflow-y-auto px-6 sm:px-10 py-6 sm:py-8 space-y-10 select-text"
              style={{
                overscrollBehavior: "contain",
                WebkitOverflowScrolling: "touch",
              }}
            >
              {/* Clean, Pristine Hero Showcase Media */}
              <div className="w-full rounded-2xl overflow-hidden border border-[#111111]/10 bg-[#F4F4F6] shadow-xs">
                {selectedProject.isVideo ? (
                  <video
                    src={selectedProject.media}
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="w-full h-auto object-cover"
                  />
                ) : (
                  <img
                    src={selectedProject.media}
                    alt={selectedProject.title}
                    className="w-full h-auto object-cover"
                  />
                )}
              </div>

              {/* Section 1: Overview & Vision */}
              <div className="space-y-3">
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#888888]">
                  Overview & Vision / পরিচিতি ও ভিশন
                </div>
                <p className="text-base sm:text-[17px] text-[#222222] leading-relaxed font-normal">
                  {selectedProject.details?.overview || selectedProject.description}
                </p>
                {selectedProject.details?.vision && (
                  <p className="text-sm sm:text-[15px] text-[#555555] leading-relaxed border-l-2 border-[#111111]/30 pl-4 py-1 italic font-normal">
                    {selectedProject.details.vision}
                  </p>
                )}
              </div>

              {/* Section 2: Challenge vs Engineering Solution */}
              {selectedProject.details?.challenge && selectedProject.details?.solution && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-[#111111]/10 pt-8">
                  <div className="space-y-2">
                    <div className="text-[11px] font-mono uppercase tracking-widest text-[#888888]">
                      The Problem / বাস্তব সমস্যা
                    </div>
                    <p className="text-sm text-[#444444] leading-relaxed">
                      {selectedProject.details.challenge}
                    </p>
                  </div>
                  <div className="space-y-2">
                    <div className="text-[11px] font-mono uppercase tracking-widest text-[#888888]">
                      The Solution / প্রকৌশলগত সমাধান
                    </div>
                    <p className="text-sm text-[#222222] leading-relaxed">
                      {selectedProject.details.solution}
                    </p>
                  </div>
                </div>
              )}

              {/* Section 3: Core Architectural Systems & Features */}
              {selectedProject.details?.modules && selectedProject.details.modules.length > 0 && (
                <div className="space-y-6 border-t border-[#111111]/10 pt-8">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-[#888888]">
                    Core Engineering Systems / মূল প্রযুক্তিগত কাঠামো
                  </div>
                  <div className="divide-y divide-[#111111]/8">
                    {selectedProject.details.modules.map((mod, idx) => (
                      <div
                        key={idx}
                        className="py-6 first:pt-0 last:pb-0 grid grid-cols-1 md:grid-cols-12 gap-3 sm:gap-6"
                      >
                        <div className="md:col-span-4 space-y-1">
                          <span className="text-xs font-mono text-[#888888]">
                            0{idx + 1}
                          </span>
                          <h4 className="text-base font-semibold text-[#111111] leading-snug">
                            {mod.title}
                          </h4>
                          <span className="text-xs font-mono text-[#777777] block">
                            {mod.subtitle}
                          </span>
                        </div>
                        <div className="md:col-span-8 space-y-3">
                          <p className="text-sm text-[#444444] leading-relaxed font-normal">
                            {mod.description}
                          </p>
                          <div className="flex flex-wrap gap-x-6 gap-y-1.5 text-xs text-[#555555]">
                            {mod.highlights.map((h, hIdx) => (
                              <span key={hIdx} className="inline-flex items-center gap-2">
                                <span className="text-[#999999] font-mono">—</span>
                                <span>{h}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Section 4: Technology Stack */}
              {selectedProject.details?.techStack && selectedProject.details.techStack.length > 0 && (
                <div className="space-y-3 border-t border-[#111111]/10 pt-8">
                  <div className="text-[11px] font-mono uppercase tracking-widest text-[#888888]">
                    Technologies Used / ব্যবহৃত প্রযুক্তি
                  </div>
                  <div className="flex flex-wrap gap-2 pt-1">
                    {selectedProject.details.techStack.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3.5 py-1.5 rounded-full border border-[#111111]/15 text-xs font-mono text-[#222222] bg-[#F7F7F8]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 3. PERMANENT STICKY BOTTOM ACTION BAR (CLEAN, PROMINENT, SPACIOUS) */}
            <div className="shrink-0 px-6 sm:px-10 py-4 sm:py-5 bg-white border-t border-[#111111]/10 shadow-[0_-10px_25px_rgba(0,0,0,0.03)] flex flex-wrap items-center justify-between gap-4 z-20">
              <div className="flex flex-wrap items-center gap-3">
                {selectedProject.liveUrl && (
                  <a
                    href={selectedProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-7 py-3 rounded-full bg-[#111111] text-white text-sm font-medium hover:bg-[#2563EB] transition-colors tracking-wide cursor-pointer"
                  >
                    লাইভ ওয়েবসাইট দেখুন ↗
                  </a>
                )}
                {selectedProject.githubUrl && (
                  <a
                    href={selectedProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-7 py-3 rounded-full border border-[#111111]/25 text-[#111111] text-sm font-medium hover:bg-[#111111]/5 transition-colors tracking-wide cursor-pointer"
                  >
                    সোর্স কোড (GitHub) ↗
                  </a>
                )}
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="text-xs uppercase tracking-wider text-[#777777] hover:text-[#111111] transition-colors py-2 px-3 font-medium cursor-pointer"
              >
                বন্ধ করুন
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
