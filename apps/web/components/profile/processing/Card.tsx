import { UnderProcessingPictureType } from "@workspace/types";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { cn } from "@workspace/ui/lib/utils";
import { formatDistanceToNow } from "date-fns";
import React from "react";

export function CardSkeleton() {
  return (
    <div className="h-[100px] w-[200px] flex items-center gap-4 border rounded-xl p-4 hover:bg-muted/40 transition cursor-pointer">
      <div className="relative">
        <Skeleton className="w-16 h-16 rounded-lg" />
      </div>

      <div className="flex flex-col gap-3">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-3 w-22" />
      </div>
    </div>
  );
}

export function Card({
  data,
  onClick,
}: {
  data: UnderProcessingPictureType;
  onClick: () => void;
}) {
  return (
    <div
      className={cn(
        "h-[100px] w-[200px] flex items-center gap-4 border rounded-xl p-4 hover:bg-muted/40 transition cursor-pointer",
        data.processing === "done" && " border-2 border-success/40",
        data.processing === "ongoing" && " border-2 border-processing/40",
        data.processing === "failed" && " border-2 border-destructive/40",
      )}
      onClick={onClick}
    >
      <div className="relative">
        <img
          src={data.url}
          alt={data.title}
          className="min-w-16 max-w-16 h-16 rounded-lg object-cover border"
        />

        <span
          className={cn(
            "absolute -top-1 -right-1 h-3 w-3 rounded-full",
            data.processing == "ongoing"
              ? "bg-processing animate-pulse"
              : ["ready", "done"].includes(data.processing)
                ? "bg-success"
                : "bg-destructive",
          )}
        />
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-sm font-semibold leading-tight line-clamp-1">
          {data.title}
        </span>
        <span className="text-xs text-muted-foreground line-clamp-1">
          {formatDistanceToNow(new Date(data.created_at), {
            addSuffix: true,
          })}
        </span>
      </div>
    </div>
  );
}
