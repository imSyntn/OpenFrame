import { Card } from "@workspace/ui/components/card";
import React from "react";

interface FeatureCardProps {
  group: {
    title: string;
    icon: React.ReactNode;
    features: string[];
    gradient: string;
    dotColor: string;
  };
}

export function FeatureCard({ group }: FeatureCardProps) {
  return (
    <Card className="group relative overflow-hidden border-border/40 bg-card/30 backdrop-blur-sm p-6 transition-all duration-500 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5">
      <div
        className={`absolute inset-0 bg-linear-to-br ${group.gradient} opacity-20 transition-opacity duration-500 group-hover:opacity-100`}
      />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-secondary text-foreground transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
            {group.icon}
          </div>
          <h3 className="font-bold text-lg tracking-tight">{group.title}</h3>
        </div>

        <ul className="space-y-2.5">
          {group.features.map((feature) => (
            <li
              key={feature}
              className="flex items-center gap-3 text-sm text-muted-foreground transition-colors group-hover:text-foreground/70"
            >
              <div
                className={`h-1.5 w-1.5 rounded-full ${group.dotColor} shrink-0`}
              />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
}
