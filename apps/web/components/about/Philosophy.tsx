import { Heart, ShieldCheck, Code2 } from "lucide-react";
import { Card } from "@workspace/ui/components/card";
import { cn } from "@workspace/ui/lib/utils";
import React from "react";

export function AboutCard({
  title,
  description,
  Icon,
  IconClassName,
  index,
}: {
  title: string;
  description: string;
  Icon: React.ReactNode;
  IconClassName: string;
  index?: number;
}) {
  return (
    <Card className="group relative overflow-hidden bg-secondary/20 backdrop-blur-sm border-border/40 p-8 transition-all duration-500 hover:bg-secondary/40 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-2 hover:border-primary/20">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.04] via-transparent to-chart-2/[0.04] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {index !== undefined && (
        <span className="absolute top-6 right-6 text-7xl font-black text-foreground/[0.03] select-none transition-all duration-500 group-hover:text-foreground/[0.06] group-hover:scale-110">
          {String(index + 1).padStart(2, "0")}
        </span>
      )}

      <div className="relative z-10">
        <div
          className={cn(
            "mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg",
            IconClassName,
          )}
        >
          {Icon}
        </div>
        <h3 className="mb-3 text-2xl font-bold tracking-tight">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </Card>
  );
}

export function Philosophy() {
  return (
    <div className="container mx-auto px-6 mt-24 max-w-6xl">
      <div className="text-center mb-20">
        <span className="inline-block text-sm font-semibold tracking-widest uppercase text-muted-foreground/60 mb-4">
          Our Philosophy
        </span>
        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight">
          Why OpenFrame?
        </h2>
        <p className="mt-6 text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          Many photo platforms are cluttered with ads, paywalls and tracking
          scripts but this platform with a radically different philosophy.
        </p>
        <div className="mt-8 h-1 w-16 mx-auto rounded-full bg-gradient-to-r from-primary to-chart-2" />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <AboutCard
          title="Privacy First"
          description="No advertising trackers, no analytics cookies, and absolutely no sale of personal data. We use only essential cookies for authentication."
          Icon={<ShieldCheck className="h-7 w-7" />}
          IconClassName="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
          index={0}
        />

        <AboutCard
          title="100% Open Source"
          description="Built in public. Anyone can view the source code, report issues, or contribute to making the platform better for everyone."
          Icon={<Code2 className="h-7 w-7" />}
          IconClassName="bg-chart-2/10 text-chart-2 group-hover:bg-chart-2 group-hover:text-white"
          index={1}
        />

        <AboutCard
          title="Creator Ownership"
          description="Photographers retain full ownership and copyright of every image they upload. We never claim ownership of your creative work."
          Icon={<Heart className="h-7 w-7" />}
          IconClassName="bg-destructive/10 text-destructive group-hover:bg-destructive group-hover:text-white"
          index={2}
        />
      </div>
    </div>
  );
}
