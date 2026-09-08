"use client";

import { motion, type Easing } from "motion/react";
import Image, { ImageProps } from "next/image";
import React from "react";

export interface AnimatedImageProps extends Omit<
  ImageProps,
  | "onAnimationStart"
  | "onAnimationEnd"
  | "onAnimationIteration"
  | "onDrag"
  | "onDragStart"
  | "onDragEnd"
  | "layout"
> {
  initialScale?: number;
  duration?: number;
  delay?: number;
  ease?: Easing | Easing[];
}

const MotionImage = motion(Image);

export function AnimatedImage({
  src,
  alt,
  blurDataURL,
  quality = 50,
  initialScale = 1.15,
  duration = 1.4,
  delay = 0,
  ease = [0.16, 1, 0.3, 1],
  className = "h-full w-full object-cover",
  ...props
}: AnimatedImageProps) {
  return (
    <MotionImage
      initial={{ scale: initialScale, opacity: 0.5 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration,
        delay,
        ease,
      }}
      src={src}
      alt={alt}
      fill
      quality={quality}
      preload={true}
      placeholder="blur"
      blurDataURL={blurDataURL}
      className={className}
      {...props}
    />
  );
}
