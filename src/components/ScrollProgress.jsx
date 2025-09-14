import { motion, useTransform, useReducedMotion, useMotionTemplate, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const prefersReducedMotion = useReducedMotion();

  // Motion value we control manually for pixel-perfect accuracy
  const progress = useMotionValue(0);
  const opacity = 1;

  // Animate gradient position / hue subtly as you scroll
  const bgPosX = useTransform(progress, (v) => `${v * 100}%`);
  const hueMV = useTransform(progress, [0, 1], [0, 90]);
  const filterMV = useMotionTemplate`hue-rotate(${hueMV}deg)`;

  // rAF-throttled scroll measurement with resize + content growth awareness
  const raf = useRef(0);
  const pending = useRef(false);

  useEffect(() => {
    const root = document.documentElement;

    const compute = () => {
      pending.current = false;
      // Use documentElement for cross-browser consistency
      const scrollTop = root.scrollTop || window.pageYOffset || 0;
      const max = Math.max(1, root.scrollHeight - root.clientHeight);
      const v = Math.min(1, Math.max(0, scrollTop / max));
      progress.set(v);
      root.style.setProperty("--scroll-progress", `${Math.round(v * 100)}%`);
    };

    const onScroll = () => {
      if (pending.current) return;
      pending.current = true;
      raf.current = requestAnimationFrame(compute);
    };

    const onResize = () => {
      // Recompute immediately on resize (affects max)
      compute();
    };

    // Observe content changes that may affect scroll height (e.g., images loading)
    const ro = new ResizeObserver(() => compute());
    ro.observe(document.body);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    // Initial measure after mount
    compute();

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, [progress]);

  return (
    <div className="fixed inset-x-0 top-0 z-[1200] pointer-events-none select-none">
      <motion.div
        className="relative mx-auto h-1.5 w-full overflow-hidden rounded-full"
        style={{ opacity }}
      >
  {/* Track */}
        <div className="absolute inset-0 bg-white/6 dark:bg-white/10 backdrop-blur-[1px] rounded-full" />

        {/* Fill with animated gradient */}
        <motion.div
          className="absolute inset-y-0 left-0 w-full origin-left rounded-full rainbow-flow"
          style={{
            scaleX: progress,
            transformOrigin: "left center",
            willChange: "transform",
            // We keep backgroundPositionX in addition to the CSS animation; it layers nicely
            backgroundPositionX: prefersReducedMotion ? "50%" : bgPosX,
            filter: prefersReducedMotion ? "none" : filterMV,
          }}
        />

        {/* Leading-edge glint */}
        <motion.div
          className="absolute top-0 h-full w-3 rounded-full pointer-events-none"
          style={{
            left: useTransform(progress, (v) => `${(v * 100).toFixed(3)}%`),
            translateX: "-50%",
            background:
              "radial-gradient(10px 8px at 50% 50%, rgba(255,255,255,0.65), rgba(255,255,255,0.1) 60%, rgba(255,255,255,0))"
          }}
          animate={prefersReducedMotion ? undefined : { opacity: [0.7, 1, 0.7] }}
          transition={prefersReducedMotion ? undefined : { duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Soft glow under the fill */}
        <motion.div
          className="absolute inset-y-0 left-0 w-full origin-left rounded-full pointer-events-none"
          style={{
            scaleX: progress,
            transformOrigin: "left center",
            willChange: "transform",
            boxShadow: "0 6px 18px hsl(var(--primary) / 0.35)",
            opacity: 0.5,
          }}
          animate={prefersReducedMotion ? undefined : { opacity: [0.35, 0.6, 0.35] }}
          transition={prefersReducedMotion ? undefined : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}
