"use client";

import { motion, type HTMLMotionProps } from "motion/react";
import React from "react";

interface AnimatedSectionProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  duration?: number;
  className?: string;
  viewportMargin?: string;
  scale?: boolean;
}

export function AnimatedSection({
  children,
  delay = 0,
  direction = "up",
  duration = 0.6,
  className,
  viewportMargin = "-50px",
  scale = false,
  ...props
}: AnimatedSectionProps) {
  const getInitial = () => {
    const initial: { opacity: number; x?: number; y?: number; scale?: number } = {
      opacity: 0,
    };
    if (direction === "up") initial.y = 35;
    if (direction === "down") initial.y = -35;
    if (direction === "left") initial.x = 35;
    if (direction === "right") initial.x = -35;
    if (scale) initial.scale = 0.94;
    return initial;
  };

  return (
    <motion.div
      initial={getInitial()}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, margin: viewportMargin as any }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
