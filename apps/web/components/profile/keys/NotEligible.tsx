import { Camera, ShieldCheck, ShieldAlert } from "lucide-react";
import React from "react";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert";

export function NotEligible({ pictures }: { pictures: number }) {
  const remaining = Math.max(5 - pictures, 0);

  return (
    <Alert className="relative overflow-hidden border-orange-400/20 bg-gradient-to-br from-orange-400/[0.08] via-background to-background p-5">
      <div className="flex gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-orange-500/10">
          <ShieldAlert className="size-5 text-orange-500" />
        </div>

        <div className="min-w-0 flex-1 space-y-4">
          <div>
            <AlertTitle className="text-base font-semibold">
              Not eligible for an API key
            </AlertTitle>

            <AlertDescription className="mt-1.5 text-sm leading-relaxed">
              You currently have{" "}
              <strong className="font-semibold text-foreground">
                {pictures} {pictures === 1 ? "picture" : "pictures"}
              </strong>{" "}
              uploaded. You need at least{" "}
              <strong className="font-semibold text-foreground">5</strong> to
              create an API key.
            </AlertDescription>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/60 px-3 py-2.5">
              <Camera className="size-4 shrink-0 text-orange-500" />
              <span className="text-sm text-muted-foreground">
                Upload at least{" "}
                <strong className="text-foreground">5 pictures</strong>
              </span>
            </div>

            <div className="flex items-center gap-2 rounded-lg border border-border/60 bg-background/60 px-3 py-2.5">
              <ShieldCheck className="size-4 shrink-0 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">
                {remaining > 0 ? (
                  <>
                    <strong className="text-foreground">{remaining}</strong>{" "}
                    more {remaining === 1 ? "upload" : "uploads"} needed
                  </>
                ) : (
                  "You're ready to create an API key"
                )}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Alert>
  );
}
