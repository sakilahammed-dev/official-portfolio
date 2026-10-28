"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

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
}

const flagshipProjects: ProjectItem[] = [
  {
    id: "amanat-os",
    number: "01",
    title: "Amanat OS",
    subtitle: "Autonomous Business Workflow OS, Immersive AI",
    category: "AI Automation",
    description: "Deterministic, self-healing multi-agent workflow architecture orchestrating complex enterprise processes.",
    media: "/images/projects/sov_1-1024x538.jpg",
    posterImage: "/images/projects/sov_1-1024x538.jpg",
    isVideo: false,
    filterType: "ai-automation",
  },
  {
    id: "titan-web",
    number: "02",
    title: "Titan Web Platform",
    subtitle: "High-Performance Autonomous Web Engine, 60 FPS",
    category: "Website & Platform",
    description: "Next-generation web application architecture with sub-millisecond interaction latency and fluid 3D experiences.",
    media: "/videos/project_web_titan_crop.mp4",
    posterImage: "/images/projects/titan_web-1024x538.jpg",
    isVideo: true,
    filterType: "website",
  },
  {
    id: "hyperframe-motion",
    number: "03",
    title: "Hyperframe Engine",
    subtitle: "Algorithmic Motion Synthesis & Dynamic Media",
    category: "Motion & Film",
    description: "Cloud-native deterministic video composition pipeline converting real-time data into cinema-grade visual stories.",
    media: "/videos/project_hyperframe_demo.mp4",
    posterImage: "/images/projects/hyperframe_engine-1024x538.jpg",
    isVideo: true,
    filterType: "motion-video",
  },
  {
    id: "sentinel-analytics",
    number: "04",
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
    number: "05",
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
    number: "06",
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
    number: "07",
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
    number: "08",
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
    number: "09",
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
    number: "10",
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

  // Title (Clean dark display typography)
  ctx.fillStyle = "#111111";
  ctx.font = '600 38px "Neue Montreal", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(title, 0, 8);

  // Subtitle / Category
  ctx.fillStyle = "#666666";
  ctx.font = '400 24px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';
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
              <div className="relative w-full aspect-[16/10] rounded-[20px] overflow-hidden bg-[#F0F2F5] border border-[#1C1D20]/8 shadow-[0_10px_28px_rgba(0,0,0,0.06)]">
                <img
                  src={proj.posterImage || proj.media}
                  alt={proj.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />

                {/* Floating Category Pill */}
                <div className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-[11px] font-mono font-bold text-[#111111] shadow-sm tracking-wide">
                  {proj.number} • {proj.category}
                </div>

                {/* Floating Action Arrow */}
                <div className="absolute bottom-3.5 right-3.5 w-9 h-9 rounded-full bg-white/95 backdrop-blur-md text-[#111111] flex items-center justify-center text-sm font-bold shadow-sm group-hover:bg-[#111111] group-hover:text-white transition-colors duration-200">
                  ↗
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
      {/* 3. SHARED INTERACTIVE MODAL (WORKS ON BOTH MOBILE & DESKTOP)              */}
      {/* ========================================================================= */}
      {selectedProject && (
        <div
          onClick={() => setSelectedProject(null)}
          className="fixed inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 cursor-pointer"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-[24px] max-w-2xl w-full p-5 sm:p-8 shadow-2xl space-y-4 sm:space-y-6 cursor-default border border-[#E5E7EB] max-h-[92vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <span className="text-xs font-mono font-semibold text-[#2563EB] uppercase tracking-wider block">
                  Flagship {selectedProject.number} • {selectedProject.category}
                </span>
                <h3 className="text-xl sm:text-3xl font-black text-[#1C1D20] mt-1 leading-tight">
                  {selectedProject.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#555962] mt-0.5 leading-relaxed">
                  {selectedProject.subtitle}
                </p>
              </div>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-9 h-9 rounded-full bg-[#F4F5F7] hover:bg-[#1C1D20] hover:text-white border border-[#E5E7EB] flex items-center justify-center text-sm font-bold text-[#1C1D20] transition-colors shrink-0 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="w-full aspect-[16/10] rounded-[16px] overflow-hidden bg-black shadow-inner">
              {selectedProject.isVideo ? (
                <video
                  src={selectedProject.media}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={selectedProject.media}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
              )}
            </div>

            <p className="text-sm text-[#3A3B40] leading-relaxed">
              {selectedProject.description}
            </p>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setSelectedProject(null)}
                className="px-6 py-2.5 rounded-full bg-[#1C1D20] text-white text-xs font-bold uppercase tracking-wider hover:bg-[#2563EB] transition-colors cursor-pointer"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
