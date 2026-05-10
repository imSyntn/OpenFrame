"use client";

import { tagsType } from "@workspace/types";
import { Button } from "@workspace/ui/components/button";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { cn } from "@workspace/ui/lib/utils";
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import React, { useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

type ScrollDirection = "left" | "right";

export function TagSelector({
  tags,
  loading,
}: {
  tags: tagsType[];
  loading: boolean;
}) {
  const router = useRouter();
  const params = useSearchParams();
  const selectedTag = params.get("tag");
  const containerRef = useRef<null | HTMLDivElement>(null);

  const handleScroll = (direction: ScrollDirection) => {
    const container = containerRef.current;
    if (!container) return;

    container.scrollBy({
      left: direction === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  return (
    <div className="flex gap-2 items-center">
      <Button
        size="icon"
        variant="outline"
        onClick={() => handleScroll("left")}
      >
        <ChevronLeft />
      </Button>
      <div
        className="flex-1 flex gap-3 py-8 overflow-x-auto scrollbar-none"
        ref={containerRef}
      >
        {loading
          ? new Array(20).fill(0).map((_, index) => {
              return (
                <div key={index} className="flex flex-col items-center gap-1">
                  <Skeleton className="w-20 h-8 rounded-full" />
                </div>
              );
            })
          : tags?.map((tag) => {
              const isSelected = tag.id === Number(selectedTag);
              return (
                <div key={tag.id} className="flex flex-col items-center gap-1">
                  <Button
                    variant="ghost"
                    onClick={() => router.push(`/explore?tag=${tag.id}`)}
                    className={cn(
                      "rounded-full px-4 py-2 text-sm hover:bg-primary! hover:text-primary-foreground!",
                      isSelected
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "bg-muted/50",
                    )}
                  >
                    {tag.name}
                  </Button>
                  {isSelected && (
                    <div className="w-10 h-1 bg-primary rounded-full"></div>
                  )}
                </div>
              );
            })}
      </div>
      <Button
        size="icon"
        variant="outline"
        onClick={() => handleScroll("right")}
      >
        <ChevronRight />
      </Button>
    </div>
  );
}
