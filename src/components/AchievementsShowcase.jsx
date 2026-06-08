import { useEffect, useRef, useState } from "react";
import AnimatedContent from "./AnimatedContent.jsx";
import SpotlightCard from "./SpotlightCard.jsx";

/* ─── Stats ─── */
const STATS = [
  { value: 5, suffix: "+", label: "Projects Shipped" },
  { value: 3, suffix: "+", label: "Years Learning" },
  { value: 4, suffix: "", label: "Tech Stacks" },
  { value: 2, suffix: "+", label: "Internship Roles" },
];

/* ─── Achievements ─── */
const ACHIEVEMENTS = [
  {
    icon: "ri-government-line",
    category: "Professional",
    categoryColor: "#38bdf8",
    title: "Government Infrastructuare Internship",
    description:
      "Contributed to digital transformation and network-related initiatives at a government agency, working on production-grade infrastructure used at national scale.",
    year: "2025",
    tags: ["Digital Gov", "Networking", "Infrastructure"],
  },
  {
    icon: "ri-graduation-cap-line",
    category: "Academic",
    categoryColor: "#a78bfa",
    title: "Software Engineering at AUPP",
    description:
      "Enrolled in the rigorous international Software Engineering program at the American University of Phnom Penh, building a world-class foundation in CS fundamentals.",
    year: "2023",
    tags: ["AUPP", "Computer Science", "Algorithms"],
  },
  {
    icon: "ri-calendar-event-line",
    category: "Project Launch",
    categoryColor: "#c7a76c",
    title: "EventKH Platform",
    description:
      "Led full-stack development of EventKH, a Cambodian event discovery and management platform, from architecture to deployment.",
    year: "2026",
    tags: ["Full-Stack", "React", "Node.js"],
  },
  {
    icon: "ri-plant-line",
    category: "Project Launch",
    categoryColor: "#4ade80",
    title: "AgriTech Management System",
    description:
      "Delivered a complete agricultural technology management system helping local farmers digitize their operations and improve productivity.",
    year: "2025",
    tags: ["AgriTech", "Flutter", "Backend"],
  },
  {
    icon: "ri-store-2-line",
    category: "Project",
    categoryColor: "#fb923c",
    title: "ST POS — Point of Sale System",
    description:
      "Designed and built a full-featured Point of Sale system for retail, complete with inventory management, billing, and reporting dashboards.",
    year: "2025",
    tags: ["POS", "Retail", "Dashboard"],
  },
  {
    icon: "ri-translate-2",
    category: "Personal Growth",
    categoryColor: "#f472b6",
    title: "Multilingual Proficiency",
    description:
      "Actively studying Chinese (Mandarin) in addition to native Khmer and professional English, enabling cross-cultural collaboration across the region.",
    year: "Ongoing",
    tags: ["Khmer", "English", "Chinese"],
  },
];

/* ─── Animated counter ─── */
function Counter({ target, suffix }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const duration = 1400;
          const step = 16;
          const increment = target / (duration / step);
          const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(start));
            }
          }, step);
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

/* ─── Main export ─── */
export default function AchievementsShowcase() {
  return (
    <section
      id="achievements"
      className="relative overflow-hidden bg-[#0b1220] px-4 py-16 text-white sm:px-6 sm:py-24 lg:px-8"
    >
      {/* Decorative background glows */}
      <div className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 h-72 w-full max-w-3xl bg-[#c7a76c]/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 bg-[#38bdf8]/5 blur-[100px]" />

      <div className="relative mx-auto max-w-7xl">
        {/* ── Section header ── */}
        <AnimatedContent distance={26} className="mb-16">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.32em] text-[#e6d3aa]">
            Achievements
          </p>
          <h2 className="text-4xl font-black leading-tight tracking-[-0.03em] text-white sm:text-5xl uppercase">
            Milestones &amp; Wins
          </h2>
          <p className="mt-4 max-w-xl text-base leading-8 text-slate-300">
            Key accomplishments across academics, professional work, and side
            projects that define my journey so far.
          </p>
        </AnimatedContent>

        {/* ── Animated stat counters ── */}
        <AnimatedContent distance={20} delay={0.05} className="mb-20">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {STATS.map((stat, i) => (
              <div
                key={stat.label}
                className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-6 text-center"
              >
                <span className="text-4xl font-black tracking-tight text-[#c7a76c] sm:text-5xl">
                  <Counter target={stat.value} suffix={stat.suffix} />
                </span>
                <span className="mt-2 text-xs font-medium uppercase tracking-[0.2em] text-slate-400">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </AnimatedContent>

        {/* ── Achievement cards grid ── */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {ACHIEVEMENTS.map((item, index) => (
            <AnimatedContent
              key={item.title}
              distance={32}
              delay={index * 0.07}
              className="h-full"
            >
              <SpotlightCard
                className="flex h-full flex-col border-white/10 bg-white/[0.03] p-6"
                spotlightColor={`${item.categoryColor}22`}
              >
                {/* Card header */}
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-2xl"
                    style={{
                      background: `${item.categoryColor}18`,
                      color: item.categoryColor,
                    }}
                  >
                    <i className={item.icon} />
                  </div>
                  <span className="mt-1 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-400">
                    {item.year}
                  </span>
                </div>

                {/* Category label */}
                <p
                  className="mb-2 text-xs font-bold uppercase tracking-[0.22em]"
                  style={{ color: item.categoryColor }}
                >
                  {item.category}
                </p>

                {/* Title */}
                <h3 className="mb-3 text-lg font-bold leading-snug text-white">
                  {item.title}
                </h3>

                {/* Description */}
                <p className="mb-5 text-sm leading-7 text-slate-300 flex-1">
                  {item.description}
                </p>

                {/* Tags */}
                <div className="mt-auto flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </SpotlightCard>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
