import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import { Card } from "@workspace/ui/components/card";
import { ExternalLink, Github, Heart } from "lucide-react";
import React from "react";

export function BuiltByCard() {
  return (
    <Card className="relative overflow-hidden rounded-3xl border border-border/30 bg-secondary/20 backdrop-blur-sm p-16 text-center">
      <div
        className="absolute inset-0 opacity-[0.02] dark:opacity-[0.04]"
        style={{
          backgroundImage:
            "radial-gradient(var(--foreground) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
        }}
      />

      <div className="absolute top-0 left-1/2 -translate-x-1/2 h-64 w-96 rounded-full bg-primary/6 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 h-48 w-64 rounded-full bg-chart-2/6 blur-[80px] pointer-events-none" />

      <div className="relative z-10">
        <div className="relative inline-block mb-8">
          <Avatar className="h-28 w-28 border-4 border-background shadow-2xl ring-4 ring-primary/10">
            <AvatarImage
              src="https://github.com/imSyntn.png"
              alt="Sayantan Sarkar"
            />
            <AvatarFallback>SS</AvatarFallback>
          </Avatar>
          <div className="absolute -bottom-1 -right-1 h-8 w-8 rounded-full bg-chart-2 flex items-center justify-center shadow-lg">
            <Heart className="h-4 w-4 text-white fill-white" />
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
          Built with{" "}
          <span className="relative inline-block">
            <Heart className="inline-block h-8 w-8 text-destructive mx-1 fill-destructive animate-[heartbeat_1.5s_ease-in-out_infinite]" />
          </span>{" "}
          by{" "}
          <span className="bg-gradient-to-r from-primary to-chart-2 bg-clip-text text-transparent">
            Sayantan Sarkar
          </span>
        </h2>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mt-10">
          <Button
            asChild
            variant="default"
            size="lg"
            className="rounded-full px-8 w-full sm:w-auto shadow-lg shadow-primary/20 group/btn"
          >
            <a
              href="https://sayantan.online"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2"
            >
              Visit my Website
              <ExternalLink className="h-4 w-4 transition-transform group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
            </a>
          </Button>

          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full px-8 w-full sm:w-auto"
          >
            <a
              href="https://github.com/imSyntn"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
          </Button>
        </div>
      </div>
    </Card>
  );
}
