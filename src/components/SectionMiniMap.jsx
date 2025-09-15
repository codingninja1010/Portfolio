import { motion } from "framer-motion";

/**
 * SectionMiniMap
 * Compact row of clickable dots representing sections on the page.
 * - Highlights the currently active section id
 * - Click scrolls with header offset compensation
 */
export default function SectionMiniMap({ sections = [], activeId }) {
  const scrollTo = (id) => {
    const el = document.getElementById(id) || document.querySelector(`#${id}`);
    if (!el) return;
    const headerEl = document.querySelector("header");
    const headerH = headerEl ? headerEl.offsetHeight : 72;
    const y = el.getBoundingClientRect().top + window.scrollY - (headerH + 20);
    window.scrollTo({ top: y, behavior: "smooth" });
  };

  return (
    <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl border border-border/50 bg-white/5">
      {sections.map((s) => {
        const isActive = s === activeId;
        return (
          <button
            key={s}
            aria-label={`Jump to ${s}`}
            onClick={() => scrollTo(s)}
            className="relative w-3.5 h-3.5 rounded-full grid place-items-center group"
          >
            {/* Outer ring */}
            <span className="absolute inset-0 rounded-full border border-white/15 group-hover:border-white/30 transition-colors" />
            {/* Dot */}
            <motion.span
              className={`block rounded-full ${isActive ? "bg-gradient-to-r from-primary to-secondary" : "bg-white/30"}`}
              style={{ width: isActive ? 10 : 6, height: isActive ? 10 : 6 }}
              animate={isActive ? { scale: [1, 1.12, 1] } : { scale: 1 }}
              transition={{ duration: 1.2, repeat: isActive ? Infinity : 0 }}
            />
          </button>
        );
      })}
    </div>
  );
}
