"use client";

import { useEffect } from "react";
import { ArrowRightLeft, Sparkles } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { Badge } from "@workspace/ui/components/badge";
import { Separator } from "@workspace/ui/components/separator";

export function MigrationNotice() {
  const queryClient = useQueryClient();

  useEffect(() => {
    queryClient.cancelQueries();
  }, [queryClient]);

  return (
    <Dialog open>
      <DialogContent
        showCloseButton={false}
        onEscapeKeyDown={(e) => e.preventDefault()}
        onInteractOutside={(e) => e.preventDefault()}
        className="overflow-hidden p-0 sm:max-w-xl"
      >
        <div className="h-2 bg-gradient-to-r from-emerald-500 via-emerald-700 to-emerald-900" />

        <div className="space-y-8 p-8">
          <DialogHeader className="items-center space-y-5 text-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-br from-sky-100 to-blue-100 ring-8 ring-sky-50 dark:ring-sky-950/20">
              <ArrowRightLeft className="h-10 w-10 text-sky-600 animate-pulse" />
            </div>

            <Badge variant="secondary" className="gap-1 rounded-full px-3 py-1">
              <Sparkles className="h-3.5 w-3.5" />
              Scheduled Maintenance
            </Badge>

            <div className="space-y-2">
              <DialogTitle className="text-2xl font-bold tracking-tight">
                Infrastructure Migration
              </DialogTitle>

              <DialogDescription className="mx-auto max-w-md text-base leading-7">
                OpenFrame is moving to a new infrastructure to deliver a faster,
                more reliable experience for everyone.
              </DialogDescription>
            </div>
          </DialogHeader>

          <Separator />

          <div className="space-y-5 text-sm leading-6 text-muted-foreground">
            <div className="rounded-xl border bg-muted/40 p-4">
              <p className="font-medium text-foreground">What this means</p>

              <ul className="mt-3 space-y-2">
                <li>OpenFrame is temporarily unavailable.</li>
                <li>Service will resume once the migration completes.</li>
              </ul>
            </div>

            <p className="text-center">
              Thanks for your patience while we make OpenFrame better. ❤️
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
