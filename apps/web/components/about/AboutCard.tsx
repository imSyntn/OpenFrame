import { Card } from "@workspace/ui/components/card";
import { cn } from "@workspace/ui/lib/utils";
import React from "react";

export function AboutCard({
  title,
  description,
  Icon,
  IconClassName,
}: {
  title: string;
  description: string;
  Icon: React.ReactNode;
  IconClassName: string;
}) {
  return (
    <Card className="group bg-secondary/30 p-8 transition-all hover:bg-secondary/50 hover:shadow-2xl hover:shadow-primary/5 hover:-translate-y-1">
      <div
        className={cn(
          "mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl transition-transform group-hover:scale-110",
          IconClassName,
        )}
      >
        {Icon}
      </div>
      <h3 className="mb-3 text-2xl font-bold">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
    </Card>
  );
}
