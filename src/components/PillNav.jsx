import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

const PillNav = ({
  logo,
  logoAlt = "Logo",
  items,
  activeHref,
  className = "",
  ease = "power3.easeOut",
  baseColor = "#fff",
  pillColor = "#060010",
  hoveredPillTextColor = "#060010",
  pillTextColor,
  onMobileMenuClick,
  initialLoadAnimation = true,
  wrapperClassName = "",
}) => {
  const resolvedPillTextColor = pillTextColor ?? baseColor;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const circleRefs = useRef([]);
  const tlRefs = useRef([]);
  const activeTweenRefs = useRef([]);
  const logoImgRef = useRef(null);
  const logoTweenRef = useRef(null);
  const hamburgerRef = useRef(null);
  const mobileMenuRef = useRef(null);
  const navItemsRef = useRef(null);
  const logoRef = useRef(null);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach((circle) => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`,
        });

        const label = pill.querySelector(".pill-label");
        const white = pill.querySelector(".pill-label-hover");

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });
        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: "auto" }, 0);

        if (label) tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: "auto" }, 0);
        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: "auto" }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();
    const onResize = () => layout();
    window.addEventListener("resize", onResize);
    document.fonts?.ready?.then(layout).catch(() => {});

    const menu = mobileMenuRef.current;
    if (menu) gsap.set(menu, { visibility: "hidden", opacity: 0, scaleY: 1, y: 0 });

    if (initialLoadAnimation) {
      if (logoRef.current) {
        gsap.set(logoRef.current, { scale: 0 });
        gsap.to(logoRef.current, { scale: 1, duration: 0.6, ease });
      }
      if (navItemsRef.current) {
        gsap.set(navItemsRef.current, { width: 0, overflow: "hidden" });
        gsap.to(navItemsRef.current, { width: "auto", duration: 0.6, ease });
      }
    }

    return () => window.removeEventListener("resize", onResize);
  }, [items, ease, initialLoadAnimation]);

  const handleEnter = (i) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), { duration: 0.3, ease, overwrite: "auto" });
  };

  const handleLeave = (i) => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, { duration: 0.2, ease, overwrite: "auto" });
  };

  const handleLogoEnter = () => {
    const img = logoImgRef.current;
    if (!img) return;
    logoTweenRef.current?.kill();
    gsap.set(img, { rotate: 0 });
    logoTweenRef.current = gsap.to(img, { rotate: 360, duration: 0.2, ease, overwrite: "auto" });
  };

  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);
    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll(".hamburger-line");
      if (newState) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
      }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: "visible" });
        gsap.fromTo(menu, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.3, ease });
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: 10,
          duration: 0.2,
          ease,
          onComplete: () => gsap.set(menu, { visibility: "hidden" }),
        });
      }
    }

    onMobileMenuClick?.();
  };

  const cssVars = {
    ["--base"]: baseColor,
    ["--pill-bg"]: pillColor,
    ["--hover-text"]: hoveredPillTextColor,
    ["--pill-text"]: resolvedPillTextColor,
    ["--nav-h"]: "clamp(40px, 5vw, 44px)",
    ["--pill-pad-x"]: "clamp(12px, 1.8vw, 18px)",
    ["--pill-gap"]: "3px",
  };

  return (
    <div className={`absolute top-3 z-[1000] w-full px-3 sm:px-4 lg:w-auto lg:px-0 ${wrapperClassName}`}>
      <nav
        className={`box-border flex w-full max-w-full items-center justify-between rounded-full border border-white/10 bg-[#0b1220]/95 px-2 py-1.5 shadow-[0_10px_30px_rgba(2,6,23,0.35)] ${className}`}
        aria-label="Primary"
        style={cssVars}
      >
        <a
          href={items?.[0]?.href || "#"}
          aria-label="Home"
          onMouseEnter={handleLogoEnter}
          ref={(el) => {
            logoRef.current = el;
          }}
          className="inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full border border-white/10 p-2"
          style={{ width: "var(--nav-h)", height: "var(--nav-h)", background: "transparent" }}
        >
          <img src={logo} alt={logoAlt} ref={logoImgRef} className="block h-full w-full object-cover" />
        </a>

        <div
          ref={navItemsRef}
          className="relative ml-2 hidden max-w-[calc(100vw-8rem)] items-center overflow-x-auto rounded-full lg:flex"
          style={{ height: "var(--nav-h)", background: "transparent" }}
        >
          <ul role="menubar" className="m-0 flex h-full list-none items-stretch p-[3px]" style={{ gap: "var(--pill-gap)" }}>
            {items.map((item, i) => {
              const isActive = activeHref === item.href;
              const isCta = Boolean(item.cta);
              return (
                <li key={item.href} role="none" className="flex h-full">
                  <a
                    role="menuitem"
                    href={item.href}
                    className={`relative inline-flex h-full cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap rounded-full px-0 text-[13px] font-semibold leading-[1] no-underline box-border transition-colors duration-200 xl:text-[15px] ${isCta ? "border px-4 text-slate-900" : "text-slate-300 hover:text-white"}`}
                    style={{
                      background: isCta ? "var(--pill-bg, #c7a76c)" : "transparent",
                      borderColor: isCta ? "rgba(199, 167, 108, 0.34)" : "transparent",
                      color: isCta ? "#0b1220" : isActive ? "#f8fafc" : "#cbd5e1",
                      paddingLeft: "var(--pill-pad-x)",
                      paddingRight: "var(--pill-pad-x)",
                    }}
                    aria-label={item.ariaLabel || item.label}
                    aria-current={isActive ? "page" : undefined}
                    onMouseEnter={isCta ? undefined : () => handleEnter(i)}
                    onMouseLeave={isCta ? undefined : () => handleLeave(i)}
                  >
                    {!isCta ? (
                      <span
                        className="hover-circle pointer-events-none absolute left-1/2 bottom-0 z-[1] block rounded-full"
                        style={{ background: "rgba(199, 167, 108, 0.16)", willChange: "transform" }}
                        aria-hidden="true"
                        ref={(el) => {
                          circleRefs.current[i] = el;
                        }}
                      />
                    ) : null}
                    <span className="label-stack relative z-[2] inline-block leading-[1]">
                      <span className="pill-label relative z-[2] inline-block leading-[1]" style={{ willChange: isCta ? "auto" : "transform" }}>
                        {item.label}
                      </span>
                      {!isCta ? (
                        <span
                          className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                          style={{ color: "#f8fafc", willChange: "transform, opacity" }}
                          aria-hidden="true"
                        >
                          {item.label}
                        </span>
                      ) : null}
                    </span>
                    {isActive && !isCta ? <span className="absolute inset-x-3 bottom-1 h-px rounded-full bg-[#c7a76c]" aria-hidden="true" /> : null}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        <button
          ref={hamburgerRef}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          className="relative flex shrink-0 flex-col items-center justify-center gap-1 rounded-full border border-white/10 p-0 lg:hidden"
          style={{ width: "var(--nav-h)", height: "var(--nav-h)", background: "transparent" }}
        >
          <span className="hamburger-line h-0.5 w-4 rounded" style={{ background: "#e2e8f0" }} />
          <span className="hamburger-line h-0.5 w-4 rounded" style={{ background: "#e2e8f0" }} />
        </button>
      </nav>

      <button
        type="button"
        aria-label="Close mobile menu"
        aria-hidden={!isMobileMenuOpen}
        tabIndex={isMobileMenuOpen ? 0 : -1}
        onClick={closeMobileMenu}
        className={`absolute inset-0 top-[3.2rem] z-[997] rounded-[2rem] bg-[#0b1220]/50 transition-all duration-300 lg:hidden ${isMobileMenuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
      />

      <div
        ref={mobileMenuRef}
        className="absolute left-3 right-3 top-[3.4rem] z-[998] origin-top rounded-[27px] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)] sm:left-4 sm:right-4 lg:hidden"
        style={{ ...cssVars, background: "#0b1220" }}
      >
        <ul className="m-0 flex list-none flex-col gap-[3px] p-[3px]">
          {items.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className={`block rounded-[50px] px-4 py-3 text-[16px] font-medium transition-all duration-200 ${item.cta ? "text-slate-900" : "text-slate-200 hover:bg-white/5"}`}
                style={{ background: item.cta ? "var(--pill-bg, #c7a76c)" : "transparent", color: item.cta ? "#0b1220" : "#e2e8f0" }}
                aria-current={activeHref === item.href ? "page" : undefined}
                onClick={closeMobileMenu}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default PillNav;
