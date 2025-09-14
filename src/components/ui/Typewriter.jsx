import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

/**
 * Typewriter
 * - Reveals text character-by-character
 * - Respects reduced motion (shows full text immediately)
 * - Starts when `start` becomes true (after optional `delay`)
 * - Calls `onDone` once finished
 */
export default function Typewriter({
  text = "",
  speed = 24, // ms per character
  start = true,
  delay = 0,
  className = "",
  as: As = "span",
  showCaret = true,
  caretClassName = "",
  onDone,
  // If true, respect the user's reduced-motion setting and skip animation.
  // Set to false to force the typewriter effect regardless of OS/browser setting.
  respectReducedMotion = true,
}) {
  const prefersReducedMotion = useReducedMotion();
  const shouldReduce = respectReducedMotion && prefersReducedMotion;
  const [idx, setIdx] = useState(shouldReduce ? text.length : 0);
  const timerRef = useRef(null);

  useEffect(() => {
    // Respect reduced motion: immediately show full text
    if (shouldReduce) {
      setIdx(text.length);
      return;
    }

    if (!start) {
      // Not started yet; keep reset state
      setIdx(0);
      return;
    }

    // Strict Mode-safe: schedule typing and cleanup properly.
    // Always reset to 0 when (re)starting the animation.
    setIdx(0);
    let cancelled = false;

    const tick = () => {
      if (cancelled) return;
      setIdx((i) => {
        const next = i + 1;
        const done = next >= text.length;
        if (!done) {
          timerRef.current = setTimeout(tick, Math.max(8, speed));
        } else {
          timerRef.current = null;
          onDone?.();
        }
        return Math.min(next, text.length);
      });
    };

    const kickoff = () => {
      if (cancelled) return;
      timerRef.current = setTimeout(tick, Math.max(8, speed));
    };

    let timeoutId = null;
    if (delay > 0) {
      timeoutId = setTimeout(kickoff, delay);
    } else {
      kickoff();
    }

    return () => {
      cancelled = true;
      if (timeoutId) clearTimeout(timeoutId);
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [start, delay, speed, text, text.length, shouldReduce, onDone]);

  const visible = shouldReduce ? text : text.slice(0, idx);
  const done = idx >= text.length;

  return (
    <As className={className} aria-label={text} aria-live="polite">
      {visible}
      {showCaret && !done && (
        <span
          className={
            caretClassName ||
            "inline-block w-0.5 h-[1em] bg-current align-baseline ml-0.5 animate-pulse"
          }
        />
      )}
    </As>
  );
}
