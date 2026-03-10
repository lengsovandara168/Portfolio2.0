import AnimatedContent from "./AnimatedContent.jsx";
import SpotlightCard from "./SpotlightCard.jsx";
import Squares from "./Squares.jsx";
import BlurText from "./BlurText.jsx";
import ShinyText from "./ShinyText.jsx";
import Magnet from "./Magnet.jsx";

const techStack = [
  { name: "React", icon: "ri-reactjs-line" },
  { name: "Next.js", icon: "ri-code-s-slash-line" },
  { name: "Flutter", icon: "ri-smartphone-line" },
  { name: "Tailwind", icon: "ri-palette-line" },
  { name: "Supabase", icon: "ri-database-2-line" },
  { name: "Python", icon: "ri-terminal-box-line" },
];

export default function BentoGridShowcase() {
  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#0b1220] px-4 py-20 sm:px-6 lg:px-8"
    >
      {/* Interactive Squares Background */}
      <div className="absolute inset-0 z-0 opacity-30">
        <Squares
          direction="diagonal"
          speed={0.5}
          squareSize={40}
          borderColor="rgba(255,255,255,0.05)"
          hoverFillColor="rgba(199,167,108,0.15)" // Golden accent
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        <AnimatedContent distance={26} className="mb-12 max-w-3xl">
          <div className="mb-3 text-sm font-medium uppercase tracking-[0.32em] text-[#e6d3aa]">
            <ShinyText
              text="Overview"
              disabled={false}
              speed={3}
              className="custom-class"
            />
          </div>

          <BlurText
            text="Building scalable web and mobile experiences."
            delay={50}
            animateBy="words"
            direction="top"
            className="text-4xl font-black leading-tight tracking-[-0.03em] text-white sm:text-5xl"
          />
        </AnimatedContent>

        <div className="grid auto-rows-[minmax(220px,auto)] gap-5 md:grid-cols-2 xl:grid-cols-6">
          {/* Main Focus: Experience */}
          <AnimatedContent distance={28} className="xl:col-span-4">
            <SpotlightCard
              className="h-full border-white/10 bg-[#0b1220]/60 p-6 backdrop-blur-md md:p-8"
              spotlightColor="rgba(199, 167, 108, 0.18)"
            >
              <p className="mb-4 text-sm uppercase tracking-[0.28em] text-[#e6d3aa]">
                Experience
              </p>
              <h3 className="max-w-2xl text-3xl font-bold leading-tight text-white sm:text-4xl">
                Software Engineering @ AUPP & GovTech @ MPTC.
              </h3>
              <p className="mt-5 max-w-2xl text-sm leading-8 text-slate-300 sm:text-base">
                Building public-facing digital infrastructure at the Ministry of
                Post and Telecommunications. Focused on robust full-stack
                architectures and high-performance mobile UI.
              </p>
            </SpotlightCard>
          </AnimatedContent>

          {/* Tech Stack: Toolkit */}
          <AnimatedContent distance={28} delay={0.06} className="xl:col-span-2">
            <SpotlightCard
              className="h-full border-white/10 bg-[#0b1220]/60 p-6 backdrop-blur-md md:p-8"
              spotlightColor="rgba(255, 255, 255, 0.12)"
            >
              <p className="mb-4 text-sm uppercase tracking-[0.28em] text-[#e6d3aa]">
                Toolkit
              </p>
              <div className="grid grid-cols-2 gap-3">
                {techStack.map((item) => (
                  <Magnet
                    key={item.name}
                    padding={20}
                    disabled={false}
                    magnetStrength={3}
                  >
                    <div className="rounded-2xl bg-white/[0.03] p-4 text-slate-200 border border-white/5 transition-colors hover:bg-white/[0.08] cursor-pointer">
                      <i
                        className={`${item.icon} mb-3 block text-xl text-white`}
                      />
                      <span className="text-sm font-medium">{item.name}</span>
                    </div>
                  </Magnet>
                ))}
              </div>
            </SpotlightCard>
          </AnimatedContent>

          {/* Languages & Interests */}
          <AnimatedContent distance={28} delay={0.12} className="xl:col-span-2">
            <SpotlightCard
              className="h-full border-white/10 bg-[#0b1220]/60 p-6 backdrop-blur-md md:p-8 flex flex-col justify-center"
              spotlightColor="rgba(148, 163, 184, 0.18)"
            >
              <p className="mb-6 text-sm uppercase tracking-[0.28em] text-[#e6d3aa]">
                Languages
              </p>
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 border border-white/10">
                  Khmer
                </span>
                <span className="rounded-full bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 border border-white/10">
                  English
                </span>
                <span className="rounded-full  bg-white/5 px-4 py-2 text-sm font-medium text-slate-200 border border-white/10">
                  Mandarin
                </span>
              </div>
            </SpotlightCard>
          </AnimatedContent>

          {/* Active Development: FYP */}
          <AnimatedContent distance={28} delay={0.18} className="xl:col-span-4">
            <SpotlightCard
              className="h-full border-white/10 bg-[#0b1220]/60 p-6 backdrop-blur-md md:p-8"
              spotlightColor="rgba(199, 167, 108, 0.16)"
            >
              <p className="mb-4 text-sm uppercase tracking-[0.28em] text-[#e6d3aa]">
                Active Development
              </p>
              <h3 className="text-2xl font-bold text-white sm:text-3xl">
                AI Chatbot for Cambodian Agriculture
              </h3>
              <p className="mt-4 max-w-3xl text-sm leading-8 text-slate-300 sm:text-base">
                Engineering a localized LLM solution designed to assist local
                farmers. Leveraging RAG (Retrieval-Augmented Generation) to
                deliver actionable, culturally relevant agricultural insights in
                Khmer.
              </p>
            </SpotlightCard>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}
