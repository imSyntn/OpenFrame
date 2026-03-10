import { Button } from "@workspace/ui/components/button";

export function TagDetail({ tag, src }: { tag: string; src: string }) {
  return (
    <div className="relative flex h-72  flex-col items-center justify-center overflow-hidden rounded-xl border bg-muted/30 px-8 py-6 mb-10">
      <img
        src={src}
        alt=""
        className="absolute inset-0 h-full w-full object-cover opacity-20 blur-md"
      />
      <h2 className="text-3xl font-extrabold tracking-tight">{tag}</h2>

      <p className="mt-2 text-muted-foreground">
        Explore over <span className="font-semibold">1000+</span> beautiful
        photos.
      </p>

      <Button className="mt-4 rounded-full px-6 bg-chart-2">
        Submit your picture
      </Button>
    </div>
  );
}
