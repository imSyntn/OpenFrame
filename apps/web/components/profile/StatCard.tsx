import { Skeleton } from "@workspace/ui/components/skeleton";
import { cn } from "@workspace/ui/lib/utils";
import React from "react";

export function StatCard({
  value,
  label,
  isLoading,
  headingClass,
  textClass,
}: {
  value?: number;
  label: string;
  isLoading?: boolean;
  headingClass?: string;
  textClass?: string;
}) {
  return (
    <div className="flex flex-col gap-1 border rounded-lg px-4 py-3 bg-card items-center md:items-start">
      {isLoading ? (
        <>
          <Skeleton className={cn("h-10 w-10", headingClass)} />
          <Skeleton className={cn("h-4 w-[70px]", textClass)} />
        </>
      ) : (
        <>
          <span className="text-2xl font-semibold">{value ?? 0}</span>
          <span className="text-sm text-muted-foreground">{label}</span>
        </>
      )}
    </div>
  );
}
