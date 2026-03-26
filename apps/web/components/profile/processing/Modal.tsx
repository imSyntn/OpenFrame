import { UnderProcessingPictureType } from "@workspace/types";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { ScrollArea, ScrollBar } from "@workspace/ui/components/scroll-area";
import { Badge } from "@workspace/ui/components/badge";
import React from "react";
import { cn } from "@workspace/ui/lib/utils";
import { BadgeCheck, Check, Hash, LoaderIcon } from "lucide-react";

export function Modal({
  data,
  clearData,
}: {
  data: UnderProcessingPictureType | null;
  clearData: () => void;
}) {
  if (!data) return null;
  return (
    <Dialog open={!!data} onOpenChange={clearData}>
      <DialogContent className="max-w-2xl max-h-[85vh]">
        <DialogHeader>
          <DialogTitle className="text-lg font-semibold">
            {data.title}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] w-full">
          <div className="space-y-4 pb-1">
            {data.description && (
              <DialogDescription>{data.description}</DialogDescription>
            )}

            <div className="overflow-hidden rounded-lg border">
              <img
                src={data.url}
                alt={data.title}
                className="w-full max-h-[60vh] object-contain"
              />
            </div>

            {data.tags.length > 0 && (
              <>
                <p className="text-sm font-semibold text-muted-foreground mb-2">
                  Tags
                </p>
                <div className="flex flex-wrap gap-2">
                  {data.tags.map((tag) => (
                    <Badge key={tag.id} variant="secondary">
                      <Hash data-icon="inline-start" />
                      {tag.name}
                    </Badge>
                  ))}
                </div>
              </>
            )}

            {data.stepsCompleted.length > 0 && (
              <>
                <p className="text-sm font-semibold text-muted-foreground mb-2">
                  Steps Completed
                </p>

                <div className="flex flex-wrap gap-2">
                  {data.stepsCompleted.map((step) => (
                    <Badge
                      key={step}
                      variant="secondary"
                      className="bg-success"
                    >
                      <BadgeCheck data-icon="inline-start" />
                      {step}
                    </Badge>
                  ))}
                  <Badge variant="secondary" className="bg-processing">
                    {data.stepsCompleted.length < 5 ? (
                      <>
                        <LoaderIcon
                          data-icon="inline-start"
                          className="animate-spin"
                        />
                        processing
                      </>
                    ) : (
                      <>
                        <Check data-icon="inline-start" />
                        ready
                      </>
                    )}
                  </Badge>
                </div>
              </>
            )}

            <div className="flex items-center justify-center">
              <span className="text-xs text-muted-foreground">
                {data.processing === "done"
                  ? "Processing completed, picture is now available in your profile"
                  : "Processing in progress, picture will be available in your profile once completed"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-muted-foreground">
                Temp ID: {data.id}
              </span>

              <Badge
                className={cn(
                  data.processing === "ongoing"
                    ? "bg-processing"
                    : ["ready", "done"].includes(data.processing)
                      ? "bg-success"
                      : "bg-destructive",
                  "text-black",
                )}
              >
                {data.processing}
              </Badge>
            </div>
          </div>

          <ScrollBar orientation="vertical" className="opacity-100" />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
