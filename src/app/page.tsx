import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import FantasyPortalHero from "@/components/FantasyPortalHero";
import FeaturesSection from "@/components/FeaturesSection";
import PortfolioShowcase from "@/components/PortfolioShowcase";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";

export default function Home() {
  return (
    <SmoothScroll>
      {/* Cuberto Desktop & Mobile Navbar with Rolling Text & Pink Active Dot */}
      <Navbar />

      <main className="relative min-h-screen bg-black text-text-primary selection:bg-[#FF0055] selection:text-white">
        {/* 1. Fantasy Portal Entrance & Full-Screen Stage (#home) */}
        <FantasyPortalHero />

        {/* 2. Cuberto-Style "WHAT I DO" Interactive Features & Capabilities Stack (#features) */}
        <FeaturesSection />

        {/* 3. Flagship Portfolio / Autonomous Architectures (#portfolio) */}
        <PortfolioShowcase />

        {/* 4. Dennis Snellenberg Editorial About Section (#about) */}
        <AboutSection />

        {/* 5. Cuberto-Style Grand Contact Outro & Direct Terminal (#contact) */}
        <ContactSection />
      </main>
    </SmoothScroll>
  );
}
