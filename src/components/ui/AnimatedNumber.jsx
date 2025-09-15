import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

/**
 * AnimatedNumber
 * Props: value (number), duration (ms), formatter (fn), className
 */
export default function AnimatedNumber({ value, duration = 1200, formatter = (n) => Math.round(n).toLocaleString(), className = "" }) {
  const prefersReducedMotion = useReducedMotion();
  const { ref, inView } = useScrollReveal({ once: true, amount: 0.5, y: 8, duration: 0.4 });
  const [display, setDisplay] = useState(prefersReducedMotion ? value : 0);
  const startRef = useRef(0);
  const rafRef = useRef(0);

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplay(value);
      return;
    }
    if (!inView) return;
    const start = performance.now();
    startRef.current = start;
    const from = 0;
    const to = Number(value) || 0;

    const animate = (t) => {
      const elapsed = t - startRef.current;
      const progress = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
      const current = from + (to - from) * eased;
      setDisplay(current);
      if (progress < 1) rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [inView, value, duration, prefersReducedMotion]);

  return (
    <span ref={ref} className={className}>
      {formatter(display)}
    </span>
  );
}
