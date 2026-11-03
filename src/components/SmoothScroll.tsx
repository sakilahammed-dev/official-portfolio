"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // 1. Force manual scroll restoration so browser NEVER restores scroll position on refresh
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in window.history) {
        window.history.scrollRestoration = "manual";
      }

      // If page was loaded with a hash (e.g. #contact), clear it so URL stays clean
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }

      // Force instant scroll to top (0, 0)
      window.scrollTo(0, 0);
    }

    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    (window as any).lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);

    // Ensure Lenis also starts strictly at top (0, 0)
    lenis.scrollTo(0, { immediate: true });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    // On page unload / refresh, reset scroll to top immediately
    const handleBeforeUnload = () => {
      window.scrollTo(0, 0);
      if (window.location.hash) {
        window.history.replaceState(null, "", window.location.pathname);
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
