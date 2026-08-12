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
  { name: "Next.js", img: "https://skillicons.dev/icons?i=nextjs" },
  {
    name: "Zustand",
    img: "https://github.com/pmndrs/zustand/raw/main/docs/favicon.ico",
  },
  { name: "MDX", img: "https://svgl.app/library/markdown-dark.svg" },
  { name: "Tailwind CSS", img: "https://skillicons.dev/icons?i=tailwind" },
  { name: "Node.js", img: "https://skillicons.dev/icons?i=nodejs" },
  { name: "Express.js", img: "https://skillicons.dev/icons?i=express" },
  { name: "PostgreSQL", img: "https://skillicons.dev/icons?i=postgresql" },
  { name: "Prisma ORM", img: "https://skillicons.dev/icons?i=prisma" },
  { name: "Redis", img: "https://skillicons.dev/icons?i=redis" },
  { name: "Apache Kafka", img: "https://skillicons.dev/icons?i=kafka" },
  {
    name: "Turborepo",
    img: "https://svgl.app/library/turborepo-icon-dark.svg",
  },
  { name: "Upstash Search", img: "https://svgl.app/library/upstash.svg" },
  { name: "Amazon S3", img: "https://svgl.app/library/aws_dark.svg" },
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
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#171717]">
                <img src={tech.img} alt={tech.name} />
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
