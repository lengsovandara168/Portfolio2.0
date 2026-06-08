import React, {
  useRef,
  useState,
  useCallback,
  useEffect,
  type MouseEvent as ReactMouseEvent,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  useSpring,
} from "motion/react";
import {
  Trophy,
  Video,
  Rocket,
  Wrench,
  X,
  GraduationCap,
  Code2,
  Sprout,
  Zap,
  ExternalLink,
} from "lucide-react";

/* ─────────────────────────────────────────────
   TYPES
───────────────────────────────────────────── */
interface StatItem {
  emoji: string;
  value: string;
  label: string;
  description: string;
  glow: string;
  certPath?: string;
  certAlt?: string;
  Icon: React.FC<{ size?: number; className?: string }>;
}

interface Milestone {
  year: string;
  icon: React.FC<{ size?: number; className?: string }>;
  title: string;
  description: string;
  color: string;
}

interface Project {
  emoji: string;
  title: string;
  subtitle: string;
  description: string;
  imagePath: string;
  tags: string[];
  accentColor: string;
}

/* ─────────────────────────────────────────────
   DATA
───────────────────────────────────────────── */

const PROJECTS: Project[] = [
  {
    emoji: "🌾",
    title: "AgriBOT",
    subtitle: "Incubated AI Solution",
    description:
      "An AI-powered agricultural chatbot built using Retrieval-Augmented Generation (RAG) and the Gemini API, engineered to deliver precise crop diagnostics to Cambodian farmers. Validated through the national ACTSmart accelerator ecosystem.",
    imagePath: "/assets/projects/agribot-preview.png",
    tags: ["RAG", "Gemini API", "AI Chatbot", "Python"],
    accentColor: "#22c55e",
  },
  {
    emoji: "🚀",
    title: "Astrix POS",
    subtitle: "Retail Intelligence Platform",
    description:
      "A comprehensive point-of-sale and inventory management system designed specifically for smartphone retail shops, tracking complex metrics like device IMEIs, warranty cycles, and supplier chains.",
    imagePath: "/assets/projects/astrix-preview.png",
    tags: ["React", "Node.js", "PostgreSQL", "Dashboard"],
    accentColor: "#06b6d4",
  },
  {
    emoji: "🏸",
    title: "CourtConnect KH",
    subtitle: "Cross-Platform Sports Booking",
    description:
      "A cross-platform sports court booking application developed with Flutter, featuring native local payment integrations via Bakong and ABA Bank APIs for the Cambodian market.",
    imagePath: "/assets/projects/courtconnect-preview.png",
    tags: ["Flutter", "Dart", "Bakong", "ABA Pay"],
    accentColor: "#8b5cf6",
  },
];

/* ─────────────────────────────────────────────
   SHINE KEYFRAME (injected once)
───────────────────────────────────────────── */
function useShineStyle() {
  useEffect(() => {
    if (typeof document === "undefined") return;
    if (document.getElementById("ach-shine-kf")) return;
    const s = document.createElement("style");
    s.id = "ach-shine-kf";
    s.textContent = `
      @keyframes ach-shine {
        0%   { background-position: -200% center; }
        100% { background-position:  200% center; }
      }
      .ach-shine {
        background: linear-gradient(
          90deg,
          #22d3ee 0%,
          #ffffff 30%,
          #a5f3fc 50%,
          #ffffff 70%,
          #22d3ee 100%
        );
        background-size: 200% auto;
        -webkit-background-clip: text;
        background-clip: text;
        -webkit-text-fill-color: transparent;
        animation: ach-shine 3s linear infinite;
      }
      @keyframes ach-pulse-glow {
        0%, 100% { box-shadow: 0 0 12px 2px rgba(6,182,212,0.3); }
        50%       { box-shadow: 0 0 28px 6px rgba(6,182,212,0.6); }
      }
      .ach-node-active { animation: ach-pulse-glow 2s ease-in-out infinite; }
    `;
    document.head.appendChild(s);
  }, []);
}

/* ─────────────────────────────────────────────
   SHINY TEXT
───────────────────────────────────────────── */
function ShinyText({ text }: { text: string }) {
  useShineStyle();
  return (
    <span className="ach-shine text-sm font-bold uppercase tracking-[0.35em]">
      {text}
    </span>
  );
}

/* ─────────────────────────────────────────────
   ANIMATED GRADIENT LINE
───────────────────────────────────────────── */
function GradientLine() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <div
      ref={ref}
      className="mt-6 h-px w-full overflow-hidden rounded-full bg-white/5"
    >
      <motion.div
        className="h-full rounded-full"
        style={{
          background: "linear-gradient(90deg, #3b82f6, #06b6d4, transparent)",
        }}
        initial={{ width: "0%" }}
        animate={{ width: inView ? "75%" : "0%" }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
      />
    </div>
  );
}

