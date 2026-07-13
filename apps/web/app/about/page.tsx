import {
  AboutCard,
  BuiltByCard,
  FeatureCard,
  HeroSection,
  TechStackCard,
} from "@/components/about";
import { Heart, ShieldCheck, Code2, Zap, Sparkles, Globe } from "lucide-react";

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

export default function AboutPage() {
  return (
    <div className="min-h-screen pb-32">
      <HeroSection />

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

      <div className="container mx-auto px-6 mt-40 max-w-6xl">
        <div className="grid gap-20 lg:grid-cols-2 items-start">
          <div>
            <span className="inline-block text-sm font-semibold tracking-widest uppercase text-muted-foreground/60 mb-4">
              Under the Hood
            </span>
            <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4">
              Powerful Features
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Built with modern tooling and intelligent image processing
              capabilities.
            </p>

            <div className="space-y-4">
              {FEATURE_GROUPS.map((group) => (
                <FeatureCard key={group.title} group={group} />
              ))}
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            <TechStackCard />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 mt-40 max-w-4xl">
        <BuiltByCard />
      </div>
    </div>
  );
}
