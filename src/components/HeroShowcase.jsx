import AnimatedContent from "./AnimatedContent.jsx";
import ProfileCard from "./ProfileCard.jsx";
import SplitText from "./SplitText.jsx";

const GMAIL_COMPOSE_URL =
  "https://mail.google.com/mail/?view=cm&fs=1&to=lengsovandara7@gmail.com&su=Portfolio%20Inquiry";

export default function HeroShowcase() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-[#0b1220] px-4 pb-10 pt-20 text-white sm:px-6 sm:pb-20 sm:pt-28 lg:px-8 lg:pb-28 lg:pt-32"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(199,167,108,0.16),transparent_25%),radial-gradient(circle_at_bottom_right,rgba(148,163,184,0.12),transparent_26%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="grid gap-6 md:grid-cols-[minmax(0,1fr)_320px] md:items-end md:gap-10 lg:grid-cols-[minmax(0,1fr)_380px]">
          <div>
            <div className="mb-6 max-w-6xl">
              <SplitText
                text="Leng Sovandara."
                tag="h1"
                splitType="chars"
                delay={32}
                duration={0.9}
                ease="power4.out"
                textAlign="left"
                from={{ opacity: 0, y: 60 }}
                to={{ opacity: 1, y: 0 }}
                className="text-4xl font-black leading-[0.95] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl xl:text-[6.5rem]"
              />
            </div>

            <AnimatedContent
              distance={28}
              delay={0.12}
              duration={0.85}
              className="mb-6 max-w-3xl sm:mb-10"
            >
              <p className="text-lg leading-8 text-slate-200 sm:text-xl lg:text-2xl">
                Full-Stack Developer. Transforming ideas into high-performance
                products.
              </p>
              <p className="mt-4 text-base leading-8 text-slate-300 sm:text-lg">
                I specialize in full-stack web and mobile development using
                React, Next.js, and Flutter.
              </p>
            </AnimatedContent>

            <AnimatedContent
              distance={24}
              delay={0.18}
              duration={0.8}
              className="mb-8 md:mb-12"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href="#projects"
                  className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-[#0b1220] transition hover:bg-green-500 sm:w-auto"
                >
                  View Work
                </a>
                <a
                  href={GMAIL_COMPOSE_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-[#c7a76c]/40 hover:text-[#f3e3bf] sm:w-auto"
                >
                  Contact
                </a>
              </div>
            </AnimatedContent>
          </div>

          <AnimatedContent
            distance={20}
            delay={0.26}
            duration={0.8}
            className="w-full px-4 sm:px-0 md:justify-self-end"
          >
            <div
              id="hero-profile-card"
              className="relative mx-auto flex w-full max-w-[320px] items-center justify-center 
               sm:max-w-[380px] md:max-w-none 
               aspect-[3/4] sm:aspect-auto"
            >
              <ProfileCard
                avatarUrl="/assets/img/dara.jpg"
                miniAvatarUrl="/assets/img/dara.jpg"
                name="Leng Sovandara"
                title="Software Engineer"
                handle="lengsovandara"
                status="Full-stack & mobile developer"
                contactText="Contact"
                iconUrl="/assets/logo/lsd_logo.png"
                grainUrl="/assets/img/ctm.png"
                behindGlowEnabled={true}
                behindGlowColor="rgba(199,167,108,0.22)"
                behindGlowSize="65%"
                onContactClick={() => {
                  window.open(
                    GMAIL_COMPOSE_URL,
                    "_blank",
                    "noopener,noreferrer",
                  );
                }}
              />
            </div>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
}
