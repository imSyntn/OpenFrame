"use client";

import React from "react";
import * as motion from "motion/react-client";
import { AnimatedImage, AnimatedSection } from "../common";

export function HeroSection() {
  return (
    <section className="relative flex h-[70dvh] min-h-[500px] flex-col items-center justify-center overflow-hidden px-6 text-center">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <AnimatedImage
          src="https://res.cloudinary.com/dqn1hcl8c/image/upload/q_auto/f_auto/v1787827914/Contemplative_Statue_with_Headphones_ufyhwg.jpg"
          alt="hero image"
        />

        <div className="absolute inset-0 bg-white/60 dark:bg-black/60" />

        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-background/20 to-background dark:from-black/30 dark:via-background/30 dark:to-background" />

        <motion.div
          animate={{
            opacity: [0.5, 0.8, 0.5],
            scale: [0.95, 1.08, 0.95],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,hsl(var(--primary)/0.18),transparent_55%)]"
        />
      </div>

      <div className="flex max-w-4xl flex-col items-center">
        <AnimatedSection delay={0.1} direction="up">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
            Turn Prompts into
            <br />
            <motion.span
              animate={{
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear",
              }}
              className="inline-block bg-gradient-to-r from-primary via-violet-500 to-amber-500 bg-[length:200%_auto] bg-clip-text text-transparent"
            >
              Visual Masterpieces
            </motion.span>
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.25} direction="up">
          <p className="mt-5 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base md:text-lg">
            Create high-resolution artwork, photorealistic scenes, anime
            illustrations and many more powered by cutting edge AI models.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
