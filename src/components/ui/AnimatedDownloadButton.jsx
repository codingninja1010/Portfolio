import { useCallback, useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { Download, Loader2, Check } from "lucide-react";
import { toast } from "@/components/ui/sonner";

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
  const [state, setState] = useState("idle"); // idle | downloading | done
  const DOWNLOAD_SPIN_MS = 800; // time to show spinner before success
  const DONE_VISIBLE_MS = 1000; // time to keep "Downloaded" visible
  const timersRef = useRef([]);
  const mountedRef = useRef(true);

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
      // clear any pending timers
      timersRef.current.forEach((id) => clearTimeout(id));
      timersRef.current = [];
    };
  }, []);

  const onClick = useCallback((e) => {
    if (state === "downloading") { e.preventDefault(); return; }
    const isExternal = typeof href === "string" && /^https?:\/\//i.test(href);
    if (isExternal) {
      // Open external URL in a new tab and don't force download
      window.open(href, "_blank", "noopener,noreferrer");
      return;
    }

    // Trigger local file download with animations
  try { window.dispatchEvent(new CustomEvent("resume-download:start")); } catch { /* no-op */ }
    setState("downloading");
  try { toast("Downloading resume…", { description: "Your download will start shortly." }); } catch { /* no toast available */ }
    const link = document.createElement("a");
    link.href = href;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    // Determine base coordinates for visual effects (click point or center)
    const rect = btnRef.current?.getBoundingClientRect();
    const baseX = rect ? (e.clientX - rect.left) : (btnRef.current?.offsetWidth || 0) / 2;
    const baseY = rect ? (e.clientY - rect.top) : (btnRef.current?.offsetHeight || 0) / 2;

    // Skip heavy effects on reduced motion or coarse pointers (mobile)
    const isFinePointer = typeof window !== 'undefined' && typeof window.matchMedia === 'function' ? window.matchMedia('(pointer: fine)').matches : true;

    if (!prefersReducedMotion && isFinePointer) {
      // Ripple effect (local)
      if (rect) {
        const id = (typeof crypto !== 'undefined' && crypto.randomUUID) ? crypto.randomUUID() : `${Date.now()}-${Math.random().toString(16).slice(2)}`;
        setRipples((r) => [...r, { id, x: baseX, y: baseY }]);
        const ripId = setTimeout(() => setRipples((r) => r.filter((it) => it.id !== id)), 650);
        timersRef.current.push(ripId);
      }

      // Confetti burst (a few particles)
      const particles = Array.from({ length: 10 }).map((_, i) => ({
        id: `${Date.now()}-${i}`,
        bx: baseX,
        by: baseY,
        dx: (Math.random() - 0.5) * 60,
        dy: -Math.random() * 80 - 40,
        rot: (Math.random() - 0.5) * 140,
        color: ["var(--primary)", "var(--secondary)", "var(--accent)"][i % 3],
      }));
      setConfetti(particles);
      const confId = setTimeout(() => setConfetti([]), 900);
      timersRef.current.push(confId);
    }

    // End event after short delay (rough indicator for UI)
    const endId = setTimeout(() => {
    try { window.dispatchEvent(new CustomEvent("resume-download:end")); } catch { /* no-op */ }
      if (!mountedRef.current) return;
      setState("done");
  try { toast("Download started", { description: "Check your browser downloads." }); } catch { /* no toast available */ }
      const idleId = setTimeout(() => { if (mountedRef.current) setState("idle"); }, DONE_VISIBLE_MS);
      timersRef.current.push(idleId);
    }, DOWNLOAD_SPIN_MS);
    timersRef.current.push(endId);
  }, [href, filename, prefersReducedMotion, state]);

  const sizes = {
    sm: "px-3 py-2 text-sm",
    md: "px-4 py-2.5 text-sm",
    lg: "px-5 py-3 text-base",
  };

  const stateClass = state === "downloading" ? "is-downloading" : "";

  const renderContent = () => {
    if (state === "downloading") {
      return (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />Downloading…</>);
    }
    if (state === "done") {
      return (<><Check className="w-4 h-4 mr-2 text-green-400" />Downloaded</>);
    }
    return (<><Download className="w-4 h-4 mr-2 text-primary" />{children}</>);
  };

  return (
    <motion.button
      ref={btnRef}
      onClick={onClick}
      aria-busy={state === "downloading"}
      className={`relative inline-flex items-center justify-center rounded-lg border border-primary/30 bg-transparent text-foreground ${sizes[size]} ${className} ${stateClass}`}
      whileHover={prefersReducedMotion ? undefined : { scale: 1.03, boxShadow: "0 8px 26px hsl(var(--primary) / 0.25)" }}
      whileTap={prefersReducedMotion ? undefined : { scale: 0.96 }}
    >
      {/* SR-only live region for status updates */}
      <span className="sr-only" aria-live="polite">
        {state === "downloading" ? "Downloading resume" : state === "done" ? "Download started" : ""}
      </span>
      {renderContent()}

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
              initial={{ opacity: 0.9, x: c.bx || 0, y: c.by || 0, rotate: 0 }}
              animate={{ opacity: 0, x: (c.bx || 0) + c.dx, y: (c.by || 0) + c.dy, rotate: c.rot }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
              style={{ backgroundColor: `hsl(${c.color})` }}
            />
          ))}
        </AnimatePresence>
      </span>
    </motion.button>
  );
}
