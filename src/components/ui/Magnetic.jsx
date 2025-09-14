import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export default function Magnetic({ children, strength = 0.25, className = "" }) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.25 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.25 });

  const onMove = (e) => {
    if (prefersReducedMotion) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    const d = Math.hypot(px, py);
    const m = Math.min(1, d * 2) * strength * 40; // max px
    x.set(px * m);
    y.set(py * m);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ display: "inline-block", x: sx, y: sy }}
      className={className}
    >
      {children}
    </motion.span>
  );
}
