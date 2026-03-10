import { useEffect, useMemo, useState } from "react";
import PillNav from "./PillNav.jsx";

export default function HeaderExperience({ items }) {
  const stableItems = useMemo(
    () => (Array.isArray(items) ? items : []),
    [items],
  );
  const [activeHref, setActiveHref] = useState(stableItems[0]?.href ?? "#home");

  useEffect(() => {
    if (!stableItems.length) return undefined;

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY + 180;
      let currentSection = stableItems[0]?.href ?? "#home";

      for (const item of stableItems) {
        if (!item.href?.startsWith("#")) continue;
        const section = document.querySelector(item.href);
        if (!section) continue;
        if (scrollPosition >= section.offsetTop) currentSection = item.href;
      }

      setActiveHref((previous) =>
        previous === currentSection ? previous : currentSection,
      );
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [stableItems]);

  return (
    <>
      <PillNav
        logo="/assets/logo/lsd_logo.png"
        logoAlt="Leng Sovandara"
        items={stableItems}
        activeHref={activeHref}
        className=""
        wrapperClassName="header-pill"
        baseColor="#0b1220"
        pillColor="#c7a76c"
        hoveredPillTextColor="#0b1220"
      />
    </>
  );
}
