import AnimatedContent from "./AnimatedContent.jsx";
import SpotlightCard from "./SpotlightCard.jsx";

const services = [
  {
    icon: "ri-layout-4-line",
    title: "Web Interfaces",
    description:
      "Clean, responsive interfaces with a strong focus on usability, motion, and consistent design systems.",
    bullets: ["Landing pages", "Portfolio sites", "Interactive UI"],
  },
  {
    icon: "ri-terminal-box-line",
    title: "Python Automation",
    description:
      "Task automation, data processing, and internal tooling that save time and reduce repetitive work.",
    bullets: ["Scripts", "Data workflows", "Custom tools"],
  },
  {
    icon: "ri-cloud-line",
    title: "Cloud Deployment",
    description:
      "Deployment-ready projects with scalable hosting, environment setup, and production-minded delivery.",
    bullets: ["AWS basics", "Hosting", "Deployment flows"],
  },
  {
    icon: "ri-router-line",
    title: "Networking Foundation",
    description:
      "Practical networking knowledge that supports reliable app delivery and infrastructure understanding.",
    bullets: ["Cisco basics", "Troubleshooting", "Topology awareness"],
  },
];

export default function ServicesShowcase() {
  return (
    <section id="services" className="bg-[#0b1220] px-4 py-16 text-white sm:px-6 sm:py-20 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <AnimatedContent distance={28} className="mb-12 text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.28em] text-[#e6d3aa]">
            Services
          </p>
          <h2 className="text-3xl font-black sm:text-4xl">Useful skills. Clean execution. Better outcomes.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base sm:leading-8">
            I focus on work that helps products feel sharper, launch faster, and stay easier to maintain.
          </p>
        </AnimatedContent>

        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {services.map((service, index) => (
            <AnimatedContent key={service.title} distance={32} delay={index * 0.08} className="h-full">
              <SpotlightCard className="flex h-full flex-col border-white/10 bg-white/[0.03] p-6" spotlightColor="rgba(199, 167, 108, 0.14)">
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#c7a76c]/10 text-3xl text-[#e6d3aa]">
                  <i className={service.icon} />
                </div>
                <h3 className="mb-3 text-xl font-bold text-white">{service.title}</h3>
                <p className="mb-6 text-sm leading-7 text-slate-300">{service.description}</p>
                <div className="mt-auto flex flex-wrap gap-2">
                  {service.bullets.map((bullet) => (
                    <span key={bullet} className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
                      {bullet}
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
