import { Button } from "@workspace/ui/components/button";
import { Field } from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";

const arr = ["Nature", "Architecture", "Wallpapers", "Film", "Minimalist"];

export function HeroSection() {
  return (
    <section className="relative flex h-[60dvh] flex-col items-center justify-center px-6 text-center">
      <div className="absolute inset-0 -z-10">
        <img
          src="https://image.lexica.art/full_webp/20f41277-2043-4f0f-83b8-f1bc4eb31181"
          alt=""
          className="h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-white/60 dark:bg-black/40" />

        <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/20 to-background dark:from-black/40 dark:via-black/20 dark:to-background" />
      </div>
      <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
        Free High-Resolution
        <br />
        <span className="bg-gradient-to-r from-primary to-indigo-500 bg-clip-text text-transparent">
          Photos for Creators
        </span>
      </h1>

      <p className="mt-4 max-w-xl text-muted-foreground text-lg">
        The internet's source of freely usable images. Powered by creators
        everywhere.
      </p>

      <div className="mt-8 w-full max-w-xl">
        <Field
          orientation="horizontal"
          className="rounded-full bg-muted/40 p-1 shadow-sm"
        >
          <Input
            type="search"
            placeholder="Search high-resolution photos..."
            className="border-none bg-transparent focus-visible:ring-0"
          />
          <Button className="rounded-full px-6">Search</Button>
        </Field>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2 text-sm text-muted-foreground">
        <span className="font-medium">Trending:</span>

        {arr.map((item) => (
          <span
            key={item}
            className="cursor-pointer rounded-full bg-muted px-3 py-1 hover:bg-muted/70 transition"
          >
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
