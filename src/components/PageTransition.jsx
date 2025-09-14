import { motion } from "framer-motion";

const variants = {
  initial: { opacity: 0, y: 12, filter: "blur(6px)" },
  enter: { opacity: 1, y: 0, filter: "blur(0px)" },
  exit: { opacity: 0, y: -12, filter: "blur(6px)" },
};

export default function PageTransition({ children, className = "" }) {
  return (
    <motion.div
      className={className}
      variants={variants}
      initial="initial"
      animate="enter"
      exit="exit"
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
