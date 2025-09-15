import { useEffect, useState } from "react";

/**
 * useActiveSection
 * Observe sections by their ids and return the currently active section id based on viewport intersection.
 * Useful for nav highlighting. SSR-safe and degrades gracefully.
 */
export function useActiveSection(sectionIds, options = {}) {
  const { rootMargin = "-40% 0px -50% 0px" } = options;
  const [active, setActive] = useState(sectionIds?.[0] || null);

  useEffect(() => {
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      setActive(sectionIds?.[0] || null);
      return;
    }
    const sections = (sectionIds || [])
      .map((id) => document.getElementById(id) || document.querySelector(`#${id}`))
      .filter(Boolean);

    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio that's intersecting
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target?.id) setActive(visible.target.id);
      },
      { root: null, rootMargin, threshold: [0.1, 0.25, 0.5, 0.75, 1] }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [JSON.stringify(sectionIds), rootMargin]);

  return active;
}
