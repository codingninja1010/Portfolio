import React, { useRef, forwardRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

const Magnetic = forwardRef(function Magnetic(
  { children, strength = 0.25, className = "", style, onMouseMove, onMouseLeave, ...rest },
  forwardedRef
) {
  const prefersReducedMotion = useReducedMotion();
  const localRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.25 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.25 });

  const setRefs = (node) => {
    localRef.current = node;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  const handleMove = (e) => {
    onMouseMove?.(e);
    if (prefersReducedMotion) return;
    const el = localRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    const d = Math.hypot(px, py);
    const m = Math.min(1, d * 2) * strength * 40; // max px
    x.set(px * m);
    y.set(py * m);
    // Update spotlight CSS vars on both wrapper and first child (anchor/button)
    const mx = e.clientX - r.left;
    const my = e.clientY - r.top;
    el.style.setProperty("--mx", `${mx}px`);
    el.style.setProperty("--my", `${my}px`);
    const child = el.firstElementChild;
    if (child) {
      child.style.setProperty("--mx", `${mx}px`);
      child.style.setProperty("--my", `${my}px`);
    }
  };

  const handleLeave = (e) => {
    onMouseLeave?.(e);
    x.set(0);
    y.set(0);
    const el = localRef.current;
    if (el) {
      el.style.setProperty("--mx", `50%`);
      el.style.setProperty("--my", `50%`);
      const child = el.firstElementChild;
      if (child) {
        child.style.setProperty("--mx", `50%`);
        child.style.setProperty("--my", `50%`);
      }
    }
  };

  return (
    <motion.span
      ref={setRefs}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ display: "inline-block", x: sx, y: sy, ...style }}
      className={className}
      {...rest}
    >
      {children}
    </motion.span>
  );
});

export default Magnetic;
