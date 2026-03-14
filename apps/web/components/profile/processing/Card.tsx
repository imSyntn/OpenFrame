import { UnderProcessingPictureType } from "@workspace/types";
import { cn } from "@workspace/ui/lib/utils";
import React from "react";

export function Card({ data }: { data: UnderProcessingPictureType }) {
  return (
    <div className="h-[100px] w-[200px] flex items-center gap-4 border rounded-xl p-4 hover:bg-muted/40 transition cursor-pointer">
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
              : data.processing == "ready"
                ? "bg-success"
                : "bg-destructive",
          )}
        />
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-sm font-semibold leading-tight line-clamp-1">
          {data.title}
        </span>
        <span className="text-xs text-muted-foreground">
          {new Date(data.createdAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
}
