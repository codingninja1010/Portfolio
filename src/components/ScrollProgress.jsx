import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const prefersReducedMotion = useReducedMotion();

  // Smooth progress for width
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 28, mass: 0.25 });

  // Fade in the bar after a tiny scroll, and slightly grow its thickness
  const opacity = useTransform(scrollYProgress, [0, 0.02], [0, 1]);
  const scaleY = prefersReducedMotion
    ? 1
    : useTransform(scrollYProgress, [0, 0.2], [0.7, 1]);

  // Animate gradient position / hue subtly as you scroll
  const bgPosX = useTransform(scrollYProgress, (v) => `${v * 100}%`);
  const hueMV = useTransform(scrollYProgress, [0, 1], [0, 90]);

  // Dot indicator position at the end of the bar
  const dotLeft = useTransform(scrollYProgress, (v) => `${v * 100}%`);

  return (
    <div className="fixed inset-x-0 top-0 z-[1200] pointer-events-none select-none">
      <motion.div
        className="relative mx-auto h-1.5 w-full"
        style={{ opacity, scaleY, originY: 0 }}
      >
        {/* Track */}
        <div className="absolute inset-0 bg-black/15 backdrop-blur-[1px]" />

        {/* Fill with animated gradient */}
        <motion.div
          className="absolute inset-y-0 left-0 origin-left"
          style={{
            scaleX,
            backgroundImage:
              "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--secondary)), hsl(var(--accent)))",
            backgroundSize: "200% 100%",
            backgroundPositionX: prefersReducedMotion ? "50%" : bgPosX,
            filter: prefersReducedMotion ? "none" : hueMV.to((h) => `hue-rotate(${h}deg)`),
          }}
        />

        {/* Soft glow under the fill */}
        <motion.div
          className="absolute inset-y-0 left-0 origin-left"
          style={{
            scaleX,
            boxShadow: "0 6px 18px hsl(var(--primary) / 0.35)",
            opacity: 0.6,
          }}
        />

        {/* Progress dot at the end */}
        <motion.div
          className="absolute top-1/2 -translate-y-1/2 h-3 w-3 rounded-full"
          style={{
            left: dotLeft,
            translateX: "-50%",
            background: "white",
            boxShadow: "0 0 0 2px hsl(var(--primary)), 0 0 18px hsl(var(--primary) / 0.6)",
            opacity: 0.95,
          }}
          animate={prefersReducedMotion ? undefined : { scale: [1, 1.12, 1] }}
          transition={prefersReducedMotion ? undefined : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}
