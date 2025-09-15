import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Global cursor spotlight overlay.
 * - Skips on touch/coarse pointers and when prefers-reduced-motion is enabled.
 * - Uses rAF-throttled transform on a small element to avoid full-screen repaints.
 */
export default function CursorSpotlight() {
  const prefersReducedMotion = useReducedMotion();
  const enabledRef = useRef(false);
  const dotRef = useRef(null);
  const rafRef = useRef(0);
  const posRef = useRef({ x: 0, y: 0 });
  const pendingRef = useRef(false);

  useEffect(() => {
    const mq = window.matchMedia('(pointer: fine)');
    const isFinePointer = mq.matches;
    enabledRef.current = isFinePointer && !prefersReducedMotion;
    if (!enabledRef.current) return;

    const update = () => {
      pendingRef.current = false;
      const el = dotRef.current;
      if (!el) return;
      // Center the spotlight around the pointer
      const w = 240; // must match CSS
      const h = 180; // must match CSS
      const { x, y } = posRef.current;
      el.style.transform = `translate3d(${x - w / 2}px, ${y - h / 2}px, 0)`;
    };

    const onMove = (e) => {
      posRef.current.x = e.clientX;
      posRef.current.y = e.clientY;
      if (pendingRef.current) return;
      pendingRef.current = true;
      rafRef.current = requestAnimationFrame(update);
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('pointermove', onMove);
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;
  return (
    <div className="cursor-spotlight-overlay pointer-events-none fixed inset-0 z-[5]" aria-hidden>
      <div ref={dotRef} className="cursor-spotlight-dot will-change-transform" />
    </div>
  );
}
