"use client";

import { Skeleton } from "@workspace/ui/components/skeleton";
import React from "react";

export function ImageSkeleton({ count = 10 }: { count?: number }) {
  return (
    <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 my-4 space-y-4">
      {Array.from({ length: count }).map((_, i) => (
        <Skeleton
          key={i}
          className="w-full break-inside-avoid rounded-xl bg-muted animate-pulse"
          style={{
            height: `${200 + Math.random() * 200}px`,
          }}
        />
      ))}
    </div>
  );
}
