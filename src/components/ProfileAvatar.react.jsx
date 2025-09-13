import React, { useRef } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";

/**
 * ProfileAvatar.react.jsx
 * Minimal, elegant profile avatar with:
 * - Rotating soft gradient ring (SVG)
 * - Subtle breathing float
 * - Smooth scale-on-hover
 * - Light 3D tilt from mouse movement
 * - Respects prefers-reduced-motion
 * - Accessible (alt + aria-label)
 *
 * Usage: <ProfileAvatar src="/path.jpg" size={200} alt="Your Name" />
 */
export default function ProfileAvatar({
  src,
  alt = "Profile photo",
  size = 224,
  className = "",
  ariaLabel,
}) {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef(null);

  // Motion values for tilt
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const spring = { stiffness: 140, damping: 14, mass: 0.35 };
  const rxSpring = useSpring(rx, spring);
  const rySpring = useSpring(ry, spring);

  const handleMouseMove = (e) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = x / rect.width - 0.5; // -0.5..0.5
    const py = y / rect.height - 0.5;
    const maxTilt = 10; // deg
    rx.set(-py * maxTilt);
    ry.set(px * maxTilt);
  };
  const handleMouseLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  // Breathing float (disabled if reduced motion)
  const breatheAnim = prefersReducedMotion
    ? {}
    : { y: [0, -6, 0] };

  const breatheTransition = prefersReducedMotion
    ? {}
    : { duration: 6, ease: "easeInOut", repeat: Infinity };

  return (
    <motion.div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative select-none rounded-full overflow-hidden ${className}`}
      style={{ width: size, height: size, transformStyle: "preserve-3d" }}
      aria-label={ariaLabel || alt}
      role="img"
    >
      {/* Rotating soft gradient ring (SVG), paused by default and spins on hover */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-10"
        style={{ originX: 0.5, originY: 0.5 }}
        whileHover={prefersReducedMotion ? {} : { rotate: 360 }}
        transition={{ duration: 8, ease: "linear", repeat: Infinity }}
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="avatarRainbow" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#ff004c" />
              <stop offset="16%" stopColor="#ff7a00" />
              <stop offset="33%" stopColor="#ffd300" />
              <stop offset="50%" stopColor="#00e676" />
              <stop offset="66%" stopColor="#00e5ff" />
              <stop offset="83%" stopColor="#2979ff" />
              <stop offset="100%" stopColor="#d500f9" />
            </linearGradient>
          </defs>
          <circle
            cx="50"
            cy="50"
            r="48"
            fill="none"
            stroke="url(#avatarRainbow)"
            strokeWidth="2.5"
            opacity="0.8"
          />
        </svg>
      </motion.div>

      {/* Image with breathing and hover scale */}
      <motion.img
        src={src}
        alt={alt}
        className="absolute inset-0 w-full h-full rounded-full object-cover shadow-[0_8px_24px_rgba(0,0,0,.25)]"
        style={{ rotateX: rxSpring, rotateY: rySpring, transformStyle: "preserve-3d" }}
        animate={breatheAnim}
        transition={breatheTransition}
        whileHover={prefersReducedMotion ? {} : { scale: 1.08 }}
        loading="eager"
      />

      {/* Soft inner ring for depth */}
      <div className="pointer-events-none absolute inset-0 rounded-full ring-1 ring-white/15" />
    </motion.div>
  );
}
