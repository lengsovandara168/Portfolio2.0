import { Timeline } from "./ui/timeline.tsx";
import AnimatedContent from "./AnimatedContent.jsx";

const data = [
  {
    title: "2023",
    content: (
      <div>
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-[#c7a76c]">
          Started University
        </p>
        <p className="mb-4 text-sm leading-7 text-slate-300 md:text-base">
          Began my Software Engineering journey{" "}
          <span className="text-[#c7a76c] font-bold">
            American University of Phnom Penh
          </span>
          , immersing myself in a rigorous international curriculum. Focused on
          building a world-class foundation in computational thinking,
          algorithms, and collaborative engineering principles.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {[
            "AUPP",
            "Software Development",
            "Algorithms",
            "Problem Solving",
          ].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#c7a76c]/25 bg-[#c7a76c] px-3 py-1 text-xs font-medium text-[#644d1a]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "2024",
    content: (
      <div>
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-[#c7a76c]">
          Core Technologies & Networking
        </p>
        <p className="mb-4 text-sm leading-7 text-slate-300 md:text-base">
          Expanded core programming capabilities and foundational understanding
          of system communications by studying Python, Java, and computer
          networking principles.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {["Python", "Java", "Networking", "Backend Fundamentals"].map(
            (tag) => (
              <span
                key={tag}
                className="rounded-full border border-[#c7a76c]/25 bg-[#c7a76c]  px-3 py-1 text-xs font-medium text-[#644d1a]"
              >
                {tag}
              </span>
            ),
          )}
        </div>
      </div>
    ),
  },
  {
    title: "2025",
    content: (
      <div>
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-[#c7a76c]">
          Professional Internship
        </p>
        <p className="mb-4 text-sm leading-7 text-slate-300 md:text-base">
          Started a professional internship contributing to digital
          transformation and network-related initiatives. Improved practical
          engineering confidence while working on government-scale
          infrastructure.
        </p>
        <div className="mt-5 flex flex-wrap gap-2">
          {[
            "Government Tech",
            "Digital Transformation",
            "Infrastructure",
            "Networking",
          ].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#c7a76c]/25 bg-[#c7a76c] px-3 py-1 text-xs font-medium text-[#644d1a]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Late 2025",
    content: (
      <div>
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-[#c7a76c]">
          Building Foundations
        </p>
        <ul className="space-y-3 text-sm leading-7 text-slate-300 md:text-base">
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c7a76c]" />
            Deepened knowledge in{" "}
            <strong className="text-white font-semibold">
              &nbsp;AI, ML, and NLP&nbsp;
            </strong>{" "}
            concepts.
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c7a76c]" />
            Continued dedicated Chinese language studies.
          </li>
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c7a76c]" />
            Finalized Spring course load including Business Intelligence and Web
            Development II.
          </li>
        </ul>
        <div className="mt-5 flex flex-wrap gap-2">
          {["AI / ML", "NLP", "Chinese", "Web Dev II", "BI"].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#c7a76c]/25 bg-[#c7a76c] px-3 py-1 text-xs font-medium text-[#644d1a]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "Early 2026",
    content: (
      <div>
        <p className="mb-2 text-sm font-semibold uppercase tracking-[0.24em] text-[#c7a76c]">
          Execution & Major Projects
        </p>
        <ul className="space-y-3 text-sm leading-7 text-slate-300 md:text-base">
          <li className="flex gap-3">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[#c7a76c]" />
            Actively developing the{" "}
            <strong className="text-white font-semibold">
              &nbsp;EventKH&nbsp;
            </strong>{" "}
            platform.
          </li>
        </ul>
        <div className="mt-5 flex flex-wrap gap-2">
          {["EventKH", "Full-Stack Development"].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[#c7a76c]/25 bg-[#c7a76c] px-3 py-1 text-xs font-medium text-[#644d1a]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    ),
  },
];

export default function JourneyTimeline() {
  return (
    <section
      id="journey"
      className="relative overflow-hidden bg-[#0b1220] px-4 pb-10 pt-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <AnimatedContent distance={26} className="mb-4 max-w-3xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.32em] text-[#e6d3aa]">
            Journey
          </p>
          <h2 className="text-4xl font-black leading-tight tracking-[-0.03em] text-white sm:text-5xl uppercase">
            my Journey
          </h2>
          <p className="mt-4 max-w-xl text-base leading-8 text-slate-300">
            From first commit to government infrastructure — every milestone
            that shaped who I am as a developer.
          </p>
        </AnimatedContent>
      </div>

      <Timeline data={data} />
    </section>
  );
}
