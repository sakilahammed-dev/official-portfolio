"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Home, Play, Maximize2, Minimize2 } from "lucide-react";

interface VideoProject {
  id: string;
  driveId?: string;
  localSrc?: string;
  title: string;
  subtitle: string;
  thumb: string;
}

const videoProjects: VideoProject[] = [
  {
    id: "ai-automation-promo",
    localSrc: "/videos/ai_business_automation_promo.mp4",
    title: "AI Business Automation Promo",
    subtitle: "Autonomous Operations • Commercial Motion & AI Reel",
    thumb: "/images/projects/ai_automation_promo_thumb.png",
  },
  {
    id: "promo-1",
    driveId: "1uIdSxPWl1ATLInt0qh8PquLQjqwwraR8",
    title: "Small Business Management Promo",
    subtitle: "As-Sunnah Foundation • Commercial Motion",
    thumb: "/images/projects/as_sunnah_promo_thumb.png",
  },
  {
    id: "story-master",
    driveId: "1Bn0t62Y6nxahtd3NPHPBRQ7589u8_N6O",
    title: "Community Story (Master Music Cut)",
    subtitle: "As-Sunnah Foundation • Cinematic Master",
    thumb: "/images/projects/as_sunnah_music_thumb.png",
  },
];

export default function GalleryPage() {
  // Only ONE video can ever be active at a time (null if none)
  const [activeId, setActiveId] = useState<string | null>(null);

  // Expanded theater view state (null if regular grid size)
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Find the currently expanded video object
  const expandedVideo = videoProjects.find((v) => v.id === expandedId) || null;

  // Play a video exclusively in the grid (immediately stops any previous video)
  const handlePlayInGrid = (id: string) => {
    setActiveId(id);
    setExpandedId(null);
  };

  // Open a video in the expanded theater view (exclusively, stops others)
  const handleOpenExpand = (id: string) => {
    setActiveId(id);
    setExpandedId(id);
  };

  // Close the expanded view and return smoothly to grid
  const handleCloseExpand = () => {
    setExpandedId(null);
  };

  // Support URL param ?expand=id for testing and direct sharing
  useEffect(() => {
    if (typeof window !== "undefined") {
      // If user refreshes / reloads anywhere, always route cleanly to Home page
      const navEntries = performance.getEntriesByType("navigation") as PerformanceNavigationTiming[];
      const isReload =
        (navEntries.length > 0 && navEntries[0].type === "reload") ||
        (performance as unknown as { navigation?: { type: number } }).navigation?.type === 1;

      if (isReload) {
        window.location.replace("/");
        return;
      }

      const params = new URLSearchParams(window.location.search);
      const expandParam = params.get("expand");
      if (expandParam && videoProjects.some((v) => v.id === expandParam)) {
        setActiveId(expandParam);
        setExpandedId(expandParam);
      }
    }
  }, []);

  // Close expanded view on Escape key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setExpandedId(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#07090C] text-white selection:bg-[#38BDF8] selection:text-black relative">
      {/* Cinematic Ambient Glow */}
      <div className="fixed top-12 left-1/2 -translate-x-1/2 w-[900px] h-[400px] bg-gradient-to-r from-blue-600/15 via-emerald-600/10 to-purple-600/15 blur-[160px] pointer-events-none rounded-full" />

      {/* ========================================================================= */}
      {/* 1. TOP NAVBAR                                                             */}
      {/* ========================================================================= */}
      <header className="sticky top-0 z-30 bg-[#07090C]/85 backdrop-blur-2xl border-b border-white/[0.08] py-4">
        <div className="max-w-[1440px] mx-auto px-6 sm:px-12 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group select-none">
            <div className="w-5 h-5 flex items-center justify-center">
              <svg
                className="w-full h-full text-white transition-transform duration-700 group-hover:rotate-90"
                viewBox="0 0 400 400"
                fill="currentColor"
              >
                <path d="M 200 115 C 235 115, 270 90, 295 105 C 320 120, 285 165, 285 200 C 285 235, 320 280, 295 295 C 270 310, 235 285, 200 285 C 165 285, 130 310, 105 295 C 80 280, 115 235, 115 200 C 115 165, 80 120, 105 105 C 130 90, 165 115, 200 115 Z" />
              </svg>
            </div>
            <span className="font-bold tracking-tight text-sm sm:text-base font-mono uppercase text-white">
              SAKIL AHAMMED
            </span>
          </Link>

          <Link
            href="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white text-black text-xs sm:text-sm font-semibold tracking-wide hover:bg-white/90 active:scale-95 transition-all shadow-md shadow-white/5"
          >
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
        </div>
      </header>

      {/* ========================================================================= */}
      {/* 2. MAIN GALLERY                                                           */}
      {/* ========================================================================= */}
      <main className="max-w-[1440px] mx-auto px-6 sm:px-12 pt-8 sm:pt-14 pb-28 relative z-10">
        {/* Clean Header: Only "Video Gallery" */}
        <div className="pb-6 border-b border-white/[0.08]">
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-none">
            Video Gallery
          </h1>
        </div>

        {/* ========================================================================= */}
        {/* 3. VIDEO CARDS GRID                                                       */}
        {/* ========================================================================= */}
        <div className={`mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-2 ${videoProjects.length > 2 ? "lg:grid-cols-3" : "max-w-5xl mx-auto"} gap-6 sm:gap-8`}>
          {videoProjects.map((video) => {
            const isPlayingInGrid = activeId === video.id && expandedId === null;

            return (
              <div
                key={video.id}
                className={`group relative rounded-2xl border transition-all duration-300 flex flex-col ${
                  isPlayingInGrid
                    ? "bg-[#10141D] border-[#38BDF8]/60 shadow-[0_16px_40px_rgba(56,189,248,0.2)] ring-1 ring-[#38BDF8]/40"
                    : "bg-[#0C0E14] border-white/[0.12] shadow-[0_12px_32px_rgba(0,0,0,0.6)] hover:border-white/25 hover:shadow-[0_16px_40px_rgba(0,0,0,0.8)]"
                }`}
              >
                {/* 16:9 Video Container */}
                <div className="relative w-full aspect-[16/9] bg-black rounded-t-2xl overflow-hidden select-none">
                  {isPlayingInGrid ? (
                    /* Active Video Player inside this card */
                    <>
                      {video.localSrc ? (
                        <video
                          src={video.localSrc}
                          autoPlay
                          controls
                          playsInline
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <iframe
                          src={`https://drive.google.com/file/d/${video.driveId}/preview?autoplay=1`}
                          title={video.title}
                          allow="autoplay; fullscreen"
                          className="absolute -top-[54px] left-0 w-full h-[calc(100%+54px)] border-0"
                          loading="eager"
                        />
                      )}

                      {/* Protective corner shield (for Google Drive only) */}
                      {!video.localSrc && (
                        <div className="absolute top-0 right-0 w-16 h-14 z-10 pointer-events-auto bg-transparent" />
                      )}

                      {/* Expand Icon Button (Two arrows outward, zero text) */}
                      <button
                        onClick={() => handleOpenExpand(video.id)}
                        aria-label="Expand video"
                        title="বড় করুন"
                        className="absolute top-3 right-3 z-20 w-8 h-8 rounded-lg bg-black/80 hover:bg-[#38BDF8] text-white/90 hover:text-black backdrop-blur-md border border-white/20 transition-all flex items-center justify-center shadow-lg active:scale-95"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    /* Inactive Thumbnail Preview with Click-to-Play */
                    <div
                      onClick={() => handlePlayInGrid(video.id)}
                      className="w-full h-full relative cursor-pointer group/thumb"
                    >
                      <img
                        src={video.thumb}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover/thumb:scale-105 filter brightness-95 group-hover/thumb:brightness-105"
                        loading="lazy"
                      />

                      {/* Ambient Dark Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Centered Glowing Play Button */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-14 h-14 rounded-full bg-white/95 text-black flex items-center justify-center shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-all duration-300 group-hover/thumb:scale-110 group-hover/thumb:bg-[#38BDF8] group-hover/thumb:shadow-[0_0_35px_rgba(56,189,248,0.7)]">
                          <Play className="w-6 h-6 ml-1 fill-current" />
                        </div>
                      </div>

                      {/* Expand Icon (Directly open in enlarged theater view) */}
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          handleOpenExpand(video.id);
                        }}
                        title="সরাসরি বড় স্ক্রিনে চালান"
                        className="absolute top-3 right-3 z-10 w-8 h-8 rounded-lg bg-black/75 hover:bg-[#38BDF8] text-white/90 hover:text-black backdrop-blur-md border border-white/20 transition-all flex items-center justify-center shadow-lg active:scale-95"
                      >
                        <Maximize2 className="w-4 h-4" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Card Meta: Clean Title & Subtitle Only */}
                <div className="p-5 bg-gradient-to-b from-[#0F1219] to-[#0A0C11] flex flex-col justify-center flex-grow rounded-b-2xl">
                  <h3 className="text-base sm:text-lg font-bold text-white tracking-tight line-clamp-1 group-hover:text-[#38BDF8] transition-colors">
                    {video.title}
                  </h3>
                  <p className="text-xs text-white/50 mt-1 line-clamp-1">
                    {video.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* ========================================================================= */}
      {/* 4. EXPANDED THEATER MODAL (TOP-LEVEL: CRYSTAL CLEAR, NEVER BLURRY)        */}
      {/* ========================================================================= */}
      {expandedVideo && (
        <div
          onClick={handleCloseExpand}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
        >
          {/* Modal Container: sized cleanly to ~75-80% viewport, crisp and bright */}
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-4xl aspect-[16/9] bg-black rounded-2xl overflow-hidden border border-white/25 shadow-[0_25px_80px_rgba(0,0,0,0.95)] ring-1 ring-white/10"
          >
            {/* The Sole Active Iframe / Video in the Entire Application */}
            {expandedVideo.localSrc ? (
              <video
                src={expandedVideo.localSrc}
                autoPlay
                controls
                playsInline
                className="w-full h-full object-contain bg-black"
              />
            ) : (
              <>
                <iframe
                  src={`https://drive.google.com/file/d/${expandedVideo.driveId}/preview?autoplay=1`}
                  title={expandedVideo.title}
                  allow="autoplay; fullscreen"
                  className="absolute -top-[54px] left-0 w-full h-[calc(100%+54px)] border-0"
                  loading="eager"
                />

                {/* Protective corner shield */}
                <div className="absolute top-0 right-0 w-16 h-14 z-10 pointer-events-auto bg-transparent" />
              </>
            )}

            {/* Minimalist Minimize Icon Button (Two arrows inward, zero text) */}
            <button
              onClick={handleCloseExpand}
              aria-label="Minimize video"
              title="ছোট করুন"
              className="absolute top-3 right-3 z-20 w-9 h-9 rounded-xl bg-black/80 hover:bg-[#38BDF8] text-white hover:text-black border border-white/20 transition-all flex items-center justify-center shadow-lg active:scale-95"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
