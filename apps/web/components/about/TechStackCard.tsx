import { Card } from "@workspace/ui/components/card";
import {
  ArrowRightIcon,
  Cloud,
  Code2,
  Database,
  FileCode2,
  Github,
  Hexagon,
  Layers,
  PaintBucket,
  Search,
  Server,
  SquareStack,
  Workflow,
  Zap,
} from "lucide-react";
import React from "react";

const TECHSTACKS = [
  { name: "Next.js", icon: <Hexagon className="h-5 w-5" /> },
  { name: "MDX", icon: <FileCode2 className="h-5 w-5" /> },
  { name: "Tailwind CSS", icon: <PaintBucket className="h-5 w-5" /> },
  { name: "Node.js", icon: <Server className="h-5 w-5" /> },
  { name: "Express.js", icon: <Code2 className="h-5 w-5" /> },
  { name: "PostgreSQL", icon: <Database className="h-5 w-5" /> },
  { name: "Prisma ORM", icon: <Layers className="h-5 w-5" /> },
  { name: "Redis", icon: <Zap className="h-5 w-5" /> },
  { name: "Apache Kafka", icon: <Workflow className="h-5 w-5" /> },
  { name: "Turborepo", icon: <SquareStack className="h-5 w-5" /> },
  { name: "Upstash Search", icon: <Search className="h-5 w-5" /> },
  { name: "Amazon S3", icon: <Cloud className="h-5 w-5" /> },
];

export function TechStackCard() {
  return (
    <Card className="relative overflow-hidden p-10 border-border/30 bg-card/50 backdrop-blur-sm shadow-2xl">
      <div className="absolute -right-24 -top-24 h-64 w-64 rounded-full bg-primary/8 blur-[80px] pointer-events-none" />
      <div className="absolute -left-24 -bottom-24 h-64 w-64 rounded-full bg-chart-2/20 blur-[80px] pointer-events-none" />
      <div className="absolute right-1/3 top-1/2 h-48 w-48 rounded-full bg-chart-4/20 blur-[80px] pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
            <Database className="h-6 w-6" />
          </div>
          <div>
            <h3 className="text-2xl font-extrabold tracking-tight">
              Modern Stack
            </h3>
            <p className="text-sm text-muted-foreground">
              Technologies powering OpenFrame
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-5  gap-3">
          {TECHSTACKS.map((tech) => (
            <div
              key={tech.name}
              className="group flex flex-col items-center gap-2.5 rounded-xl border border-border/40 bg-secondary/30 p-1.5 transition-all duration-300 hover:bg-secondary/60 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 cursor-default"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors duration-300 group-hover:bg-primary group-hover:text-primary-foreground">
                {tech.icon}
              </div>
              <span className="text-[11px] font-semibold text-center leading-tight text-muted-foreground group-hover:text-foreground transition-colors">
                {tech.name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-8 border-t border-border/30">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <span className="text-sm text-muted-foreground">
              Want to see how it works?
            </span>
            <a
              href="https://github.com/imSyntn/OpenFrame"
              target="_blank"
              rel="noreferrer"
              className="group/link inline-flex items-center gap-2 text-sm font-semibold text-primary transition-all hover:gap-3"
            >
              <Github className="h-4 w-4" />
              Explore the Repo
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </Card>
  );
}
