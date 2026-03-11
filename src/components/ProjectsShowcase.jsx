import AnimatedContent from "./AnimatedContent.jsx";
import { FlippingCard } from "@/components/ui/flipping-card";
import { HeroParallax } from "@/components/ui/hero-parallax";

export default function ProjectsShowcase({ projects }) {
  const source = Array.isArray(projects) ? projects : [];
  const projectList = source;

  const mapped = source
    .filter((project) => project?.title && project?.image)
    .map((project) => ({
      title: project.title,
      link: project.link || "#",
      thumbnail: project.image,
      role: project.role || "Project",
      description: project.description || "",
      tags: (project.tech?.length ? project.tech : project.tags || []).slice(
        0,
        6,
      ),
    }));

  const fallback = {
    title: "Project",
    link: "#",
    thumbnail: "/assets/img/dara.jpg",
    role: "Project",
    description: "More projects coming soon.",
    tags: ["Portfolio"],
  };

  const products =
    mapped.length > 0
      ? Array.from({ length: Math.max(15, mapped.length) }, (_, index) => {
          return mapped[index % mapped.length];
        })
      : Array.from({ length: 15 }, () => fallback);

  return (
    <section
      id="projects"
      style={{
        backgroundColor: "var(--p-bg)",
        color: "var(--p-text)",
      }}
    >
      <div className="relative">
        <HeroParallax
          products={products}
          heading="Projects I've Worked On"
          subheading="Interactive parallax showcase of my work "
        />
      </div>
      <div className="relative my-12 overflow-hidden px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="mb-3 text-md font-medium uppercase tracking-[0.32em] text-[#e6d3aa]">
            Projects details
          </p>
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
                    <p className="mb-4 text-sm uppercase tracking-[0.28em] text-[#b3841e]">
                      {project.role || "Project"}
                    </p>
                    <h3 className="max-w-3xl text-3xl font-black leading-tight text-[var(--p-text)] sm:text-4xl lg:text-5xl">
                      {project.title}
                    </h3>
                    <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--p-text-2)]">
                      {project.description}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-2">
                      {(project.tech?.length
                        ? project.tech
                        : project.tags || []
                      ).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-[var(--p-text-2)]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {project.highlights?.length ? (
                      <ul className="mt-8 space-y-3 text-sm text-[var(--p-text-2)]">
                        {project.highlights.map((highlight) => (
                          <li key={highlight} className="flex gap-3">
                            <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-[#c7a76c]" />
                            <span>{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    ) : null}
                  </div>

                  {project.image ? (
                    <div className="flex justify-center lg:justify-end">
                      <FlippingCard
                        width={320}
                        height={240}
                        className="border-white/10 bg-transparent shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
                        frontContent={
                          <div className="relative h-full w-full overflow-hidden rounded-xl bg-[var(--p-bg-raised)]">
                            <img
                              src={project.image}
                              alt={`${project.title} screenshot`}
                              className="h-full w-full object-cover"
                            />
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#101726]/70 via-transparent to-transparent" />
                          </div>
                        }
                        backContent={
                          <div className="flex h-full w-full flex-col rounded-xl border border-white/10 bg-transparent p-4 text-[var(--p-text-2)]">
                            <h4 className="mt-2 text-lg font-bold text-[var(--p-text)]">
                              {project.title}
                            </h4>

                            <div className="mt-3 flex flex-wrap gap-2">
                              {(project.tech?.length
                                ? project.tech
                                : project.tags || []
                              )
                                .slice(0, 4)
                                .map((tag) => (
                                  <span
                                    key={tag}
                                    className="rounded-full border border-white/15 bg-transparent px-2.5 py-1 text-[11px] text-[var(--p-text-2)]"
                                  >
                                    {tag}
                                  </span>
                                ))}
                            </div>

                            <div className="mt-auto pt-4">
                              {project.link ? (
                                <a
                                  href={project.link}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="inline-flex items-center gap-2 text-xs font-semibold text-[#f3e3bf] transition hover:text-white"
                                >
                                  Open project
                                  <i className="ri-arrow-right-up-line" />
                                </a>
                              ) : (
                                <span className="text-xs font-semibold text-slate-500">
                                  Link coming soon
                                </span>
                              )}
                            </div>
                          </div>
                        }
                      />
                    </div>
                  ) : null}
                </article>
              </AnimatedContent>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
