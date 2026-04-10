"use client";

import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";
import { CircleAlert } from "lucide-react";
import React from "react";

export function ErrorOccured({
  title,
  description,
  className,
  onClick = () => window.location.reload(),
}: {
  title?: string;
  description?: string;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4 min-h-52 w-full items-center justify-center px-6 my-6",
        className,
      )}
    >
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <CircleAlert className="h-8 w-8 text-destructive" />
      </div>

      <h1 className="text-2xl font-semibold tracking-tight text-center">
        {title || "Something went wrong"}
      </h1>

      <p className="text-sm text-muted-foreground text-center">
        {description || "Please try again later"}
      </p>

      <Button onClick={onClick}>Retry</Button>
    </div>
  );
}
