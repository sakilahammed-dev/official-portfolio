"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import AutonomousAiVisual from "@/components/AutonomousAiVisual";
import WebDevVisual from "@/components/WebDevVisual";
import MobileAppVisual from "@/components/MobileAppVisual";
import UxResearchVisual from "@/components/UxResearchVisual";
import ReverseEngineeringVisual from "@/components/ReverseEngineeringVisual";
import VideoSolutionsVisual from "@/components/VideoSolutionsVisual";

interface ServiceItem {
  id: string;
  number: string;
  title: string;
  description: string;
  image: string;
}

const servicesData: ServiceItem[] = [
  {
    id: "autonomous-ai",
    number: "01",
    title: "Autonomous AI & Automation",
    description:
      "We architect self-healing multi-agent swarms and end-to-end automated pipelines that eliminate manual bottlenecks, execute complex workflows, and scale operations with deterministic reliability.",
    image: "/1.Bl-2s6At_Z2afRHb.webp",
  },
  {
    id: "web-development",
    number: "02",
    title: "Web Design & Development",
    description:
      "We create marketing websites and high-speed web platforms that explain products clearly, strengthen brands and support business growth. Built on Next.js, React and modern motion.",
    image: "/2.Cbn_yJDi_Zveefg.webp",
  },
  {
    id: "mobile-apps",
    number: "03",
    title: "Mobile App Development",
    description:
      "We develop native and cross-platform mobile applications that deliver smooth 60fps performance, intuitive gestures, and offline-first data sync across iOS and Android ecosystems.",
    image: "/3.8l0Om8fh_Z1c5pWo.webp",
  },
  {
    id: "ui-ux-design",
    number: "04",
    title: "UX Research & UI Design",
    description:
      "We uncover how people use digital products and where their experience breaks down. Through research, user flows, wireframes and prototypes, we improve usability before moving into interface design.",
    image: "/4.DeMCQtwn_Z234pqV.webp",
  },
  {
    id: "reverse-engineering",
    number: "05",
    title: "Software & Web Reverse Engineering",
    description:
      "We reverse engineer complex web platforms, mobile apps, and proprietary systems to deconstruct architectures, recover clean source code, optimize performance, and rebuild modern scalable stacks.",
    image: "/6.Decon_Matrix.webp",
  },
  {
    id: "video-solutions",
    number: "06",
    title: "Programmatic Video & Solutions",
    description:
      "We pioneer algorithmic video creation, dynamic motion design, and custom business software. Automating high-volume media synthesis and mission-critical enterprise workflows at scale.",
    image: "/5.C2LvZqUN_1lc3Le.webp",
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const mainRef = useRef<HTMLDivElement>(null);
  const itemsContainerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    gsap.registerPlugin(ScrollTrigger);

    const mm = gsap.matchMedia();

    // =========================================================================
    // DESKTOP (>= 768px): 100% EXACT REVERSED CUBERTO SCRUB-UNFOLD PHYSICS
    // =========================================================================
    mm.add("(min-width: 768px)", () => {
      const main = mainRef.current;
      const items = itemsContainerRef.current;
      const cardElements = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      if (!main || !items || cardElements.length <= 1) return;

      let timelines: gsap.core.Timeline[] = [];
      let positions: { top: number; bottom: number }[] = [];

      const updateHeightAndPositions = () => {
        // 1. Record current progress of all active timelines
        const progresses = timelines.map((tl) => tl.progress());

        // 2. Revert timelines to base CSS state (where .item__accordion has grid-template-rows: 1fr on desktop!)
        timelines.forEach((tl) => tl.revert({ kill: false }));

        // 3. Measure .items bounding box when all items are fully expanded
        const itemsRect = items.getBoundingClientRect();
        positions = cardElements.map((card) => {
          const cardRect = card.getBoundingClientRect();
          return {
            top: cardRect.top - itemsRect.top,
            bottom: cardRect.bottom - itemsRect.top,
          };
        });

        // 4. Set container height to the full expanded height of .items
        main.style.height = `${itemsRect.height}px`;

        // 5. Restore timeline progresses (time 0 on initial mount collapses cards 1..N)
        timelines.forEach((tl, idx) => {
          tl.render(tl.duration() * (progresses[idx] ?? 0), true, true);
        });
      };

      // Create exact Cuberto scrub timeline for each card (card 0 is always open & black)
      cardElements.forEach((card, idx) => {
        if (idx === 0) return;

        const fill = card.querySelector(".item__fill");
        const bg = card.querySelector(".item__bg");
        const content = card.querySelector(".item__content");
        const accordion = card.querySelector(".item__accordion");
        const num = card.querySelector(".item__num");

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: main,
            start: () => `top+=${positions[idx]?.top || 0} center+=20%`,
            end: () => `top+=${positions[idx]?.bottom || 0} center+=30%`,
            scrub: 1, // 1-second buttery smooth scrub inertia
          },
        });

        // 1. Text color shifts to white
        tl.to(card, { color: "#ffffff", duration: 1 }, 0);
        // 2. Background fills (custom rich tones for cards 1-6)
        if (fill) {
          const targetBg =
            servicesData[idx]?.id === "web-development"
              ? "#0b1a32"
              : servicesData[idx]?.id === "mobile-apps"
              ? "#0a2116"
              : servicesData[idx]?.id === "ui-ux-design"
              ? "#130919"
              : servicesData[idx]?.id === "reverse-engineering"
              ? "#140a04"
              : servicesData[idx]?.id === "video-solutions"
              ? "#140508"
              : "#000000";
          tl.to(fill, { backgroundColor: targetBg, duration: 1 }, 0);
        }
        const colorOverlay = card.querySelector(".item__color_overlay");
        if (colorOverlay) {
          tl.to(colorOverlay, { opacity: 1, duration: 1 }, 0);
        }
        // 3. WebP Artwork fades in with ease: none
        if (bg) tl.to(bg, { opacity: 1, duration: 1, ease: "none" }, 0);
        // 4. Accordion grid-template-rows unrolls from 0fr to 1fr
        if (accordion) {
          tl.fromTo(
            accordion,
            { gridTemplateRows: "0fr" },
            { gridTemplateRows: "1fr", duration: 1, ease: "none" },
            0
          );
        }
        // 5. Content text fades in smoothly
        if (content) tl.to(content, { opacity: 1, duration: 0.6 }, 0.4);
        // 6. Number opacity shifts to 0.5
        if (num) tl.to(num, { opacity: 0.5, duration: 1 }, 0);

        timelines.push(tl);
      });

      // Run initial layout measurement & collapse cards 1..N to time 0
      updateHeightAndPositions();
      ScrollTrigger.addEventListener("refreshInit", updateHeightAndPositions);

      // Re-measure after fonts load to ensure pixel-perfect heights
      if (document.fonts?.ready) {
        document.fonts.ready.then(() => {
          updateHeightAndPositions();
          ScrollTrigger.refresh();
        });
      }

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", updateHeightAndPositions);
        main.style.removeProperty("height");
        timelines.forEach((tl) => tl.kill());
      };
    });

    // =========================================================================
    // MOBILE (< 768px): ACCORDION CLICK TOGGLE
    // =========================================================================
    mm.add("(max-width: 767px)", () => {
      const cardElements = cardsRef.current.filter(Boolean) as HTMLDivElement[];
      const cleanupFns: (() => void)[] = [];

      cardElements.forEach((card, idx) => {
        const fill = card.querySelector(".item__fill") as HTMLDivElement;
        const bg = card.querySelector(".item__bg") as HTMLDivElement;
        const content = card.querySelector(".item__content") as HTMLDivElement;
        const accordion = card.querySelector(".item__accordion") as HTMLDivElement;
        const num = card.querySelector(".item__num") as HTMLDivElement;
        const colorOverlay = card.querySelector(".item__color_overlay") as HTMLDivElement;

        const handleClick = () => {
          const isActive = card.classList.contains("-active");
          if (isActive) {
            card.classList.remove("-active");
            card.style.color = "#000000";
            if (fill) fill.style.backgroundColor = "#eeeeee";
            if (colorOverlay) colorOverlay.style.opacity = "0";
            if (bg) bg.style.opacity = "0";
            if (accordion) accordion.style.gridTemplateRows = "0fr";
            if (content) content.style.opacity = "0";
            if (num) num.style.opacity = "0.2";
          } else {
            card.classList.add("-active");
            card.style.color = "#ffffff";
            const targetBg =
              servicesData[idx]?.id === "web-development"
                ? "#0b1a32"
                : servicesData[idx]?.id === "mobile-apps"
                ? "#0a2116"
                : servicesData[idx]?.id === "ui-ux-design"
                ? "#130919"
                : servicesData[idx]?.id === "reverse-engineering"
                ? "#140a04"
                : servicesData[idx]?.id === "video-solutions"
                ? "#140508"
                : "#000000";
            if (fill) fill.style.backgroundColor = targetBg;
            if (colorOverlay) colorOverlay.style.opacity = "1";
            if (bg) bg.style.opacity = "1";
            if (accordion) accordion.style.gridTemplateRows = "1fr";
            if (content) content.style.opacity = "1";
            if (num) num.style.opacity = "0.5";
          }
          ScrollTrigger.refresh();
        };

        card.addEventListener("click", handleClick);
        cleanupFns.push(() => card.removeEventListener("click", handleClick));
      });

      return () => {
        cleanupFns.forEach((fn) => fn());
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="FeatureSection relative w-full bg-white text-black pt-20 sm:pt-24 md:pt-28 pb-12 sm:pb-16 px-6 sm:px-12 xl:px-20 rounded-t-[32px] sm:rounded-t-[44px] z-20 select-none scroll-mt-12 sm:scroll-mt-16"
    >
      <div className="max-w-[1440px] mx-auto space-y-8 sm:space-y-10">
        {/* ========================================================= */}
        {/* TOP HEADER: CENTERED "WHAT I DO" TITLE                    */}
        {/* ========================================================= */}
        <div className="pt-2 pb-4 text-center">
          <h2 className="text-[38px] sm:text-[52px] md:text-[64px] lg:text-[76px] font-normal tracking-[-0.035em] text-[#111111] leading-none font-sans">
            WHAT I DO
          </h2>
        </div>

        {/* ========================================================= */}
        {/* ITEMS STACK: 100% EXACT CUBERTO ACCORDION SCROLL REVEAL   */}
        {/* ========================================================= */}
        <div ref={mainRef} className="main relative">
          <div ref={itemsContainerRef} className="items flex flex-col gap-2.5 sm:gap-3">
            {servicesData.map((item, index) => {
              const isFirst = index === 0;

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    cardsRef.current[index] = el;
                  }}
                  className={`item relative rounded-[20px] sm:rounded-[26px] overflow-hidden p-8 sm:p-14 transition-colors select-none ${
                    isFirst ? "-active text-white" : "text-neutral-900"
                  }`}
                >
                  {/* Background Fill (starts #eee on card 2-5, scrub-animates to #000) */}
                  <div
                    className="item__fill absolute inset-0 rounded-[inherit] pointer-events-none transition-colors duration-200"
                    style={{ backgroundColor: isFirst ? "#000000" : "#eeeeee" }}
                  />

                  {/* Card 01 Custom Bespoke Obsidian & Muted Aubergine Overlay */}
                  {item.id === "autonomous-ai" && (
                    <div
                      className="item__color_overlay_ai absolute inset-0 rounded-[inherit] pointer-events-none overflow-hidden"
                      style={{
                        background:
                          "radial-gradient(circle at 85% 25%, rgba(168, 85, 247, 0.18) 0%, transparent 55%), radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.14) 0%, transparent 60%), linear-gradient(135deg, #0c0814 0%, #150d22 40%, #1e1330 70%, #09060f 100%)",
                        border: "1px solid rgba(192, 132, 252, 0.2)",
                        boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.12), 0 25px 60px rgba(12, 8, 20, 0.5)",
                      }}
                    >
                      {/* Subtle Architectural Grid */}
                      <div
                        className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
                          backgroundSize: "32px 32px",
                        }}
                      />
                    </div>
                  )}

                  {/* Card 02 Custom Bespoke Midnight Prussian Overlay */}
                  {item.id === "web-development" && (
                    <div
                      className="item__color_overlay absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-300 overflow-hidden"
                      style={{
                        background:
                          "radial-gradient(circle at 85% 25%, rgba(56, 189, 248, 0.18) 0%, transparent 55%), radial-gradient(circle at 20% 80%, rgba(37, 99, 235, 0.15) 0%, transparent 60%), linear-gradient(135deg, #070e1b 0%, #0b1a32 40%, #10274a 70%, #050a14 100%)",
                        border: "1px solid rgba(56, 189, 248, 0.2)",
                        boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.12), 0 25px 60px rgba(7, 14, 27, 0.5)",
                        opacity: 0,
                      }}
                    >
                      {/* Subtle Architectural Grid */}
                      <div
                        className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
                          backgroundSize: "32px 32px",
                        }}
                      />
                    </div>
                  )}

                  {/* Card 03 Custom Bespoke Deep Mineral Cypress Overlay */}
                  {item.id === "mobile-apps" && (
                    <div
                      className="item__color_overlay absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-300 overflow-hidden"
                      style={{
                        background:
                          "radial-gradient(circle at 85% 25%, rgba(16, 185, 129, 0.18) 0%, transparent 55%), radial-gradient(circle at 20% 80%, rgba(20, 184, 166, 0.15) 0%, transparent 60%), linear-gradient(135deg, #05120c 0%, #0a2116 40%, #113624 70%, #040d08 100%)",
                        border: "1px solid rgba(16, 185, 129, 0.2)",
                        boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.12), 0 25px 60px rgba(5, 18, 12, 0.5)",
                        opacity: 0,
                      }}
                    >
                      {/* Subtle Architectural Grid */}
                      <div
                        className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(16, 185, 129, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(16, 185, 129, 0.08) 1px, transparent 1px)",
                          backgroundSize: "32px 32px",
                        }}
                      />
                    </div>
                  )}

                  {/* Card 04 Custom Bespoke Deep Warm Plum Overlay */}
                  {item.id === "ui-ux-design" && (
                    <div
                      className="item__color_overlay absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-300 overflow-hidden"
                      style={{
                        background:
                          "radial-gradient(circle at 85% 25%, rgba(216, 180, 254, 0.18) 0%, transparent 55%), radial-gradient(circle at 20% 80%, rgba(244, 114, 182, 0.15) 0%, transparent 60%), linear-gradient(135deg, #0e0714 0%, #15091e 40%, #220e30 70%, #0a040e 100%)",
                        border: "1px solid rgba(216, 180, 254, 0.2)",
                        boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.12), 0 25px 60px rgba(19, 9, 25, 0.5)",
                        opacity: 0,
                      }}
                    >
                      {/* Subtle Architectural Grid */}
                      <div
                        className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(240, 171, 252, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(240, 171, 252, 0.08) 1px, transparent 1px)",
                          backgroundSize: "32px 32px",
                        }}
                      />
                    </div>
                  )}

                  {/* Card 05 Custom Bespoke Deep Vintage Amber Overlay */}
                  {item.id === "reverse-engineering" && (
                    <div
                      className="item__color_overlay absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-300 overflow-hidden"
                      style={{
                        background:
                          "radial-gradient(circle at 85% 25%, rgba(251, 191, 36, 0.18) 0%, transparent 55%), radial-gradient(circle at 20% 80%, rgba(245, 158, 11, 0.15) 0%, transparent 60%), linear-gradient(135deg, #100803 0%, #1c0e05 40%, #2b1608 70%, #0a0502 100%)",
                        border: "1px solid rgba(251, 191, 36, 0.2)",
                        boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.12), 0 25px 60px rgba(20, 10, 4, 0.5)",
                        opacity: 0,
                      }}
                    >
                      {/* Subtle Architectural Grid */}
                      <div
                        className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(251, 191, 36, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 191, 36, 0.08) 1px, transparent 1px)",
                          backgroundSize: "32px 32px",
                        }}
                      />
                    </div>
                  )}

                  {/* Card 06 Custom Bespoke Deep Velvet Rose Overlay */}
                  {item.id === "video-solutions" && (
                    <div
                      className="item__color_overlay absolute inset-0 rounded-[inherit] pointer-events-none transition-opacity duration-300 overflow-hidden"
                      style={{
                        background:
                          "radial-gradient(circle at 85% 25%, rgba(251, 113, 133, 0.18) 0%, transparent 55%), radial-gradient(circle at 20% 80%, rgba(244, 63, 94, 0.15) 0%, transparent 60%), linear-gradient(135deg, #100407 0%, #1c060d 40%, #2c0915 70%, #0a0204 100%)",
                        border: "1px solid rgba(251, 113, 133, 0.2)",
                        boxShadow: "inset 0 1px 1px rgba(255, 255, 255, 0.12), 0 25px 60px rgba(20, 5, 8, 0.5)",
                        opacity: 0,
                      }}
                    >
                      {/* Subtle Architectural Grid */}
                      <div
                        className="absolute inset-0 opacity-10 pointer-events-none"
                        style={{
                          backgroundImage:
                            "linear-gradient(rgba(251, 113, 133, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(251, 113, 133, 0.08) 1px, transparent 1px)",
                          backgroundSize: "32px 32px",
                        }}
                      />
                    </div>
                  )}

                  {/* Card Visual Artwork: Custom Bespoke Visuals for all cards */}
                  <div
                    className="item__bg absolute bottom-0 right-0 pointer-events-none select-none w-full sm:w-[62%] lg:w-[58%] h-full flex items-center justify-end overflow-hidden"
                    style={{
                      opacity: isFirst ? 1 : 0,
                    }}
                  >
                    {item.id === "autonomous-ai" ? (
                      <div className="w-full h-full flex items-center justify-end max-sm:opacity-20 max-sm:scale-75 max-sm:translate-x-6">
                        <AutonomousAiVisual />
                      </div>
                    ) : item.id === "web-development" ? (
                      <div className="w-full h-full flex items-center justify-end max-sm:opacity-20 max-sm:scale-75 max-sm:translate-x-6">
                        <WebDevVisual />
                      </div>
                    ) : item.id === "mobile-apps" ? (
                      <div className="w-full h-full flex items-center justify-end max-sm:opacity-20 max-sm:scale-75 max-sm:translate-x-6">
                        <MobileAppVisual />
                      </div>
                    ) : item.id === "ui-ux-design" ? (
                      <div className="w-full h-full flex items-center justify-end max-sm:opacity-20 max-sm:scale-75 max-sm:translate-x-6">
                        <UxResearchVisual />
                      </div>
                    ) : item.id === "reverse-engineering" ? (
                      <div className="w-full h-full flex items-center justify-end max-sm:opacity-20 max-sm:scale-75 max-sm:translate-x-6">
                        <ReverseEngineeringVisual />
                      </div>
                    ) : item.id === "video-solutions" ? (
                      <div className="w-full h-full flex items-center justify-end max-sm:opacity-20 max-sm:scale-75 max-sm:translate-x-6">
                        <VideoSolutionsVisual />
                      </div>
                    ) : (
                      <div
                        className="w-full h-full flex items-end justify-end"
                        style={{ mixBlendMode: "lighten" }}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="object-contain object-bottom-right max-h-[95%] w-auto"
                          loading="lazy"
                        />
                      </div>
                    )}
                  </div>

                  {/* Card Header: Title on left, Number on right */}
                  <div className="item__head relative z-10 flex flex-col sm:flex-row-reverse sm:items-center justify-between gap-4">
                    <div
                      className={`item__num font-mono text-xl sm:text-2xl font-normal select-none sm:text-right ${
                        item.id === "autonomous-ai"
                          ? "text-purple-300 drop-shadow-[0_0_8px_rgba(192,132,252,0.3)]"
                          : item.id === "web-development"
                          ? "text-sky-300 drop-shadow-[0_0_8px_rgba(56,189,248,0.3)]"
                          : item.id === "mobile-apps"
                          ? "text-emerald-300 drop-shadow-[0_0_8px_rgba(16,185,129,0.3)]"
                          : item.id === "ui-ux-design"
                          ? "text-fuchsia-300 drop-shadow-[0_0_8px_rgba(240,171,252,0.3)]"
                          : item.id === "reverse-engineering"
                          ? "text-amber-300 drop-shadow-[0_0_8px_rgba(251,191,36,0.3)]"
                          : item.id === "video-solutions"
                          ? "text-rose-300 drop-shadow-[0_0_8px_rgba(251,113,133,0.3)]"
                          : ""
                      }`}
                      style={{ opacity: isFirst ? 0.85 : 0.4 }}
                    >
                      {item.number}
                    </div>

                    <div className="item__title">
                      <h3 className="text-2xl sm:text-[34px] font-normal tracking-tight leading-[1.15]">
                        {item.title}
                      </h3>
                    </div>
                  </div>

                  {/* Card Content Accordion (controlled by CSS & GSAP scrub) */}
                  <div className="item__accordion relative z-10">
                    <div
                      className="item__content overflow-hidden min-h-0"
                      style={{ opacity: isFirst ? 1 : 0 }}
                    >
                      <div className="item__text mt-5 sm:mt-7 max-w-xl text-neutral-400 text-sm sm:text-[15px] font-normal leading-relaxed">
                        <p>{item.description}</p>
                      </div>

                      <div className="item__action mt-7 sm:mt-8">
                        <a
                          href="#portfolio"
                          className="MoreButton group inline-flex items-center gap-3 text-sm font-medium text-white transition-opacity"
                        >
                          <span className="text-white/90 group-hover:text-white transition-colors">
                            Explore
                          </span>
                          <span className="icon w-8 h-8 rounded-full bg-white text-black flex items-center justify-center transition-transform duration-300 group-hover:rotate-45 shadow-sm">
                            <ArrowUpRight className="w-4 h-4" />
                          </span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}