/* ─────────────────────────────────────────────
   IMAGE FRAME (skeleton → image)
───────────────────────────────────────────── */
type ImgState = "loading" | "loaded" | "error";

function ImageFrame({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [state, setState] = useState<ImgState>("loading");

  return (
    <div
      className={`relative w-full aspect-video overflow-hidden rounded-xl border border-white/10 bg-neutral-900/50 ${className}`}
    >
      {/* Skeleton pulse */}
      {state === "loading" && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-neutral-800/60 via-neutral-900/40 to-neutral-800/60" />
      )}

      {/* Actual image */}
      {state !== "error" && (
        <motion.img
          src={src}
          alt={alt}
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={state === "loaded" ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
          onLoad={() => setState("loaded")}
          onError={() => setState("error")}
        />
      )}

      {/* Error fallback */}
      {state === "error" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 text-neutral-600">
          <div className="text-5xl opacity-30">🖼</div>
          <p className="font-mono text-[10px] tracking-wider text-neutral-700">
            {src.split("/").pop()}
          </p>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   IMAGE MODAL
───────────────────────────────────────────── */
function AchievementModal({
  stat,
  onClose,
}: {
  stat: StatItem;
  onClose: () => void;
}) {
  // close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-[#020B1F]/80 backdrop-blur-xl" />

      <motion.div
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-2xl"
        initial={{ scale: 0.88, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 24 }}
        transition={{ type: "spring", damping: 22, stiffness: 260 }}
        onClick={(e) => e.stopPropagation()}
        style={{ boxShadow: `0 0 80px ${stat.glow}18` }}
      >
        {/* glow border top */}
        <div
          className="h-px w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${stat.glow}, transparent)`,
          }}
        />

        {/* header */}
        <div className="flex items-center justify-between p-5">
          <div>
            <p
              className="text-xs font-bold uppercase tracking-[0.3em]"
              style={{ color: stat.glow }}
            >
              {stat.label}
            </p>
            <h3 className="mt-1 text-lg font-black text-white">{stat.value}</h3>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-white/10 bg-white/5 text-neutral-400 transition hover:bg-white/10 hover:text-white"
          >
            <X size={14} />
          </button>
        </div>

        {/* certificate / award image */}
        <div className="px-5 pb-5">
          <ImageFrame
            src={stat.certPath!}
            alt={stat.certAlt || stat.label}
            className="border-white/10"
          />
          <p className="mt-4 text-sm leading-7 text-neutral-300">
            {stat.description}
          </p>
        </div>

        {/* glow border bottom */}
        <div
          className="h-px w-full"
          style={{
            background: `linear-gradient(90deg, transparent, ${stat.glow}60, transparent)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   STAT CARD
───────────────────────────────────────────── */
function StatCard({
  stat,
  index,
  onOpenModal,
}: {
  stat: StatItem;
  index: number;
  onOpenModal?: () => void;
}) {
  const [mouse, setMouse] = useState({ x: 0, y: 0, opacity: 0 });
  const cardRef = useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { once: true, margin: "-40px" });

  const handleMouseMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMouse({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      opacity: 1,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouse((p) => ({ ...p, opacity: 0 }));
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.65,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`group relative flex flex-col gap-4 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 ${onOpenModal ? "cursor-pointer" : ""}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onOpenModal}
      style={{ boxShadow: "0 4px 40px rgba(0,0,0,0.4)" }}
    >
      {/* mouse spotlight */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300"
        style={{
          opacity: mouse.opacity,
          background: `radial-gradient(300px circle at ${mouse.x}px ${mouse.y}px, ${stat.glow}18, transparent 70%)`,
        }}
      />

      {/* top glow accent */}
      <div
        className="absolute -top-10 left-1/2 h-20 w-3/4 -translate-x-1/2 blur-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        style={{ background: `${stat.glow}15` }}
      />

      {/* icon */}
      <div
        className="flex h-12 w-12 items-center justify-center rounded-xl text-2xl"
        style={{
          background: `${stat.glow}15`,
          border: `1px solid ${stat.glow}30`,
        }}
      >
        <stat.Icon size={22} style={{ color: stat.glow }} />
      </div>

      {/* value */}
      <div
        className="text-4xl font-black tracking-tight"
        style={{ color: stat.glow }}
      >
        {stat.value}
      </div>

      {/* label */}
      <div>
        <p className="text-xs font-bold uppercase tracking-[0.22em] text-neutral-400">
          {stat.label}
        </p>
        <p className="mt-2 text-sm leading-6 text-neutral-400">
          {stat.description}
        </p>
      </div>

      {/* clickable hint */}
      {onOpenModal && (
        <div
          className="mt-auto flex items-center gap-1.5 text-xs font-semibold opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ color: stat.glow }}
        >
          <span>View Certificate</span>
          <ExternalLink size={11} />
        </div>
      )}

      {/* border glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl border opacity-0 transition-all duration-500 group-hover:opacity-100"
        style={{ borderColor: `${stat.glow}40` }}
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   3D TILT CARD
───────────────────────────────────────────── */
function TiltCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });
  const inView = useInView(cardRef, { once: true, margin: "-60px" });

  const handleMouseMove = useCallback((e: ReactMouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    setTilt({
      x: ((y - cy) / cy) * -10,
      y: ((x - cx) / cx) * 10,
    });
    setSpotlight({ x, y, opacity: 1 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setSpotlight((p) => ({ ...p, opacity: 0 }));
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.04] backdrop-blur-sm"
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(900px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.15s ease-out",
        boxShadow: `0 4px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(255,255,255,0.06)`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* mouse spotlight overlay */}
      <div
        className="pointer-events-none absolute inset-0 z-10 rounded-2xl transition-opacity duration-200"
        style={{
          opacity: spotlight.opacity,
          background: `radial-gradient(350px circle at ${spotlight.x}px ${spotlight.y}px, ${project.accentColor}18, transparent 65%)`,
        }}
      />

      {/* top accent glow */}
      <div
        className="absolute -top-12 left-1/2 h-24 w-2/3 -translate-x-1/2 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: `${project.accentColor}20` }}
      />

      {/* image */}
      <div className="relative">
        <ImageFrame
          src={project.imagePath}
          alt={project.title}
          className="rounded-none rounded-t-2xl"
        />
        {/* image overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#020B1F] via-transparent to-transparent" />
        {/* emoji badge */}
        <div
          className="absolute left-4 bottom-4 flex h-10 w-10 items-center justify-center rounded-xl text-xl"
          style={{
            background: `${project.accentColor}20`,
            border: `1px solid ${project.accentColor}40`,
          }}
        >
          {project.emoji}
        </div>
      </div>

      {/* content */}
      <div className="p-5">
        <p
          className="mb-1 text-xs font-bold uppercase tracking-[0.22em]"
          style={{ color: project.accentColor }}
        >
          {project.subtitle}
        </p>
        <h3 className="mb-3 text-xl font-black text-white">{project.title}</h3>
        <p className="text-sm leading-7 text-neutral-400">
          {project.description}
        </p>

        {/* tags */}
        <div className="mt-5 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border px-3 py-1 text-xs font-medium"
              style={{
                borderColor: `${project.accentColor}30`,
                color: project.accentColor,
                background: `${project.accentColor}0d`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* bottom border glow */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl border opacity-0 transition-all duration-500 group-hover:opacity-100"
        style={{ borderColor: `${project.accentColor}35` }}
      />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   SECTION HEADER
───────────────────────────────────────────── */
function SectionHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mb-20 max-w-3xl"
    >
      <ShinyText text="Achievement" />

      <h2 className="mt-5 text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
        Building products,{" "}
        <span className="text-neutral-400">solving problems,</span> and
        continuously improving through{" "}
        <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          real-world experience.
        </span>
      </h2>

      <GradientLine />
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   MAIN EXPORT
───────────────────────────────────────────── */
export default function AchievementsInteractive() {
  const [activeModal, setActiveModal] = useState<StatItem | null>(null);

  const openModal = useCallback((stat: StatItem) => {
    setActiveModal(stat);
    document.body.style.overflow = "hidden";
  }, []);

  const closeModal = useCallback(() => {
    setActiveModal(null);
    document.body.style.overflow = "";
  }, []);

  return (
    <section
      id="achievements"
      className="relative overflow-hidden bg-[#020B1F] px-4 py-24 text-white sm:px-6 lg:px-8"
    >
      {/* ── Ambient glows ── */}
      <div className="pointer-events-none absolute left-0 top-0 h-[600px] w-full">
        <div className="absolute left-1/4 top-0 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-600/8 blur-[120px]" />
        <div className="absolute right-1/4 top-1/4 h-60 w-60 rounded-full bg-cyan-500/6 blur-[100px]" />
      </div>
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-64 w-full max-w-2xl -translate-x-1/2 bg-blue-900/10 blur-[130px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* ── 1. Section Header ── */}
        <SectionHeader />

        {/* ── 2. Stats Dashboard ── */}
        <div className="mb-28">
          <motion.p
            className="mb-8 text-xs font-semibold uppercase tracking-[0.3em] text-neutral-500"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          ></motion.p>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {STATS.map((stat, i) => (
              <StatCard
                key={stat.label}
                stat={stat}
                index={i}
                onOpenModal={stat.certPath ? () => openModal(stat) : undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
