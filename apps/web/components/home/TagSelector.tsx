import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useRef } from "react";

type ScrollDirection = "left" | "right";

export function TagSelector({
  tags,
  selectedTag,
  setSelectedTag,
}: {
  tags: string[];
  selectedTag: string;
  setSelectedTag: React.Dispatch<React.SetStateAction<string>>;
}) {
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
        className="flex gap-3 py-8 overflow-x-auto scrollbar-none"
        ref={containerRef}
      >
        {tags.map((tag) => {
          const isSelected = tag === selectedTag;
          return (
            <div key={tag} className="flex flex-col items-center gap-1">
              <Button
                variant="ghost"
                onClick={() => setSelectedTag(tag)}
                className={cn(
                  "rounded-full px-4 py-2 text-sm hover:bg-primary! hover:text-primary-foreground!",
                  isSelected
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted/50",
                )}
              >
                {tag}
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
