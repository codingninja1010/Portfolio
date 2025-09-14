import { useEffect, useMemo, useRef, useState } from "react";
import { useReducedMotion, motion } from "framer-motion";

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
  // Advanced options
  words, // optional array of strings to cycle through; overrides `text` when provided
  loop = false, // true for infinite, number for fixed loops
  deleteSpeed = 18,
  holdDelay = 1200, // wait after a word completes before deleting/next
  speedJitter = 0.12, // 0..1 variability
  punctuationPause = true, // add pauses after . , ! ? : ;
  fancy = false, // render per-character motion effects and gradient text
  charStagger = 0.02, // additional per-char tiny animation when revealed
}) {
  const prefersReducedMotion = useReducedMotion();
  const shouldReduce = respectReducedMotion && prefersReducedMotion;
  const series = useMemo(() => {
    if (Array.isArray(words) && words.length > 0) return words;
    return [text];
  }, [words, text]);
  const [wordIndex, setWordIndex] = useState(0);
  const currentText = series[wordIndex] || "";

  const [idx, setIdx] = useState(shouldReduce ? currentText.length : 0);
  const [mode, setMode] = useState("typing"); // "typing" | "deleting"
  const loopsDoneRef = useRef(0);
  const timerRef = useRef(null);

  useEffect(() => {
    // Respect reduced motion: immediately show full text
    if (shouldReduce) {
      setIdx(currentText.length);
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
  setMode("typing");
  loopsDoneRef.current = 0;
    let cancelled = false;

    const randJitter = () => 1 + ((Math.random() * 2 - 1) * speedJitter);
    const getDelayForNext = (nextChar) => {
      if (!nextChar) return Math.max(8, speed) * randJitter();
      const base = Math.max(8, speed);
      if (!punctuationPause) return base * randJitter();
      const pauses = {
        ".": 260,
        ",": 160,
        "!": 240,
        "?": 240,
        ":": 180,
        ";": 180,
      };
      return (pauses[nextChar] ?? base) * randJitter();
    };

    const typeTick = () => {
      if (cancelled) return;
      setIdx((i) => {
        const next = i + 1;
        const done = next >= currentText.length;
        // schedule next step
        if (!done) {
          const nextChar = currentText.charAt(next);
          timerRef.current = setTimeout(typeTick, getDelayForNext(nextChar));
        } else {
          // finished this word
          if (series.length > 1 && (loop || loopsDoneRef.current < (typeof loop === 'number' ? loop : 0))) {
            // hold then delete
            timerRef.current = setTimeout(() => {
              setMode("deleting");
              deleteTick();
            }, Math.max(200, holdDelay));
          } else if (series.length > 1 && loop === true) {
            timerRef.current = setTimeout(() => {
              setMode("deleting");
              deleteTick();
            }, Math.max(200, holdDelay));
          } else {
            timerRef.current = null;
            onDone?.();
          }
        }
        return Math.min(next, currentText.length);
      });
    };

    const deleteTick = () => {
      if (cancelled) return;
      setIdx((i) => {
        const next = i - 1;
        const done = next <= 0;
        if (!done) {
          timerRef.current = setTimeout(deleteTick, Math.max(8, deleteSpeed) * randJitter());
        } else {
          // advance to next word
          const nextWordIndex = (wordIndex + 1) % series.length;
          const wrapped = nextWordIndex === 0;
          if (wrapped) loopsDoneRef.current = loopsDoneRef.current + 1;
          setWordIndex(nextWordIndex);
          setMode("typing");
          timerRef.current = setTimeout(typeTick, Math.max(80, delay));
        }
        return Math.max(next, 0);
      });
    };

    const kickoff = () => {
      if (cancelled) return;
      timerRef.current = setTimeout(typeTick, Math.max(8, speed));
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
  }, [start, delay, speed, deleteSpeed, holdDelay, speedJitter, punctuationPause, series, wordIndex, currentText, shouldReduce, loop, onDone]);

  const visible = shouldReduce ? currentText : currentText.slice(0, idx);
  const done = idx >= currentText.length && mode === "typing";

  const renderFancy = () => {
    const chars = Array.from(visible);
    return (
      <As className={`${className} ${fancy ? 'gradient-text-enhanced' : ''}`} aria-label={currentText} aria-live="polite">
        {chars.map((ch, i) => (
          <motion.span
            key={`${wordIndex}-${i}`}
            initial={shouldReduce ? false : { y: 6, opacity: 0, filter: "blur(2px)" }}
            animate={shouldReduce ? undefined : { y: 0, opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1], delay: i * charStagger }}
            style={{ display: "inline-block" }}
          >
            {ch}
          </motion.span>
        ))}
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
  };

  const renderSimple = () => (
    <As className={className} aria-label={currentText} aria-live="polite">
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

  return fancy ? renderFancy() : renderSimple();
}
