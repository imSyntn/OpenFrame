import { PictureMatch } from "@workspace/types";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { cn } from "@workspace/ui/lib/utils";
import { ArrowRight } from "lucide-react";
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
        "relative rounded-xl overflow-hidden group cursor-pointer w-full aspect-square bg-muted/40 border border-border/40 hover:border-border/80 transition-all duration-300 shadow-xs hover:shadow-md",
        className,
      )}
    >
      <LazyLoadImage
        src={pic.content.src}
        alt={pic.content.title}
        wrapperClassName="w-full h-full block"
        className="w-full h-full object-cover align-middle block group-hover:scale-105 transition-transform duration-500"
        effect="blur"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-2">
        <span className="text-xs text-white font-medium line-clamp-1 truncate">
          {pic.content.title}
        </span>
      </div>
      <Link href={`/picture/${pic.id}`} className="absolute inset-0" />
    </div>
  );
}

export function PictureCardSkeleton() {
  return <Skeleton className="rounded-xl aspect-square w-full" />;
}

export function PictureCardMore({ query }: { query: string }) {
  return (
    <Link
      href={`/search?q=${query}&type=pictures`}
      className="flex flex-col items-center justify-center gap-1.5 p-3 cursor-pointer border border-dashed border-border/70 hover:border-primary/50 bg-muted/20 hover:bg-muted/50 rounded-xl w-full aspect-square transition-all duration-200 group text-center"
    >
      <span className="text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors">
        View all
      </span>
      <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
    </Link>
  );
}
