import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * useScrollReveal
 * A lightweight, SSR-safe IntersectionObserver-based reveal hook for Framer Motion.
 *
 * Returns a ref to attach to a motion element and motion props (initial/animate/variants/transition)
 * that reveal the element when it enters the viewport. Honors prefers-reduced-motion.
 */
export function useScrollReveal(options = {}) {
  const {
    once = true,
    amount = 0.1, // trigger earlier with minimal visibility
    // Expand bottom margin so elements start revealing well before entering the viewport
    rootMargin = "0px 0px 45% 0px",
    duration = 0.25,
    delay = 0,
    ease = [0.33, 1, 0.68, 1],
    y = 12,
    blur = 0,
    scaleFrom = 1,
  } = options;

  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  const hasRevealedRef = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      setInView(true);
      hasRevealedRef.current = true;
      return;
    }
    if (typeof window === "undefined" || !("IntersectionObserver" in window)) {
      // SSR or very old browser: show immediately
      setInView(true);
      hasRevealedRef.current = true;
      return;
    }

    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Decide visible: either IO says intersecting or ratio above target amount
          const targetAmount = typeof amount === "number" ? amount : 0.2;
          const isVisible = entry.isIntersecting || entry.intersectionRatio >= targetAmount;
          if (isVisible) {
            setInView(true);
            hasRevealedRef.current = true;
            if (once) observer.unobserve(entry.target);
          } else if (!once) {
            setInView(false);
          }
        });
      },
      {
        threshold: buildThresholds(amount),
        // Some browsers are picky about spaces/percent; normalize the margin string
        rootMargin: String(rootMargin || "0px 0px 18% 0px"),
      }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [amount, once, rootMargin, prefersReducedMotion]);

  const variants = useMemo(
    () => ({
      hidden: {
        opacity: 0,
        y,
        scale: scaleFrom,
        filter: blur ? `blur(${blur}px)` : undefined,
      },
      visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: { duration, delay, ease },
      },
    }),
    [y, scaleFrom, blur, duration, delay, ease]
  );

  const motionProps = prefersReducedMotion
    ? { initial: "visible", animate: "visible", variants }
    : { initial: "hidden", animate: inView ? "visible" : "hidden", variants };

  return { ref, inView, hasRevealed: hasRevealedRef.current, motionProps };
}

function buildThresholds(amount) {
  if (typeof amount === "number") {
    // Build a small range around the amount for smoother triggering
    const a = Math.min(Math.max(amount, 0), 1);
    const steps = 5;
    const arr = [];
    for (let i = 0; i <= steps; i++) arr.push(Number((i / steps).toFixed(3)));
    if (!arr.includes(a)) arr.push(a);
    return arr.sort((x, y) => x - y);
  }
  // If amount is an object, fall back to a sensible set of thresholds
  return [0, 0.25, 0.5, 0.75, 1];
}
