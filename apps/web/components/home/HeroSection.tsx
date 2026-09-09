"use client";

import React from "react";
import { motion } from "motion/react";
import { AnimatedImage, AnimatedSection } from "../common";
import { SearchField } from "./SearchField";
import { MorphingText } from "@workspace/ui/components/textmorph";

const texts = ["creators", "artists", "makers", "dreamers", "visionaries"];

export function HeroSection() {
  return (
    <div className="relative flex h-[70dvh] min-h-[500px] flex-col items-center justify-center overflow-visible px-6 text-center">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <AnimatedImage
          src="https://res.cloudinary.com/dqn1hcl8c/image/upload/v1774718349/20f41277-2043-4f0f-83b8-f1bc4eb31181_rykctm.webp"
          alt="Hero background"
          blurDataURL="data:image/webp;base64,UklGRkgAAABXRUJQVlA4IDwAAADwAQCdASoEAAIAAUAmJZACdLoAAwj3jHAA/tKV+tnuv/8NMxX7Ei068KH6khs0g7BGu0Rmf9wZn1df4AA="
        />

        <div className="absolute inset-0 bg-white/60 dark:bg-black/40" />

        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-background dark:from-black/40 dark:via-black/20 dark:to-background" />

        <motion.div
          animate={{
            opacity: [0.4, 0.7, 0.4],
            scale: [0.95, 1.05, 0.95],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,hsl(var(--primary)/0.15),transparent_60%)]"
        />
      </div>

      <AnimatedSection direction="up" delay={0.1}>
        <h1 className="text-3xl font-extrabold tracking-tight leading-tight sm:text-4xl md:text-5xl lg:text-6xl">
          <span className="bg-gradient-to-r from-primary to-violet-500 dark:to-violet-300 bg-clip-text text-transparent">
            Free High-Res Photos for
          </span>
          <MorphingText texts={texts} />
        </h1>
      </AnimatedSection>

      <AnimatedSection direction="up" delay={0.25}>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          The internet&apos;s source of freely usable images. Powered by
          creators everywhere.
        </p>
      </AnimatedSection>

      <AnimatedSection
        direction="up"
        delay={0.35}
        scale
        className="w-full flex justify-center mt-2"
      >
        <SearchField />
      </AnimatedSection>
    </div>
  );
}
