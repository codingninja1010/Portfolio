import { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

export default function TiltCard({ children, className = "", maxTilt = 12, hoverScale = 1.03 }) {
  const prefersReducedMotion = useReducedMotion();
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const spring = { stiffness: 160, damping: 16, mass: 0.35 };
  const rsx = useSpring(rx, spring);
  const rsy = useSpring(ry, spring);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const px = x / r.width - 0.5;
    const py = y / r.height - 0.5;
    rx.set(-py * maxTilt);
    ry.set(px * maxTilt);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ rotateX: rsx, rotateY: rsy, transformStyle: "preserve-3d" }}
      whileHover={prefersReducedMotion ? {} : { scale: hoverScale }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
    >
      {children}
    </motion.div>
  );
}
