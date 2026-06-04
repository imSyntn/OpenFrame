"use client";

import { Skeleton } from "@workspace/ui/components/skeleton";
import React from "react";
const heights = [220, 280, 320, 260, 240, 300];

export function ImageSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="my-4 columns-1 gap-4 space-y-4 sm:columns-2 md:columns-3 lg:columns-4">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton
          key={i}
          className="w-full break-inside-avoid rounded-xl bg-muted animate-pulse"
          style={{
            height: `${heights[i % heights.length]}px`,
          }}
        />
      ))}
    </div>
  );
}
