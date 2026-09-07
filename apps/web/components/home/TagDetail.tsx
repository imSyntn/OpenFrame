"use client";

import { tagsType } from "@workspace/types";
import { Button } from "@workspace/ui/components/button";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { useSearchParams, useRouter } from "next/navigation";
import { Sparkles, Upload, Tag as TagIcon } from "lucide-react";

export function TagDetail({
  tags,
  loading,
}: {
  tags: tagsType[];
  loading: boolean;
}) {
  const params = useSearchParams();
  const router = useRouter();
  const tag = params.get("tag");
  const tagData = tags?.find((t) => t.id === Number(tag));

  if (loading) {
    return (
      <div className="relative flex h-72 w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-border/50 bg-muted/20 px-8 py-6 mb-10">
        <Skeleton className="w-32 h-6 rounded-full mb-3" />
        <Skeleton className="w-56 h-10 rounded-lg mb-3" />
        <Skeleton className="w-64 h-5 rounded-md mb-6" />
        <Skeleton className="w-44 h-10 rounded-full" />
      </div>
    );
  }

  const tagName = tagData?.name ? tagData.name : "Explore";
  const bgImage = tagData?.url || undefined;

  return (
    <div className="relative flex min-h-[18rem] md:min-h-[20rem] w-full flex-col items-center justify-center overflow-hidden rounded-3xl border border-border/40 bg-card/40 px-6 py-10 mb-10 text-center shadow-xl backdrop-blur-xl">
      {bgImage && (
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={bgImage}
            alt={tagName}
            className="h-full w-full object-cover object-center scale-105 blur-md opacity-30 transition-transform duration-700 hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/75 to-background/40" />
        </div>
      )}

      <div className="pointer-events-none absolute -top-24 left-1/2 -z-10 h-48 w-96 -translate-x-1/2 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 right-1/4 -z-10 h-40 w-80 rounded-full bg-indigo-500/15 blur-3xl" />

      <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
        {tagData ? (
          <TagIcon className="size-3.5 text-primary" />
        ) : (
          <Sparkles className="size-3.5 text-primary" />
        )}

        <span>{tagData ? "Category" : "Explore photos"}</span>
      </div>

      <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-foreground drop-shadow-sm capitalize">
        {tagName}
      </h1>

      <p className="mt-3 max-w-lg text-sm sm:text-base text-muted-foreground font-medium leading-relaxed">
        Discover over <span className="font-bold text-foreground">1,000+</span>{" "}
        royalty-free high-resolution photos contributed by creators.
      </p>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <Button
          size="lg"
          className="group rounded-full px-6 shadow-md transition-all duration-300 bg-chart-2 active:scale-95"
          onClick={() => router.push("/submit")}
        >
          <Upload className="mr-2 size-4 transition-transform group-hover:-translate-y-0.5" />
          Submit your picture
        </Button>
      </div>
    </div>
  );
}
