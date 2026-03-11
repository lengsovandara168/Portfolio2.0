import React, { useEffect, useRef, useState } from "react";
import { PinContainer } from "@/components/ui/3d-pin";

/* ─── data ─── */
const LANGUAGES = [
  { name: "HTML5", icon: "https://cdn.simpleicons.org/html5/E34F26" },
  { name: "CSS3", icon: "https://cdn.simpleicons.org/css/1572B6" },
  { name: "JavaScript", icon: "https://cdn.simpleicons.org/javascript/F7DF1E" },
  { name: "TypeScript", icon: "https://cdn.simpleicons.org/typescript/3178C6" },
  { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" },
  { name: "Java", icon: "https://cdn.simpleicons.org/openjdk/FFFFFF" },
  { name: "Dart", icon: "https://cdn.simpleicons.org/dart/0175C2" },
  { name: "SQL", icon: "https://cdn.simpleicons.org/mysql/4479A1" },
  { name: "Bash", icon: "https://cdn.simpleicons.org/gnubash/4EAA25" },
];

const TOOLS = [
  { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
  { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/FFFFFF" },
  { name: "Astro", icon: "https://cdn.simpleicons.org/astro/FF5D01" },
  { name: "Flutter", icon: "https://cdn.simpleicons.org/flutter/02569B" },
  { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/5FA04E" },
  { name: "Tailwind", icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4" },
  { name: "AWS", icon: "https://cdn.simpleicons.org/amazonwebservices/FF9900" },
  { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
  { name: "Figma", icon: "https://cdn.simpleicons.org/figma/F24E1E" },
  { name: "Postman", icon: "https://cdn.simpleicons.org/postman/FF6C37" },
  { name: "Vercel", icon: "https://cdn.simpleicons.org/vercel/FFFFFF" },
  { name: "GitHub", icon: "https://cdn.simpleicons.org/github/FFFFFF" },
];

const PINS = [
  {
    title: "Frontend",
    href: "#projects",
    label: "My Frontend Stack",
    color: "#38bdf8",
    icon: "ri-layout-4-line",
    techs: [
      { name: "React", icon: "https://cdn.simpleicons.org/react/61DAFB" },
      { name: "Next.js", icon: "https://cdn.simpleicons.org/nextdotjs/FFFFFF" },
      { name: "Astro", icon: "https://cdn.simpleicons.org/astro/FF5D01" },
      {
        name: "TypeScript",
        icon: "https://cdn.simpleicons.org/typescript/3178C6",
      },
      {
        name: "Tailwind",
        icon: "https://cdn.simpleicons.org/tailwindcss/06B6D4",
      },
      { name: "Figma", icon: "https://cdn.simpleicons.org/figma/F24E1E" },
      { name: "Astro", icon: "https://cdn.simpleicons.org/astro/FF5D01" },
    ],
    desc: "Building responsive, fast, and beautiful UIs with modern frameworks and design systems.",
  },
  {
    title: "Backend",
    href: "#projects",
    label: "My Backend Stack",
    color: "#a78bfa",
    icon: "ri-server-line",
    techs: [
      { name: "Python", icon: "https://cdn.simpleicons.org/python/3776AB" },
      { name: "Java", icon: "https://cdn.simpleicons.org/openjdk/FFFFFF" },
      { name: "Node.js", icon: "https://cdn.simpleicons.org/nodedotjs/5FA04E" },
      { name: "Flutter", icon: "https://cdn.simpleicons.org/flutter/02569B" },
      { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479A1" },
      {
        name: "PostgreSQL",
        icon: "https://cdn.simpleicons.org/postgresql/4169E1",
      },
    ],
    desc: "Designing scalable APIs and server-side logic with solid databases and mobile support.",
  },
  {
    title: "Cloud & Network",
    href: "#projects",
    label: "Infrastructure",
    color: "#FFFFf",
    icon: "ri-cloud-line",
    techs: [
      {
        name: "cloudflare",
        icon: "https://cdn.simpleicons.org/cloudflare",
      },
      { name: "Vercel", icon: "https://cdn.simpleicons.org/vercel/ffff" },
      { name: "Git", icon: "https://cdn.simpleicons.org/git/F05032" },
      { name: "GitHub", icon: "https://cdn.simpleicons.org/github/FFFFFF" },
        { name: "AWS", icon: "https://img.icons8.com/?size=100&id=mHi46t5vguiz&format=png&color=000000" },
    ],
    desc: "Deploying and maintaining cloud infrastructure, networking systems, and CI/CD pipelines.",
  },
];

/* ─── Ticker row ─── */
function TechTicker({ items, direction = "left" }) {
  const containerRef = useRef(null);
  const scrollerRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !scrollerRef.current) return;
    // duplicate items for seamless loop
    Array.from(scrollerRef.current.children).forEach((child) => {
      scrollerRef.current.appendChild(child.cloneNode(true));
    });
    containerRef.current.style.setProperty(
      "--animation-direction",
      direction === "left" ? "forwards" : "reverse",
    );
    containerRef.current.style.setProperty("--animation-duration", "35s");
    setReady(true);
  }, [direction]);

  return (
    <div
      ref={containerRef}
      className="scroller relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_12%,white_88%,transparent)]"
    >
      <ul
        ref={scrollerRef}
        className={[
          "flex w-max min-w-full shrink-0 flex-nowrap gap-3 py-2",
          ready ? "animate-scroll" : "",
          "hover:[animation-play-state:paused]",
        ].join(" ")}
      >
        {items.map((item, i) => (
          <li
            key={`${item.name}-${i}`}
            className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:bg-white/10"
          >
            <img
              src={item.icon}
              alt={item.name}
              className="h-4 w-4 object-contain"
            />
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ─── 3D Pin card content ─── */
function PinCardContent({ pin }) {
  return (
    <div className="flex h-[14rem] w-[13rem] flex-col gap-3 p-1">
      {/* header */}
      <div className="flex items-center gap-2">
        <span
          className="flex h-7 w-7 items-center justify-center rounded-full text-sm"
          style={{ background: `${pin.color}22`, color: pin.color }}
        >
          <i className={pin.icon} />
        </span>
        <span className="text-sm font-bold text-[#f8fafc]">{pin.title}</span>
      </div>
      {/* description */}
      <p className="text-xs leading-relaxed text-[#a3afc2]">{pin.desc}</p>
      {/* tech icons grid */}
      <div className="mt-auto grid grid-cols-3 gap-2">
        {pin.techs.map((t) => (
          <div
            key={t.name}
            title={t.name}
            className="flex flex-col items-center gap-1 rounded-xl border border-white/10 bg-white/[0.04] px-1 py-2"
          >
            <img src={t.icon} alt={t.name} className="h-5 w-5 object-contain" />
            <span className="text-[9px] text-[#94a3b8]">{t.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ─── Main export ─── */
export default function SkillsShowcase() {
  return (
    <section id="skills" className="bg-[#0b1220] py-16 text-gray-100">
      {/* header row */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,0.95fr)] md:items-start">
          <div className="flex flex-col gap-6">
            <h3
              className="text-3xl font-bold sm:text-4xl"
              style={{ color: "var(--p-text)" }}
            >
              My Skills
            </h3>
            <p className="max-w-xl text-sm leading-7 text-gray-400 sm:text-base sm:leading-8">
              Proficient in HTML, CSS, and JavaScript. I create responsive,
              visually appealing websites with a strong focus on user
              experience, clean design, and smooth interaction. Always improving
              and learning new techniques to stay creative and effective.
            </p>
            <a
              href="#projects"
              className="inline-flex w-full items-center justify-center rounded bg-[#c7a76c] px-6 py-3 font-semibold text-[#0b1220] shadow transition-colors hover:bg-[#d8bd87] sm:w-fit"
            >
              See Project
            </a>
          </div>
        </div>
      </div>

      {/* ── 3D Pins ── */}
      <div className="mx-auto mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <p className="mb-2 text-center text-xs font-semibold uppercase tracking-[0.28em] text-green-400">
          Core Pillars
        </p>
        <h3
          className="mb-12 text-center text-xl font-bold sm:text-2xl"
          style={{ color: "var(--p-text)" }}
        >
          Hover to explore each stack
        </h3>
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:justify-center sm:gap-12">
          {PINS.map((pin) => (
            <PinContainer key={pin.title} title={pin.label} href={pin.href}>
              <PinCardContent pin={pin} />
            </PinContainer>
          ))}
        </div>
      </div>
    </section>
  );
}
