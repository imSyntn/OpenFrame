import { Skeleton } from "@workspace/ui/components/skeleton";
import React from "react";

export function StatusLoading() {
  return (
    <div className="mx-auto max-w-5xl p-6">
      <div className="overflow-hidden rounded-3xl border border-border/50 bg-card/60 shadow-2xl backdrop-blur-xl">
        <div className="grid gap-0 md:grid-cols-[380px_1fr]">
          <Skeleton className="h-[320px] w-full md:h-full" />

          <div className="space-y-6 p-8">
            <div className="space-y-3">
              <Skeleton className="h-8 w-52 rounded-lg" />
              <Skeleton className="h-4 w-72 rounded-md" />
            </div>

            <Skeleton className="h-28 w-full rounded-2xl" />

            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-24 rounded-2xl" />
              <Skeleton className="h-24 rounded-2xl" />
            </div>

            <Skeleton className="h-11 w-40 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
