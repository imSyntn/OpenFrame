import { AboutCard, HeroSection } from "@/components/about";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import {
  Heart,
  ShieldCheck,
  Code2,
  Database,
  Zap,
  ArrowRightIcon,
} from "lucide-react";

const FEATURES = [
  "User authentication & customizable profiles",
  "Advanced search across photos, tags & creators",
  "EXIF metadata extraction & BlurHash optimization",
  "NSFW content detection & moderation tools",
  "High-quality photo upload, optimization & global delivery",
  "Asynchronous image processing powered by Apache Kafka",
  "Curated collections & personalized creator profiles",
];

const TECHSTACKS = [
  "Next.js",
  "MDX",
  "Tailwind CSS",
  "Node.js",
  "Express.js",
  "PostgreSQL",
  "Prisma ORM",
  "Redis",
  "Apache Kafka",
  "Turborepo",
  "Upstash Search",
  "Amazon S3",
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pb-24">
      <HeroSection />

      <div className="container mx-auto px-6 mt-16 max-w-6xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
            Why OpenFrame?
          </h2>
          <p className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto">
            Many photo platforms are cluttered with ads, paywalls and tracking
            scripts. So I built this platform with a radically different
            philosophy.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <AboutCard
            title="Privacy First"
            description="No advertising trackers, no analytics cookies, and absolutely no sale of personal data. We use only essential cookies for authentication."
            Icon={<ShieldCheck className="h-7 w-7" />}
            IconClassName="bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground"
          />

          <AboutCard
            title="100% Open Source"
            description="Built in public. Anyone can view the source code, report issues, or contribute to making the platform better for everyone."
            Icon={<Code2 className="h-7 w-7" />}
            IconClassName="bg-chart-2/10 text-chart-2 group-hover:bg-chart-2 group-hover:bg-chart-2 group-hover:text-white"
          />

          <AboutCard
            title="Creator Ownership"
            description="Photographers retain full ownership and copyright of every image they upload. We never claim ownership of your creative work."
            Icon={<Heart className="h-7 w-7" />}
            IconClassName="bg-destructive/10 text-destructive group-hover:bg-destructive group-hover:text-white"
          />
        </div>
      </div>

      <div className="container mx-auto px-6 mt-32 max-w-6xl">
        <div className="grid gap-16 lg:grid-cols-2 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-8">
              Powerful Features
            </h2>
            <ul className="space-y-6">
              {FEATURES.map((feature, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary shadow-inner">
                    <Zap className="h-4 w-4" />
                  </div>
                  <span className="text-muted-foreground text-lg leading-relaxed">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <Card className="relative p-10 shadow-2xl">
            <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/10 blur-[100px] pointer-events-none" />
            <div className="absolute -left-32 -bottom-32 h-96 w-96 rounded-full bg-chart-2/10 blur-[100px] pointer-events-none" />

            <h3 className="text-3xl font-bold mb-8 flex items-center gap-3 relative z-10">
              <Database className="h-8 w-8 text-primary" /> Modern Stack
            </h3>

            <div className="flex flex-wrap gap-3 relative z-10">
              {TECHSTACKS.map((tech) => (
                <Badge
                  key={tech}
                  variant="secondary"
                  className="px-5 py-2.5 text-sm font-medium border border-accent"
                >
                  {tech}
                </Badge>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-border/50 relative z-10">
              <p className="text-sm text-muted-foreground flex items-center justify-between">
                <span>Want to see how it works?</span>
                <a
                  href="https://github.com/imSyntn/OpenFrame"
                  target="_blank"
                  rel="noreferrer"
                  className="text-primary hover:underline font-medium inline-flex items-center"
                >
                  Explore the Repo{" "}
                  <span className="ml-1">
                    <ArrowRightIcon size={15} />
                  </span>
                </a>
              </p>
            </div>
          </Card>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-32 max-w-4xl text-center">
        <Avatar className="h-24 w-24 border-4 border-background shadow-2xl mb-6 mx-auto">
          <AvatarImage
            src="https://github.com/imSyntn.png"
            alt="Sayantan Sarkar"
          />
          <AvatarFallback>SS</AvatarFallback>
        </Avatar>
        <h2 className="text-3xl font-bold">
          Built with{" "}
          <Heart className="inline-block h-8 w-8 text-destructive mx-1 fill-destructive" />{" "}
          by Sayantan Sarkar
        </h2>
        <Button
          asChild
          variant="default"
          size="lg"
          className="rounded-full px-8 shadow-lg shadow-primary/20 mt-8"
        >
          <a href="https://sayantan.online" target="_blank" rel="noreferrer">
            Visit my Website
          </a>
        </Button>
      </div>
    </div>
  );
}
