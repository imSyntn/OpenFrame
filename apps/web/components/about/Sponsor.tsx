import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import { Code, ExternalLink, Heart, Shield } from "lucide-react";
import { AnimatedSection } from "../common";

export function Sponsor() {
  return (
    <div className="container mx-auto px-6 mt-40 max-w-4xl">
      <AnimatedSection direction="up" delay={0.1} scale>
        <Card className="relative overflow-hidden rounded-3xl border border-border/30 bg-secondary/20 backdrop-blur-sm p-10 sm:p-14 text-center shadow-2xl">
          <div
            className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
            style={{
              backgroundImage:
                "radial-gradient(var(--foreground) 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />
          <div className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-rose-500/10 blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 right-1/4 h-48 w-64 rounded-full bg-primary/10 blur-[80px] pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-rose-500/20 bg-rose-500/10 text-rose-500 text-xs sm:text-sm font-medium mb-6">
              <Heart className="h-3.5 w-3.5 fill-rose-500 animate-pulse" />
              <span>Support Open Source</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight max-w-2xl">
              Sponsor{" "}
              <span className="bg-gradient-to-r from-rose-500 via-pink-500 to-primary bg-clip-text text-transparent">
                OpenFrame
              </span>
            </h2>

            <p className="mt-4 text-muted-foreground text-base sm:text-lg max-w-2xl leading-relaxed">
              OpenFrame is 100% free, ad-free, and open-source. Your sponsorship
              directly supports server costs, continuous feature updates, and
              independent open-source development.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8 w-full max-w-2xl text-left">
              <div className="flex items-start gap-3 p-3.5 rounded-2xl border border-border/30 bg-background/40 backdrop-blur-sm">
                <div className="p-2 rounded-xl bg-rose-500/10 text-rose-500 shrink-0">
                  <Heart className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-foreground">
                    Keep it Free
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    Ensure OpenFrame remains accessible to everyone
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl border border-border/30 bg-background/40 backdrop-blur-sm">
                <div className="p-2 rounded-xl bg-primary/10 text-primary shrink-0">
                  <Code className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-foreground">
                    Fuel Features
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    Accelerate new tooling & platform improvements
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3.5 rounded-2xl border border-border/30 bg-background/40 backdrop-blur-sm">
                <div className="p-2 rounded-xl bg-chart-2/10 text-chart-2 shrink-0">
                  <Shield className="h-4 w-4" />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-foreground">
                    Ad-Free & Private
                  </h3>
                  <p className="text-[11px] text-muted-foreground">
                    No tracking scripts, paywalls, or sponsored ads
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
              <Button
                asChild
                size="lg"
                className="rounded-full px-8 py-6 w-full sm:w-auto bg-gradient-to-r from-rose-500 to-pink-600 hover:from-rose-600 hover:to-pink-700 text-white font-semibold shadow-lg shadow-rose-500/25 group/btn border-0"
              >
                <a
                  href="https://github.com/sponsors/imSyntn"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 text-base"
                >
                  <Heart className="h-5 w-5 fill-white transition-transform group-hover/btn:scale-110" />
                  <span>Sponsor on GitHub</span>
                  <ExternalLink className="h-4 w-4 opacity-70 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                </a>
              </Button>
            </div>
          </div>
        </Card>
      </AnimatedSection>
    </div>
  );
}
