import { PictureMatch } from "@workspace/types";
import { Button } from "@workspace/ui/components/button";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";
import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

export function PictureCard({
  pic,
  className,
}: {
  pic: PictureMatch;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative rounded-xl overflow-hidden group cursor-pointer w-full h-fit leading-none",
        className,
      )}
    >
      <LazyLoadImage
        src={pic.src}
        alt={pic.title}
        className="w-full object-cover align-middle block group-hover:scale-105 transition-transform"
        effect="blur"
      />
      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition flex items-center justify-center opacity-0 group-hover:opacity-100">
        <Link href={`/picture/${pic.id}`}>
          <Button>View</Button>
        </Link>
      </div>
    </div>
  );
}

export function PictureCardSkeleton() {
  return <Skeleton className="rounded-2xl h-32 w-full" />;
}

export function PictureCardMore({ query }: { query: string }) {
  return (
    <div className="flex items-center justify-center gap-3 px-3 py-2 cursor-pointer border-muted border rounded-xl w-full">
      <Link
        href={`/search?q=${query}&type=pictures`}
        className="text-background "
      >
        more
      </Link>
    </div>
  );
}
