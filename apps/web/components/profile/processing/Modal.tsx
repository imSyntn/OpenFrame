import { UnderProcessingPictureType } from "@workspace/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { Badge } from "@workspace/ui/components/badge";
import React from "react";
import { cn } from "@workspace/ui/lib/utils";

export function Modal({
  data,
  children,
}: {
  data: UnderProcessingPictureType;
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger className="h-fit cursor-pointer">{children}</DialogTrigger>

      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {data.title}
          </DialogTitle>

          {data.description && (
            <DialogDescription>{data.description}</DialogDescription>
          )}
        </DialogHeader>
        <div className="overflow-hidden rounded-lg border">
          <img
            src={data.url}
            alt={data.title}
            className="w-full max-h-[60vh] object-contain"
          />
        </div>
        {data.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {data.tags.map((tag) => (
              <span
                key={tag.id}
                className="text-xs px-2 py-1 rounded-md border bg-muted"
              >
                #{tag.name}
              </span>
            ))}
          </div>
        )}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xs text-muted-foreground">
            Temp ID: {data.id}
          </span>

          <Badge
            className={cn(
              data.processing == "ongoing"
                ? "bg-processing"
                : data.processing == "ready"
                  ? "bg-success"
                  : "bg-destructive",
              "text-black",
            )}
          >
            {data.processing}
          </Badge>
        </div>
      </DialogContent>
    </Dialog>
  );
}
