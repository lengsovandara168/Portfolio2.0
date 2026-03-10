import Stepper, { Step } from "./Stepper.jsx";
import ShinyText from "./ShinyText.jsx";

const journey = [
  {
    year: "2019",
    title: "Started University",
    description:
      "Began my software and engineering journey at AUPP, building a strong foundation in problem-solving and core development principles.",
    tags: ["AUPP", "Computer Science", "Foundations"],
  },
  {
    year: "2022",
    title: "First Internship",
    description:
      "Worked with real teams and projects, learning professional workflow, collaboration, and practical execution under deadlines.",
    tags: ["Teamwork", "Workflow", "Professional Growth"],
  },
  {
    year: "2023",
    title: "Front-end Developer",
    description:
      "Focused on building responsive UI, modern interactions, and performance-minded interfaces for real users.",
    tags: ["React", "UI/UX", "Responsive Web"],
  },
  {
    year: "2025",
    title: "MPTC Internship",
    description:
      "Contributed to digital transformation and network-related initiatives while improving practical engineering confidence.",
    tags: ["Government Tech", "Digital Transformation", "Infrastructure"],
  },
];

export default function ExperienceStepper() {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-4 sm:p-6">
      <div className="mb-4 px-2">
        <p className="mb-1 text-xs uppercase tracking-[0.26em] text-[#e6d3aa]">Experience Journey</p>
        <ShinyText
          text="My growth timeline"
          speed={3.2}
          className="text-2xl font-bold"
          color="#dbeafe"
          shineColor="#c7a76c"
        />
      </div>

      <Stepper
        initialStep={1}
        stepCircleContainerClassName="bg-transparent border-white/10"
        stepContainerClassName="pt-6"
        contentClassName="pb-2"
        footerClassName="pt-2"
        backButtonText="Previous"
        nextButtonText="Next"
        backButtonProps={{ className: "text-slate-300 hover:text-white" }}
        nextButtonProps={{ className: "rounded-full bg-[#c7a76c] px-4 py-2 font-semibold text-[#0b1220] hover:bg-[#d8bd87]" }}
      >
        {journey.map((item) => (
          <Step key={item.year + item.title}>
            <div className="rounded-2xl border border-white/10 bg-[#121a2b] p-5">
              <div className="mb-3 inline-flex items-center rounded-full border border-[#c7a76c]/30 bg-[#c7a76c]/10 px-3 py-1 text-xs font-semibold text-[#e6d3aa]">
                {item.year}
              </div>
              <h3 className="mb-2 text-xl font-bold text-white">{item.title}</h3>
              <p className="mb-4 text-sm leading-7 text-slate-300">{item.description}</p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Step>
        ))}
      </Stepper>
    </div>
  );
}
