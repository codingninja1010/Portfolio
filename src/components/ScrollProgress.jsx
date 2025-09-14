import { motion, useScroll, useSpring, useTransform, useReducedMotion, useMotionTemplate } from "framer-motion";
import { useEffect } from "react";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  // ACCURATE width tracking: use raw scrollYProgress for width (no spring lag)
  const widthMV = useTransform(scrollYProgress, (v) => `${(v * 100).toFixed(3)}%`);

  // Always visible; optionally grow thickness slightly in the first 1% of scroll
  const opacity = 1;
  const scaleYMV = useTransform(scrollYProgress, [0, 0.01], [0.85, 1]);

  // Animate gradient position / hue subtly as you scroll
  const bgPosX = useTransform(scrollYProgress, (v) => `${v * 100}%`);
  const hueMV = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const filterMV = useMotionTemplate`hue-rotate(${hueMV}deg)`;

  // (removed) dot indicator position value was unused

  // Keep a CSS variable updated for global styling hooks (e.g., scrollbar)
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (v) => {
      document.documentElement.style.setProperty("--scroll-progress", `${Math.round(v * 100)}%`);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return (
    <div className="fixed inset-x-0 top-0 z-[1200] pointer-events-none select-none">
      <motion.div
        className="relative mx-auto h-1.5 w-full overflow-hidden rounded-full"
        style={{ opacity, scaleY: prefersReducedMotion ? 1 : scaleYMV, originY: 0 }}
      >
  {/* Track */}
        <div className="absolute inset-0 bg-white/6 dark:bg-white/10 backdrop-blur-[1px] rounded-full" />

        {/* Fill with animated gradient */}
        <motion.div
          className="absolute inset-y-0 left-0 origin-left rounded-full"
          style={{
            width: widthMV,
            backgroundImage:
              "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)))",
            backgroundSize: "200% 100%",
            backgroundPositionX: prefersReducedMotion ? "50%" : bgPosX,
            filter: prefersReducedMotion ? "none" : filterMV,
          }}
        />

        {/* Leading-edge glint */}
        <motion.div
          className="absolute top-0 h-full w-3 rounded-full pointer-events-none"
          style={{ left: widthMV, translateX: "-50%",
            background:
              "radial-gradient(10px 8px at 50% 50%, rgba(255,255,255,0.65), rgba(255,255,255,0.1) 60%, rgba(255,255,255,0))"
          }}
          animate={prefersReducedMotion ? undefined : { opacity: [0.7, 1, 0.7] }}
          transition={prefersReducedMotion ? undefined : { duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Soft glow under the fill */}
        <motion.div
          className="absolute inset-y-0 left-0 origin-left rounded-full"
          style={{
            width: widthMV,
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
