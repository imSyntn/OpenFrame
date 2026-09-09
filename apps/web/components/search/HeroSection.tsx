import { MorphingText } from "@workspace/ui/components/textmorph";
import { AnimatedImage, AnimatedSection, SearchBar } from "../common";

const texts = ["instantly", "quickly", "easily", "smoothly"];

export function HeroSection({
  setSearchText,
  searchText,
}: {
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
  searchText: string;
}) {
  return (
    <div className="relative flex h-[70dvh] flex-col items-center justify-center px-6 text-center">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <AnimatedImage
          src="https://res.cloudinary.com/dqn1hcl8c/image/upload/q_auto/f_auto/v1775388042/hero-search_akai93.png"
          alt="hero image"
          blurDataURL="data:image/webp;base64,UklGRkYAAABXRUJQVlA4IDoAAACwAQCdASoEAAIAAUAmJYgCdAEO9qIgAP7Svf+P/kJisY6IKg9AQtDl857GF094jX6iszwcyUDbWcAA"
        />

        <div className="absolute inset-0 bg-white/60 dark:bg-black/40" />

        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-background dark:from-black/40 dark:via-black/20 dark:to-background" />
      </div>

      <AnimatedSection direction="up" delay={0.1}>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-center sm:text-left">
          <span className="bg-gradient-to-r from-primary to-emerald-500 dark:to-emerald-300 bg-clip-text text-transparent text-center">
            Search anything
          </span>
          <MorphingText texts={texts} />
        </h1>
      </AnimatedSection>

      <AnimatedSection direction="up" delay={0.2}>
        <p className="text-muted-foreground mt-5">
          Users, pictures, tags — all in one place
        </p>
      </AnimatedSection>

      <AnimatedSection
        direction="up"
        delay={0.3}
        scale
        className="w-full flex justify-center"
      >
        <SearchBar value={searchText} onChange={setSearchText} />
      </AnimatedSection>
    </div>
  );
}
