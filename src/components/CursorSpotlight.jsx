import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Global cursor spotlight overlay.
 * - Skips on touch/coarse pointers and when prefers-reduced-motion is enabled.
 * - Lightweight; attaches to document root and follows cursor via CSS variables.
 */
export default function CursorSpotlight() {
  const prefersReducedMotion = useReducedMotion();
  const enabledRef = useRef(false);

  useEffect(() => {
    const root = document.documentElement;
    const mq = window.matchMedia('(pointer: fine)');
    const isFinePointer = mq.matches;
    enabledRef.current = isFinePointer && !prefersReducedMotion;
    if (!enabledRef.current) return;

    const onMove = (e) => {
      root.style.setProperty('--cursor-x', `${e.clientX}px`);
      root.style.setProperty('--cursor-y', `${e.clientY}px`);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;
  // Render an overlay div which uses the CSS variables; visibility handled via CSS
  return <div className="cursor-spotlight-overlay pointer-events-none fixed inset-0 z-[5]" aria-hidden />;
}
