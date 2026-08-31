"use client";

import { motion, type HTMLMotionProps, type Easing } from "motion/react";
import React from "react";

export interface AnimatedImageProps extends HTMLMotionProps<"img"> {
  src: string;
  alt: string;
  initialScale?: number;
  duration?: number;
  delay?: number;
  ease?: Easing | Easing[];
  className?: string;
}

export function AnimatedImage({
  src,
  alt,
  initialScale = 1.15,
  duration = 1.4,
  delay = 0,
  ease = [0.16, 1, 0.3, 1],
  className = "h-full w-full object-cover",
  ...props
}: AnimatedImageProps) {
  return (
    <motion.img
      initial={{ scale: initialScale, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration,
        delay,
        ease,
      }}
      src={src}
      alt={alt}
      className={className}
      {...props}
    />
  );
}
