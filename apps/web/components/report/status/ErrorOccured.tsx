import { AlertTriangle } from "lucide-react";
import React from "react";

export function ErrorOccured({ error }: { error: string }) {
  return (
    <div className="flex min-h-[60dvh] items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-destructive/20 bg-destructive/5 p-8 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-destructive/10">
          <AlertTriangle className="h-7 w-7 text-destructive" />
        </div>

        <h2 className="mt-5 text-xl font-semibold">Failed to load report</h2>

        <p className="mt-2 text-sm text-muted-foreground">{error}</p>
      </div>
    </div>
  );
}
