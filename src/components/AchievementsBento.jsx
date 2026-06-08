import React, { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from "motion/react";
import { Trophy, Video, ArrowUpRight } from "lucide-react";

// Accent colors
const COLORS = {
  primary: {
    hex: "#06b6d4",
    border: "border-cyan-500/30",
    bgGlow: "bg-cyan-500/10",
    text: "text-cyan-400",
    gradient: "from-cyan-500/20 to-transparent",
    spotlight: "rgba(6, 182, 212, 0.15)",
  },
  secondary: {
    hex: "#8b5cf6",
    border: "border-violet-500/30",
    bgGlow: "bg-violet-500/10",
    text: "text-violet-400",
    gradient: "from-violet-500/20 to-transparent",
    spotlight: "rgba(139, 92, 246, 0.15)",
  },
};

function BentoCard({ title, subtitle, desc, image, accent, isLarge }) {
  const cardRef = useRef(null);

  // Motion values for tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for buttery tilt & return
  const springConfig = { damping: 22, stiffness: 200, mass: 0.6 };
  const rotateX = useSpring(
    useTransform(y, [-0.5, 0.5], [8, -8]),
    springConfig,
  );
  const rotateY = useSpring(
    useTransform(x, [-0.5, 0.5], [-8, 8]),
    springConfig,
  );

  // Spotlight tracking
  const spotlightX = useSpring(0, springConfig);
  const spotlightY = useSpring(0, springConfig);
  const spotlightOpacity = useSpring(0, springConfig);

  // Background effects
  const bgScale = useSpring(1, springConfig);
  const overlayOpacity = useSpring(1, springConfig);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;

    // Normalize inputs between -0.5 and 0.5
    x.set(clientX / width - 0.5);
    y.set(clientY / height - 0.5);

    // Track cursor coordinates for visual spotlight
    spotlightX.set(clientX);
    spotlightY.set(clientY);
    spotlightOpacity.set(1);

    // Scaling background & easing opacity of overlay
    bgScale.set(1.05);
    overlayOpacity.set(0.85);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    spotlightOpacity.set(0);
    bgScale.set(1);
    overlayOpacity.set(1);
  };

  const IconComponent = isLarge ? Trophy : Video;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative group overflow-hidden rounded-3xl border border-white/10 bg-[#0c1322] ${
        isLarge
          ? "lg:col-span-2 h-[360px] sm:h-[400px] md:h-[420px]"
          : "h-[360px] sm:h-[400px] md:h-[420px]"
      } cursor-pointer flex flex-col justify-end p-6 md:p-8`}
      style={{
        transformStyle: "preserve-3d",
        rotateX,
        rotateY,
        perspective: 1000,
        boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
      }}
    >
      {/* 1. Full-bleed Background Image */}
      <motion.div
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${image}')`,
          scale: bgScale,
        }}
      />

      {/* 2. Heavy Dark-mode Gradient Overlay with Spring Opacity */}
      <motion.div
        className="absolute inset-0 z-[1] bg-gradient-to-t from-[#0b1220] via-[#0b1220]/70 to-[#0b1220]/10"
        style={{ opacity: overlayOpacity }}
      />

      {/* 3. Accent Corner Glow */}
      <div
        className={`absolute top-0 right-0 w-48 h-48 rounded-full filter blur-[80px] -mr-12 -mt-12 opacity-30 group-hover:opacity-60 transition-opacity duration-700 bg-gradient-to-br ${accent.gradient}`}
      />

      {/* 4. Glassmorphic Spotlight tracker */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-[2] rounded-3xl transition-opacity duration-300"
        style={{
          opacity: spotlightOpacity,
          background: useTransform(
            [spotlightX, spotlightY],
            ([cx, cy]) =>
              `radial-gradient(400px circle at ${cx}px ${cy}px, ${accent.spotlight}, transparent 75%)`,
          ),
        }}
      />

      {/* 5. Content Block */}
      <div className="relative z-[3] w-full flex flex-col gap-4 transform translate-z-20">
        <div className="flex items-center justify-between">
          {/* Badge */}
          <div
            className={`flex items-center gap-2 px-3 py-1 rounded-full border ${accent.border} ${accent.bgGlow} backdrop-blur-md`}
          >
            <IconComponent className={`h-4 w-4 ${accent.text}`} />
            <span
              className={`text-xs font-bold tracking-wide uppercase ${accent.text}`}
            >
              {subtitle}
            </span>
          </div>

        </div>

        <div>
          {/* Title */}
          <h3 className="text-2xl md:text-3xl font-black text-white leading-tight mb-2 tracking-tight">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm md:text-base text-slate-300 font-medium leading-relaxed max-w-xl">
            {desc}
          </p>
        </div>
      </div>

      {/* Premium Outer Highlight Border on Hover */}
      <div
        className={`pointer-events-none absolute inset-0 rounded-3xl border border-transparent group-hover:border-white/20 transition-all duration-500 z-[4]`}
        style={{
          boxShadow: `inset 0 0 12px rgba(255, 255, 255, 0.03)`,
        }}
      />
    </motion.div>
  );
}

