import AnimatedContent from "./AnimatedContent.jsx";

export default function ProjectsShowcase({ projects }) {
  const projectList = Array.isArray(projects) ? projects : [];

  return (
    <section
      id="projects"
      className="relative overflow-hidden bg-[#0b1220] px-4 py-20 text-white sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.04),transparent_20%),radial-gradient(circle_at_bottom_right,rgba(199,167,108,0.12),transparent_28%)]" />
      <div className="relative mx-auto max-w-7xl">
        <AnimatedContent distance={26} className="mb-14 max-w-4xl">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.32em] text-[#e6d3aa]">
            Selected Projects
          </p>
          <h2 className="text-4xl font-black leading-[0.98] tracking-[-0.03em] text-white sm:text-5xl lg:text-6xl">
            Big, visual project stories. Show, don&apos;t tell.
          </h2>
        </AnimatedContent>

        <div className="space-y-16">
          {projectList.map((project, index) => (
            <AnimatedContent
              key={project.title}
              distance={34}
              delay={index * 0.08}
              className="relative"
            >
              <article className="grid gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(280px,0.8fr)] lg:gap-10">
                <div className="order-2 lg:order-none">
                  <p className="mb-4 text-sm uppercase tracking-[0.28em] text-[#e6d3aa]/80">
                    {project.role || "Project"}
                  </p>
                  <h3 className="max-w-3xl text-3xl font-black leading-tight text-white sm:text-4xl lg:text-5xl">
                    {project.title}
                  </h3>
                  <p className="mt-5 max-w-2xl text-base leading-8 text-slate-300">
                    {project.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {(project.tech?.length
                      ? project.tech
                      : project.tags || []
                    ).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-white/[0.04] px-4 py-2 text-sm text-slate-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {project.highlights?.length ? (
                    <ul className="mt-8 space-y-3 text-sm text-slate-300">
                      {project.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-3">
                          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#c7a76c]" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  ) : null}

                  <div className="mt-8">
                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-semibold text-white transition hover:text-[#f1e4c8]"
                      >
                        View project
                        <i className="ri-arrow-right-up-line" />
                      </a>
                    ) : (
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-500">
                        Link coming soon
                      </span>
                    )}
                  </div>
                </div>
                {project.image ? (
                  <div className="relative h-full overflow-hidden rounded-[1rem] bg-white/[0.04]">
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      className="h-full w-full object-cover"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#101726]/55 via-transparent to-transparent" />
                  </div>
                ) : (
                  <div className="order-1 lg:order-none">
                    <div className="rounded-[2rem] bg-white/[0.03] p-3 backdrop-blur-sm">
                      <div className="aspect-[16/11] rounded-[1.5rem] bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(10,15,25,0.92)),radial-gradient(circle_at_top_left,rgba(199,167,108,0.25),transparent_38%)] p-5 shadow-[0_20px_80px_rgba(0,0,0,0.24)]">
                        <div className="flex h-full flex-col rounded-[1.2rem] border border-white/10 bg-[#101726]/80 p-4">
                          <div className="mb-4 flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-white/25" />
                            <span className="h-2.5 w-2.5 rounded-full bg-white/20" />
                            <span className="h-2.5 w-2.5 rounded-full bg-[#c7a76c]/70" />
                          </div>
                          <div className="grid flex-1 gap-4 md:grid-cols-[1.2fr_0.8fr]">
                            <div className="rounded-[1rem] bg-white/[0.04] p-4">
                              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                                UI preview placeholder
                              </p>
                              <div className="mt-4 space-y-3">
                                <div className="h-4 w-2/3 rounded-full bg-white/10" />
                                <div className="h-24 rounded-[1rem] bg-white/[0.05]" />
                                <div className="grid grid-cols-3 gap-3">
                                  <div className="h-16 rounded-xl bg-white/[0.05]" />
                                  <div className="h-16 rounded-xl bg-white/[0.05]" />
                                  <div className="h-16 rounded-xl bg-white/[0.05]" />
                                </div>
                              </div>
                            </div>
                            <div className="space-y-3 rounded-[1rem] bg-white/[0.04] p-4">
                              <div className="h-4 w-24 rounded-full bg-white/10" />
                              <div className="h-20 rounded-[1rem] bg-white/[0.05]" />
                              <div className="h-20 rounded-[1rem] bg-white/[0.05]" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </article>
            </AnimatedContent>
          ))}
        </div>
      </div>
    </section>
  );
}
