import React, { useEffect, useRef, useState } from "react";
import { PinContainer } from "@/components/ui/3d-pin";

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
      { name: "Vue", icon: "https://cdn.simpleicons.org/vuedotjs/4FC08D" },
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
      { name: "MySQL", icon: "https://cdn.simpleicons.org/mysql/4479A1" },
      {
        name: "PostgreSQL",
        icon: "https://cdn.simpleicons.org/postgresql/4169E1",
      },
      { name: "Firebase", icon: "https://cdn.simpleicons.org/firebase/FFCA28" },
    ],
    desc: "Designing scalable APIs, server-side logic, and managing relational databases.",
  },
  {
    title: "Mobile App",
    href: "#projects",
    label: "Cross-Platform",
    color: "#ec4899", // Pink
    icon: "ri-smartphone-line",
    techs: [
      { name: "Flutter", icon: "https://cdn.simpleicons.org/flutter/02569B" },
    ],
    desc: "Developing seamless cross-platform mobile applications featuring native payment integrations like Bakong and ABA.",
  },

  {
    title: "Cloud & Network",
    href: "#projects",
    label: "Infrastructure",
    color: "#10b981", // Emerald
    icon: "ri-cloud-line",
    techs: [
      {
        name: "GoogleCloud",
        icon: "https://img.icons8.com/?size=100&id=WHRLQdbEXQ16&format=png&color=000000",
      },
      {
        name: "AWS",
        icon: "https://img.icons8.com/?size=100&id=mHi46t5vguiz&format=png&color=000000",
      },
      { name: "Vercel", icon: "https://cdn.simpleicons.org/vercel/FFFFFF" },
      {
        name: "Cloudflare",
        icon: "https://cdn.simpleicons.org/cloudflare/F38020",
      },
    ],
    desc: "Deploying and maintaining cloud infrastructure, API restrictions, and CI/CD pipelines.",
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
    <div className="flex h-[17rem] w-[13rem] flex-col gap-3 p-1">
      {/* header */}
      <div className="flex items-center gap-2">
        <span
          className="flex h-7 w-7 items-center justify-center rounded-full text-sm"
          style={{ background: `${pin.color}22`, color: pin.color }}
        >
          <i className={pin.icon} />
        </span>
        <span className="text-sm font-bold text-[var(--p-text)]">{pin.title}</span>
      </div>
      {/* description */}
      <p className="text-xs leading-relaxed text-[var(--p-text-2)]">{pin.desc}</p>
      {/* tech icons grid */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {pin.techs.map((t) => {
          const invertClass = t.icon.includes("FFFFFF")
            ? "dark:invert-0 invert"
            : t.icon.includes("color=000000")
            ? "dark:invert invert-0"
            : "";
          return (
            <div
              key={t.name}
              title={t.name}
              className="flex flex-col items-center gap-1 rounded-xl border border-white/10 bg-white/[0.04] px-1 py-2"
            >
              <img
                src={t.icon}
                alt={t.name}
                className={`h-5 w-5 object-contain ${invertClass}`}
              />
              <span className="text-[9px] text-[var(--p-text-2)] font-medium">{t.name}</span>
            </div>
          );
        })}
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
              Explore Featured Projects
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-y-16 gap-x-8 justify-items-center">
          {PINS.map((pin) => (
            <div
              key={pin.title}
              className="flex items-center justify-center h-[20rem] w-full"
            >
              <PinContainer title={pin.label} href={pin.href}>
                <PinCardContent pin={pin} />
              </PinContainer>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
