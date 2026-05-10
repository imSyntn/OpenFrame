export function HeroSection() {
  return (
    <div className="relative flex h-[70dvh] flex-col items-center justify-center px-6 text-center">
      <div className="absolute inset-0 -z-10">
        <img
          src="https://res.cloudinary.com/dqn1hcl8c/image/upload/v1774718349/20f41277-2043-4f0f-83b8-f1bc4eb31181_rykctm.webp"
          alt=""
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-white/60 dark:bg-black/40" />

        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-background dark:from-black/40 dark:via-black/20 dark:to-background" />
      </div>
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight text-center">
        Empowering Creators with
        <br className="hidden sm:block" />
        <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
          Open Photography
        </span>
      </h1>

      <p className="mt-4 max-w-xl text-muted-foreground text-lg">
        OpenFrame provides a simple and beautiful place to find stunning images
        while giving photographers full ownership and control over their work.
      </p>
    </div>
  );
}
