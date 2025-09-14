import React, { useCallback, useRef, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Download } from "lucide-react";

/**
 * AnimatedDownloadButton
 * - Hover: soft glow + slight scale
 * - Click: ripple from pointer + confetti burst
 * - Action: triggers file download (defaults to /resume.pdf)
 * - Respects reduced motion
 */
export default function AnimatedDownloadButton({
  href = "/resume.pdf",
  filename = "resume.pdf",
  className = "",
  children = "Download Resume",
  size = "lg",
}) {
  const prefersReducedMotion = useReducedMotion();
  const btnRef = useRef(null);
  const [ripples, setRipples] = useState([]);
  const [confetti, setConfetti] = useState([]);

  const onClick = useCallback((e) => {
    // trigger download
    const link = document.createElement("a");
    link.href = href;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    if (prefersReducedMotion) return; // no effects if reduced motion

    // Ripple effect (local)
    const rect = btnRef.current?.getBoundingClientRect();
    if (rect) {
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = crypto.randomUUID();
      setRipples((r) => [...r, { id, x, y }]);
      setTimeout(() => setRipples((r) => r.filter((it) => it.id !== id)), 650);
    }

    // Confetti burst (a few particles)
    const particles = Array.from({ length: 10 }).map((_, i) => ({
      id: `${Date.now()}-${i}`,
      dx: (Math.random() - 0.5) * 60,
      dy: -Math.random() * 80 - 40,
      rot: (Math.random() - 0.5) * 140,
      color: ["var(--primary)", "var(--secondary)", "var(--accent)"][i % 3],
    }));
    setConfetti(particles);
    setTimeout(() => setConfetti([]), 900);
  }, [href, filename, prefersReducedMotion]);

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-5 py-3 text-base",
  };

  return (
    <motion.button
      ref={btnRef}
      onClick={onClick}
      className={`relative inline-flex items-center justify-center rounded-lg border border-primary/30 bg-transparent text-foreground ${sizes[size]} ${className}`}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.03, boxShadow: "0 8px 26px hsl(var(--primary) / 0.25)" }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
    >
      <Download className="w-4 h-4 mr-2 text-primary" />
      {children}

      {/* Ripple layer */}
      <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-lg">
        <AnimatePresence>
          {ripples.map((r) => (
            <motion.span
              key={r.id}
              className="absolute rounded-full border border-primary/40"
              initial={{ opacity: 0.35, left: r.x, top: r.y, width: 0, height: 0 }}
              animate={{ opacity: 0, left: r.x - 120, top: r.y - 120, width: 240, height: 240 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              style={{ filter: "drop-shadow(0 0 14px hsl(var(--primary) / 0.5))" }}
            />
          ))}
        </AnimatePresence>
      </span>

      {/* Confetti particles */}
      <span className="pointer-events-none absolute inset-0 overflow-visible">
        <AnimatePresence>
          {confetti.map((c) => (
            <motion.span
              key={c.id}
              className="absolute w-1.5 h-1.5 rounded-sm"
              initial={{ opacity: 0.9, x: 0, y: 0, rotate: 0 }}
              animate={{ opacity: 0, x: c.dx, y: c.dy, rotate: c.rot }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: "ease-out" }}
              style={{ backgroundColor: `hsl(${c.color})` }}
            />
          ))}
        </AnimatePresence>
      </span>
    </motion.button>
  );
}
