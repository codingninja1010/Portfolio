import { motion } from "framer-motion";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

/**
 * Reveal
 * Wrapper that applies useScrollReveal to a motion.div.
 * Use inside render without calling hooks in callbacks/IIFEs.
 */
export default function Reveal({
  as: Comp = motion.div,
  children,
  amount,
  duration,
  delay,
  y,
  blur,
  scaleFrom,
  ease,
  once,
  rootMargin,
  className,
  ...rest
}) {
  const { ref, motionProps } = useScrollReveal({ amount, duration, delay, y, blur, scaleFrom, ease, once, rootMargin });
  return (
    <Comp ref={ref} className={className} {...motionProps} {...rest}>
      {children}
    </Comp>
  );
}
