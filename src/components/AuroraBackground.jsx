import { useReducedMotion } from "framer-motion";

export default function AuroraBackground({ className = "" }) {
  const prefersReducedMotion = useReducedMotion();
  if (prefersReducedMotion) return null;
  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed inset-0 -z-10 overflow-hidden aurora-bg ${className}`}
    >
      <div className="aurora-layer aurora-1" />
      <div className="aurora-layer aurora-2" />
      <div className="aurora-layer aurora-3" />
    </div>
  );
}
