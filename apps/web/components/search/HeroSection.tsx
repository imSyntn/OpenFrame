import { AnimatedImage, AnimatedSection, SearchBar } from "../common";

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
        />

        <div className="absolute inset-0 bg-white/60 dark:bg-black/40" />

        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-background dark:from-black/40 dark:via-black/20 dark:to-background" />
      </div>

      <AnimatedSection direction="up" delay={0.1}>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-center sm:text-left">
          Search anything
          <br className="block sm:hidden" />
          <span className="ml-2 bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent text-center">
            instantly
          </span>
        </h1>
      </AnimatedSection>

      <AnimatedSection direction="up" delay={0.2}>
        <p className="text-muted-foreground mt-3">
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
