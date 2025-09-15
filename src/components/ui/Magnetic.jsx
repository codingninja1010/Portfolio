import { useRef, forwardRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { usePrefersReducedMotion } from "@/hooks/use-reduced-motion";

const Magnetic = forwardRef(function Magnetic(
  { children, strength = 0.25, className = "", style, onMouseMove, onMouseLeave, ...rest },
  forwardedRef
) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const localRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.25 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.25 });
  const raf = useRef(0);
  const pending = useRef(false);
  const lastPos = useRef({ px: 0, py: 0, r: { left: 0, top: 0, width: 1, height: 1 } });

  const setRefs = (node) => {
    localRef.current = node;
    if (typeof forwardedRef === "function") forwardedRef(node);
    else if (forwardedRef) forwardedRef.current = node;
  };

  const handleMove = (e) => {
    onMouseMove?.(e);
    if (prefersReducedMotion) return;
    if (window.matchMedia && !window.matchMedia('(pointer: fine)').matches) return;
    const el = localRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    lastPos.current.r = r;
    lastPos.current.px = (e.clientX - r.left) / r.width - 0.5;
    lastPos.current.py = (e.clientY - r.top) / r.height - 0.5;

    const update = () => {
      pending.current = false;
      const { px, py, r } = lastPos.current;
      const d = Math.hypot(px, py);
      const m = Math.min(1, d * 2) * strength * 40; // max px
      x.set(px * m);
      y.set(py * m);
      const mx = (px + 0.5) * r.width;
      const my = (py + 0.5) * r.height;
      el.style.setProperty("--mx", `${mx}px`);
      el.style.setProperty("--my", `${my}px`);
      const child = el.firstElementChild;
      if (child) {
        child.style.setProperty("--mx", `${mx}px`);
        child.style.setProperty("--my", `${my}px`);
      }
    };

    if (pending.current) return;
    pending.current = true;
    raf.current = requestAnimationFrame(update);
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

  const handlePointerDown = (e) => {
    rest.onPointerDown?.(e);
    const el = localRef.current;
    if (!el) return;
    el.classList.add("pressed");
    const child = el.firstElementChild;
    if (child) child.classList.add("pressed");
  };

  const handlePointerUp = (e) => {
    rest.onPointerUp?.(e);
    const el = localRef.current;
    if (!el) return;
    // small delay to let the press be perceived
    setTimeout(() => {
      el.classList.remove("pressed");
      const child = el.firstElementChild;
      if (child) child.classList.remove("pressed");
    }, 120);
  };

  return (
    <motion.span
      ref={setRefs}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      style={{ display: "inline-block", x: sx, y: sy, ...style }}
      className={className}
      {...rest}
    >
      {children}
    </motion.span>
  );
});

export default Magnetic;
