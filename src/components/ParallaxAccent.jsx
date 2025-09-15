import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * ParallaxAccent
 * Simple decorative gradient blob that moves subtly while the section scrolls.
 * - Provide color, size, and offset props for placement
 * - Honors prefers-reduced-motion
 */
export default function ParallaxAccent({
  className = "",
  colorFrom = "var(--primary)",
  colorTo = "var(--secondary)",
  size = 360,
  offsetX = -120,
  offsetY = 0,
  intensity = 40,
}) {
  const ref = useRef(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const y = prefersReducedMotion
    ? 0
    : useTransform(scrollYProgress, [0, 1], [offsetY - intensity, offsetY + intensity]);
  const x = prefersReducedMotion
    ? 0
    : useTransform(scrollYProgress, [0, 1], [offsetX - intensity * 0.6, offsetX + intensity * 0.6]);

  return (
    <div ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 ${className}`}>
      <motion.div
        style={{
          x,
          y,
          width: size,
          height: size,
          left: `max(0px, ${size * -0.3}px)`,
          top: `max(0px, ${size * -0.2}px)`,
          background: `radial-gradient(${size * 0.8}px ${size * 0.6}px at center, hsl(${colorFrom} / 0.16), transparent 70%)`,
          filter: "blur(18px)",
          mixBlendMode: "screen",
          opacity: 0.36,
        }}
      />
      <motion.div
        style={{
          x,
          y,
          width: size * 0.7,
          height: size * 0.7,
          right: `max(0px, ${size * -0.2}px)`,
          bottom: `max(0px, ${size * -0.15}px)`,
          position: "absolute",
          background: `radial-gradient(${size * 0.6}px ${size * 0.45}px at center, hsl(${colorTo} / 0.15), transparent 70%)`,
          filter: "blur(16px)",
          mixBlendMode: "screen",
          opacity: 0.3,
        }}
      />
    </div>
  );
}
