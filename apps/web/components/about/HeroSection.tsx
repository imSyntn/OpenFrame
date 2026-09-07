import { Card } from "@workspace/ui/components/card";
import { Camera, ShieldCheck, Sparkles } from "lucide-react";
import { AnimatedSection } from "../common";

export function HeroSection() {
  return (
    <div className="relative container mx-auto px-6 pt-12 sm:pt-20 max-w-6xl text-center">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-primary/10 blur-[100px] pointer-events-none -z-10" />
      <div className="absolute top-1/4 right-10 h-64 w-64 rounded-full bg-chart-2/10 blur-[80px] pointer-events-none -z-10" />
      <div className="absolute top-1/3 left-10 h-48 w-48 rounded-full bg-chart-4/10 blur-[80px] pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto">
        <AnimatedSection delay={0.1} direction="up">
          <span className="inline-block text-sm font-semibold tracking-widest uppercase text-muted-foreground/60 mb-4">
            About OpenFrame
          </span>
        </AnimatedSection>

        <AnimatedSection delay={0.2} direction="up">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-[1.15]">
            Empowering Creators with <br className="hidden sm:block" />
            <span className="relative inline-block mt-2">
              <span className="bg-gradient-to-r from-primary via-chart-2 to-chart-4 bg-clip-text text-transparent">
                Open Photography
              </span>
              <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-chart-2 to-chart-4 rounded-full opacity-40 blur-sm" />
            </span>
          </h1>
        </AnimatedSection>

        <AnimatedSection delay={0.25} direction="up">
          <div className="mt-8 h-1 w-16 mx-auto rounded-full bg-gradient-to-r from-primary via-chart-2 to-chart-4" />
        </AnimatedSection>

        <AnimatedSection delay={0.3} direction="up">
          <p className="mt-6 max-w-2xl mx-auto text-muted-foreground text-lg sm:text-xl leading-relaxed">
            OpenFrame provides a simple and beautiful place to find stunning
            images while giving photographers full ownership and control over
            their work.
          </p>
        </AnimatedSection>

        <AnimatedSection delay={0.4} direction="up">
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <div className="flex items-center gap-2 rounded-full border border-border/40 bg-secondary/30 backdrop-blur-sm px-4 py-2 text-sm text-muted-foreground transition-all duration-300 hover:bg-secondary/60 hover:border-primary/30">
              <Camera className="h-4 w-4 text-primary" />
              <span className="font-semibold text-foreground/80">
                High-Res Photos
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border/40 bg-secondary/30 backdrop-blur-sm px-4 py-2 text-sm text-muted-foreground transition-all duration-300 hover:bg-secondary/60 hover:border-chart-2/30">
              <ShieldCheck className="h-4 w-4 text-chart-2" />
              <span className="font-semibold text-foreground/80">
                100% Open Source
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border/40 bg-secondary/30 backdrop-blur-sm px-4 py-2 text-sm text-muted-foreground transition-all duration-300 hover:bg-secondary/60 hover:border-chart-4/30">
              <Sparkles className="h-4 w-4 text-chart-4" />
              <span className="font-semibold text-foreground/80">
                Creator Owned
              </span>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={0.5} scale direction="up">
          <Card className="mt-14 relative overflow-hidden rounded-3xl border border-border/30 bg-secondary/20 backdrop-blur-sm p-3 shadow-2xl group">
            <div
              className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
              style={{
                backgroundImage:
                  "radial-gradient(var(--foreground) 1px, transparent 1px)",
                backgroundSize: "24px 24px",
              }}
            />

            <div className="relative overflow-hidden rounded-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent z-10 pointer-events-none" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://res.cloudinary.com/dqn1hcl8c/image/upload/v1778582808/about_jxwp6r.jpg"
                alt="OpenFrame Hero Showcase"
                className="w-full h-64 sm:h-80 md:h-[28rem] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between px-5 py-3 rounded-xl bg-background/60 backdrop-blur-md border border-border/30 text-xs sm:text-sm text-muted-foreground">
                <span className="font-medium text-foreground">
                  Explore curated open photography
                </span>
                <span className="text-primary font-semibold">Free to use</span>
              </div>
            </div>
          </Card>
        </AnimatedSection>
      </div>
    </div>
  );
}
