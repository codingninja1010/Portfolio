import React, { useEffect, useRef, useState } from "react";
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
}) {
  const prefersReducedMotion = useReducedMotion();
  const [idx, setIdx] = useState(prefersReducedMotion ? text.length : 0);
  const startedRef = useRef(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (!start || startedRef.current || prefersReducedMotion) return;
    startedRef.current = true;

    const kickoff = () => {
      timerRef.current = setInterval(() => {
        setIdx((i) => {
          const next = i + 1;
          if (next >= text.length) {
            clearInterval(timerRef.current);
            timerRef.current = null;
            onDone?.();
          }
          return Math.min(next, text.length);
        });
      }, Math.max(8, speed));
    };

    if (delay > 0) {
      const d = setTimeout(kickoff, delay);
      return () => {
        clearTimeout(d);
        if (timerRef.current) clearInterval(timerRef.current);
      };
    } else {
      kickoff();
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [start, delay, speed, text.length, prefersReducedMotion, onDone]);

  const visible = prefersReducedMotion ? text : text.slice(0, idx);
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