export default function AchievementsBento() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  const achievements = [
    {
      title: "Top 8 teams of ACTSmart Hackathon 2025 & Incubation participant",
      subtitle: "🏆 ACTSmart Hackathon & Incubation",
      desc: "Architected an AI-powered agricultural chatbot utilizing Retrieval-Augmented Generation (RAG) models. Selected for the ACTSmart Incubation Program by Smart Axiata and AUPP Technology Center, receiving mentorship and resources to refine the solution for real-world impact.",
      image: "/assets/achievements/agritech.jpg",
      accent: COLORS.primary,
      isLarge: true,
    },
    {
      title: "Top 3 Video Creator",
      subtitle: "🎬 Top 3 Video Creator",
      desc: "Honored at the Digital Government Forum for outstanding digital communication, creative cinematography, and tech advocacy.",
      image: "/assets/achievements/dgf.jpg",
      accent: COLORS.secondary,
      isLarge: false,
    },
  ];

  return (
    <section
      id="achievements"
      className="relative overflow-hidden bg-[#0b1220] px-4 py-24 text-slate-300 sm:px-6 lg:px-8 border-t border-white/5"
    >
      {/* Dynamic Background Mesh Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      {/* Ambient Radial Lights */}
      <div className="pointer-events-none absolute left-0 top-0 h-[600px] w-full">
        <div className="absolute left-1/4 top-0 h-96 w-96 -translate-x-1/2 rounded-full bg-cyan-500/5 blur-[120px]" />
        <div className="absolute right-1/4 top-1/4 h-80 w-80 rounded-full bg-violet-500/5 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 30 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16 max-w-3xl"
        >
          <span className="text-sm font-bold uppercase tracking-[0.35em] text-cyan-400 bg-cyan-950/30 border border-cyan-500/20 px-3.5 py-1.5 rounded-full inline-block mb-6">
            Milestones & Achievements
          </span>

          <h2 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            Key milestones,{" "}
            <span className="text-slate-400 font-normal">
              valuable validation,
            </span>{" "}
            and creative advocacy.
          </h2>

          <div className="mt-6 h-px w-3/4 overflow-hidden rounded-full bg-white/5">
            <motion.div
              className="h-full rounded-full"
              style={{
                background:
                  "linear-gradient(90deg, #06b6d4, #8b5cf6, transparent)",
              }}
              initial={{ width: "0%" }}
              animate={headerInView ? { width: "100%" } : {}}
              transition={{
                duration: 1.2,
                ease: [0.22, 1, 0.36, 1],
                delay: 0.2,
              }}
            />
          </div>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {achievements.map((item, index) => (
            <BentoCard
              key={item.title}
              title={item.title}
              subtitle={item.subtitle}
              desc={item.desc}
              image={item.image}
              accent={item.accent}
              isLarge={item.isLarge}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
