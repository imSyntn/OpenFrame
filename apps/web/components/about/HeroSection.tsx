import { Badge } from "@workspace/ui/components/badge";

export function HeroSection() {
  return (
    <div className="relative flex min-h-[85dvh] flex-col items-center justify-center px-6 text-center overflow-hidden">
      <div className="absolute inset-0 -z-20">
        <img
          src="https://res.cloudinary.com/dqn1hcl8c/image/upload/v1778582808/about_jxwp6r.jpg"
          alt=""
          className="h-full w-full object-cover scale-105 animate-[heroZoom_20s_ease-in-out_infinite_alternate]"
        />
      </div>

      <div className="absolute inset-0 -z-10 bg-white/70 dark:bg-black/60" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-background/30 to-background" />

      <div className="relative z-10 max-w-4xl">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] animate-[fadeInUp_0.8s_ease-out_0.15s_both]">
          Empowering Creators with
          <br className="hidden sm:block" />
          <span className="relative inline-block mt-2">
            <span className="bg-gradient-to-r from-primary via-chart-2 to-chart-4 bg-clip-text text-transparent">
              Open Photography
            </span>
            <span className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-chart-2 to-chart-4 rounded-full opacity-40 blur-sm" />
          </span>
        </h1>

        <p className="mt-8 max-w-2xl mx-auto text-muted-foreground text-lg leading-relaxed animate-[fadeInUp_0.8s_ease-out_0.3s_both]">
          OpenFrame provides a simple and beautiful place to find stunning
          images while giving photographers full ownership and control over
          their work.
        </p>
      </div>
    </div>
  );
}
