import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useReducedMotion } from "framer-motion";

const ScrollToTop = () => {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const raf = useRef(0);
  const pending = useRef(false);

  useEffect(() => {
    const root = document.documentElement;
    const scrollEl = document.scrollingElement || root;

    const compute = () => {
      pending.current = false;
      const scrollTop = scrollEl.scrollTop || window.pageYOffset || 0;
      const max = Math.max(1, scrollEl.scrollHeight - scrollEl.clientHeight);
      const ratio = Math.min(1, Math.max(0, scrollTop / max));
      setProgress(ratio * 100);
      // visible after 300px or > 8% scrolled on long pages
      setVisible(scrollTop > 300 || ratio > 0.08);
    };

    const onScroll = () => {
      if (pending.current) return;
      pending.current = true;
      raf.current = requestAnimationFrame(compute);
    };
    const onResize = () => compute();

    const ro = new ResizeObserver(() => compute());
    ro.observe(document.body);

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    compute();

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      ro.disconnect();
    };
  }, []);

  const scrollTop = () => {
    const behavior = prefersReducedMotion ? "auto" : "smooth";
    window.scrollTo({ top: 0, behavior });
  };

  const radius = 18;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      aria-hidden={!visible}
      className={`fixed right-5 bottom-6 z-50 transition-all duration-300 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
      }`}
    >
      <button
        onClick={scrollTop}
        aria-label="Scroll to top"
        className="relative w-14 h-14 rounded-full bg-[hsl(var(--background)/0.6)] border border-white/10 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.25)] hover:shadow-[0_10px_40px_rgba(59,130,246,0.35)] transition-all group"
      >
        {/* Gradient ring */}
        <span className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-400">
          <span className="block w-full h-full rounded-full bg-[hsl(var(--background))]" />
        </span>
        {/* Progress circle */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 48 48">
          <circle
            cx="24"
            cy="24"
            r={radius}
            stroke="rgba(99,102,241,0.25)"
            strokeWidth="3"
            fill="none"
          />
          <circle
            cx="24"
            cy="24"
            r={radius}
            stroke="url(#grad)"
            strokeWidth="3"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            fill="none"
            transform="rotate(-90 24 24)"
          />
          <defs>
            <linearGradient id="grad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#6366f1" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>
        </svg>
        {/* Icon */}
        <ArrowUp className="relative z-10 w-6 h-6 text-primary transition-transform group-hover:-translate-y-0.5 mx-auto" />
      </button>
    </div>
  );
};

export default ScrollToTop;
