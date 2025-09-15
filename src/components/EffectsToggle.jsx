import { useEffect, useState } from "react";
import { Sparkles, EyeOff, Gauge } from "lucide-react";

const modes = [
  { key: "off", label: "Off", Icon: EyeOff },
  { key: "low", label: "Low", Icon: Gauge },
  { key: "standard", label: "Standard", Icon: Sparkles },
  { key: "high", label: "High", Icon: Sparkles },
];

export default function EffectsToggle({ className = "" }) {
  const [mode, setMode] = useState(() => localStorage.getItem("fx-mode") || "low");

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-fx", mode);
    localStorage.setItem("fx-mode", mode);
  }, [mode]);

  const next = () => {
    const idx = modes.findIndex((m) => m.key === mode);
    const n = modes[(idx + 1) % modes.length];
    setMode(n.key);
  };

  const active = modes.find((m) => m.key === mode) || modes[2];
  const Icon = active.Icon;

  return (
    <button
      onClick={next}
      title={`Effects: ${active.label} (click to change)`}
      className={`icon-button glass no-hover-scale ${className}`}
      aria-label={`Toggle visual effects intensity (current: ${active.label})`}
    >
      <Icon className="w-5 h-5 text-primary" />
    </button>
  );
}
