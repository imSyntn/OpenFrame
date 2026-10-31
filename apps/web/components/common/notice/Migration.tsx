"use client";

import { useEffect } from "react";
import {
  ArrowRightLeft,
  ExternalLink,
  Heart,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";
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
        className="max-h-[90dvh] overflow-y-auto overflow-x-hidden p-0 sm:max-w-3xl gap-0"
      >
        <div className="h-1.5 shrink-0 bg-gradient-to-r from-emerald-400 via-emerald-600 to-emerald-900" />

        <div className="grid md:grid-cols-[1.15fr_0.85fr]">
          <section className="space-y-6 p-6 sm:p-8">
            <DialogHeader className="items-start space-y-4 text-left">
              <div className="flex size-14 items-center justify-center rounded-2xl bg-sky-500/10 ring-1 ring-sky-500/20">
                <ArrowRightLeft className="size-7 animate-pulse text-sky-500" />
              </div>

              <Badge
                variant="secondary"
                className="gap-1.5 rounded-full px-3 py-1"
              >
                <Sparkles className="size-3.5" />
                Scheduled Maintenance
              </Badge>

              <div className="space-y-2">
                <DialogTitle className="text-2xl font-bold tracking-tight sm:text-3xl">
                  Infrastructure Migration
                </DialogTitle>

                <DialogDescription className="text-sm leading-6">
                  OpenFrame is moving to new infrastructure to deliver a faster
                  and more reliable experience for everyone.
                </DialogDescription>
              </div>
            </DialogHeader>

            <Separator />

            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">
                What this means
              </h3>

              <ul className="space-y-1 list-disc list-inside">
                <li className="text-sm leading-6 text-muted-foreground ml-2">
                  OpenFrame is temporarily unavailable during the migration.
                </li>

                <li className="text-sm leading-6 text-muted-foreground ml-2">
                  Service will resume once the migration is complete.
                </li>
              </ul>
            </div>

            <p className="text-sm text-muted-foreground">
              Thanks for your patience while we make OpenFrame better. ❤️
            </p>
          </section>

          <aside className="flex flex-col justify-between gap-6 border-t bg-muted/30 p-6 md:border-l md:border-t-0 sm:p-8">
            <div className="space-y-5">
              <div className="flex size-12 items-center justify-center rounded-xl bg-rose-500/10">
                <Heart className="size-6 text-rose-500 animate-pulse" />
              </div>

              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Independent project
                </p>

                <h3 className="text-xl font-bold tracking-tight">
                  Help keep OpenFrame running.
                </h3>

                <p className="text-sm leading-6 text-muted-foreground">
                  Your support helps cover infrastructure costs and enables
                  continued development of OpenFrame.
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {["Buy Me a Coffee", "GitHub Sponsors", "UPI"].map((method) => (
                  <span
                    key={method}
                    className="rounded-full border bg-background px-3 py-1.5 text-xs text-muted-foreground"
                  >
                    {method}
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <a
                href="https://www.sayantan.online/support"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-3 text-sm font-medium text-background transition-opacity hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                Support OpenFrame
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>

              <a
                href="https://github.com/sponsors/imSyntn"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Learn more about supporting the project
                <ExternalLink className="size-3" />
              </a>
            </div>
          </aside>
        </div>
      </DialogContent>
    </Dialog>
  );
}
