import { forwardRef } from "react";
import { motion } from "framer-motion";
import { Button, buttonVariants } from "./button";
import { cn } from "@/lib/utils";

// Motion-enabled Button that mirrors Button props but adds tasteful hover/tap interactions.
export const MotionButton = forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  // Preserve asChild composition by not wrapping children structure; only animate the wrapper button element
  if (asChild) {
    // Fallback to base Button when asChild is used to avoid nesting issues
    return <Button ref={ref} className={className} variant={variant} size={size} asChild {...props} />;
  }
  return (
    <motion.button
      ref={ref}
      className={cn(buttonVariants({ variant, size, className }))}
      whileHover={{ y: -1, scale: 1.01 }}
      whileTap={{ scale: 0.985 }}
      {...props}
    />
  );
});

MotionButton.displayName = "MotionButton";
