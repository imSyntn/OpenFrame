import { Zap, Sparkles, Globe, Code2 } from "lucide-react";
import { Card } from "@workspace/ui/components/card";
import React from "react";
import { ArrowRightIcon, Database, Github } from "lucide-react";
import { AnimatedSection } from "../common";

const FEATURE_GROUPS = [
  {
    title: "Image Intelligence",
    icon: <Sparkles className="h-5 w-5" />,
    gradient: "from-chart-4/20 to-chart-5/20",
    dotColor: "bg-chart-4",
    features: [
      "EXIF metadata extraction",
      "BlurHash generation",
      "Dominant color and palette extraction",
      "NSFW content detection",
      "Image optimization pipeline",
    ],
  },
  {
    title: "Platform Features",
    icon: <Globe className="h-5 w-5" />,
    gradient: "from-chart-2/20 to-chart-3/20",
    dotColor: "bg-chart-2",
    features: [
      "User authentication and profiles",
      "Advanced search",
      "Creator profiles",
      "Curated collections",
      "Email queue processing",
    ],
  },
  {
    title: "Developer API",
    icon: <Code2 className="h-5 w-5" />,
    gradient: "from-chart-1/20 to-chart-2/20",
    dotColor: "bg-chart-1",
    features: [
      "RESTful API with Node.js and Express",
      "API key authentication",
      "Per-key rate limiting",
      "HMAC-SHA256 internal authentication",
      "API access to images, users, and collections",
    ],
  },
  {
    title: "Architecture",
    icon: <Zap className="h-5 w-5" />,
    gradient: "from-primary/20 to-chart-1/20",
    dotColor: "bg-primary",
    features: [
      "Kafka-powered event-driven architecture",
      "Worker-based processing",
      "Redis caching",
      "PostgreSQL + Prisma",
      "Direct-to-S3 uploads",
    ],
  },
];

const TECHSTACKS = [
  { name: "Next.js", img: "https://skillicons.dev/icons?i=nextjs" },
  {
    name: "Zustand",
    img: "https://github.com/pmndrs/zustand/raw/main/docs/favicon.ico",
  },
  {
    name: "TanStack Query",
    img: "https://avatars.githubusercontent.com/u/72518640?s=200&v=4",
  },
  { name: "MDX", img: "https://svgl.app/library/markdown-dark.svg" },
  { name: "Tailwind CSS", img: "https://skillicons.dev/icons?i=tailwind" },
  { name: "Node.js", img: "https://skillicons.dev/icons?i=nodejs" },
  { name: "Express.js", img: "https://skillicons.dev/icons?i=express" },
  {
    name: "Zod",
    img: "https://raw.githubusercontent.com/colinhacks/zod/main/logo.svg",
  },
  { name: "PostgreSQL", img: "https://skillicons.dev/icons?i=postgresql" },
  { name: "Prisma ORM", img: "https://skillicons.dev/icons?i=prisma" },
  { name: "Redis", img: "https://skillicons.dev/icons?i=redis" },
  { name: "Apache Kafka", img: "https://skillicons.dev/icons?i=kafka" },
  {
    name: "Sharp",
    img: "https://sharp.pixelplumbing.com/_astro/sharp-logo.D4gYpHdD.svg",
  },
  {
    name: "NSFWJS",
    img: "https://github.com/infinitered/nsfwjs/raw/master/_art/nsfwjs_logo.jpg",
  },
  {
    name: "Turborepo",
    img: "https://svgl.app/library/turborepo-icon-dark.svg",
  },
  { name: "Upstash Search", img: "https://svgl.app/library/upstash.svg" },
  { name: "Amazon S3", img: "https://svgl.app/library/aws_dark.svg" },
  {
    name: "Cloudflare AI",
    img: "https://www.vectorlogo.zone/logos/cloudflare/cloudflare-icon.svg",
  },
];

interface FeatureCardProps {
  group: {
    title: string;
    icon: React.ReactNode;
    features: string[];
    gradient: string;
    dotColor: string;
  };
}

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

        <div className="mt-8 grid grid-cols-2 sm:grid-cols-5 gap-3">
          {TECHSTACKS.map((tech) => (
            <div
              key={tech.name}
              className="group flex flex-col items-center gap-2.5 rounded-xl border border-border/40 bg-secondary/30 p-1.5 transition-all duration-300 hover:bg-secondary/60 hover:border-primary/30 hover:shadow-md hover:-translate-y-0.5 cursor-default"
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#171717]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
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

export function Features() {
  return (
    <div className="container mx-auto px-6 mt-40 max-w-6xl">
      <div className="grid gap-20 lg:grid-cols-2 items-start">
        <div className="flex flex-col">
          <AnimatedSection direction="up" delay={0.1}>
            <div className="flex flex-col items-center lg:items-start">
              <span className="inline-block text-sm font-semibold tracking-widest uppercase text-muted-foreground/60 mb-4">
                Under the Hood
              </span>
              <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
                Powerful Features
              </h2>
              <p className="text-muted-foreground text-lg mb-10 leading-relaxed text-center lg:text-start">
                Built with modern tooling and intelligent image processing
                capabilities.
              </p>
            </div>
          </AnimatedSection>

          <div className="space-y-4">
            {FEATURE_GROUPS.map((group, idx) => (
              <AnimatedSection
                key={group.title}
                direction="up"
                delay={0.1 + idx * 0.1}
                scale
              >
                <FeatureCard group={group} />
              </AnimatedSection>
            ))}
          </div>
        </div>

        <div className="lg:sticky lg:top-24">
          <AnimatedSection direction="up" delay={0.2} scale>
            <TechStackCard />
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
