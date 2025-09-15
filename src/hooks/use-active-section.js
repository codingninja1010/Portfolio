import { useEffect, useRef, useState } from "react";

/**
 * useActiveSection
 * Robust active section detection based on a viewport reference line (center by default).
 * This avoids cases where the first section stays active due to IntersectionObserver quirks,
 * and works reliably with tall sections.
 */
export function useActiveSection(sectionIds = [], options = {}) {
  const {
    // Line position as a fraction of the viewport height (0 = top, 0.5 = middle)
    line = 0.38,
    // Extra offset in pixels to account for a fixed header
    headerOffset = undefined,
  } = options;

  const [active, setActive] = useState(null);
  const rafRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const getHeaderOffset = () => {
      if (typeof headerOffset === "number") return headerOffset;
      const headerEl = document.querySelector("header");
      const h = headerEl ? headerEl.offsetHeight : 72;
      // plus a little breathing room so headings aren't flush
      return h + 20;
    };

    const els = (sectionIds || [])
      .map((id) => document.getElementById(id) || document.querySelector(`#${id}`))
      .filter(Boolean);
    if (!els.length) return;

    const compute = () => {
      const vpH = window.innerHeight || 1;
      const refLine = Math.max(0, Math.min(1, line)) * vpH; // y in viewport coords
      const offset = getHeaderOffset();

      // Determine which section crosses the reference line
      let currentId = null;
      let closestDist = Infinity;
      for (const el of els) {
        const rect = el.getBoundingClientRect();
        // Consider header offset by shifting the rect up
        const top = rect.top - offset;
        const bottom = rect.bottom - offset;

        // If the line is within the section bounds, it's the active one
        if (top <= refLine && bottom >= refLine) {
          currentId = el.id || null;
          closestDist = 0;
          break;
        }

        // Otherwise pick the section whose center is closest to the line
        const center = (top + bottom) / 2;
        const dist = Math.abs(center - refLine);
        if (dist < closestDist) {
          closestDist = dist;
          currentId = el.id || null;
        }
      }
      setActive(currentId);
    };

    const onScroll = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [JSON.stringify(sectionIds), line, headerOffset]);

  return active;
}
