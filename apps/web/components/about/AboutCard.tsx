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
