"use client";

import React from "react";
import { Button } from "@workspace/ui/components/button";
import { AlertTriangle, RotateCcw, Sparkles } from "lucide-react";
import { useImageGenerationStore } from "@/components/Provider";

export function GenerationError() {
  const reset = useImageGenerationStore((state) => state.reset);
  const error = useImageGenerationStore((store) => store.error);
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 max-w-sm space-y-6 w-full">
      <div className="relative flex h-24 w-24 items-center justify-center">
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-destructive/30 via-amber-500/20 to-destructive/10 blur-2xl animate-pulse" />

        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-destructive/10 border border-destructive/30 shadow-inner">
          <AlertTriangle className="h-10 w-10 text-destructive drop-shadow-sm" />

          <div className="absolute -top-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-destructive/20 border border-destructive/40">
            <Sparkles className="h-3.5 w-3.5 text-destructive" />
          </div>
        </div>
      </div>

      <div className="space-y-2 w-full">
        <h4 className="text-base font-semibold text-foreground">
          Generation Failed
        </h4>

        <p className="text-xs text-muted-foreground leading-relaxed">{error}</p>
      </div>

      <Button onClick={reset} variant="destructive" size="sm" className="gap-2">
        <RotateCcw className="h-4 w-4" />
        Try Again
      </Button>
    </div>
  );
}
