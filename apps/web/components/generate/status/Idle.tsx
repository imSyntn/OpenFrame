import {
  Card,
  CardDescription,
  CardHeader,
} from "@workspace/ui/components/card";
import { Sparkles, Wand2 } from "lucide-react";
import React from "react";

export function Idle() {
  return (
    <div className="flex flex-col items-center justify-center text-center p-6 max-w-md space-y-4">
      <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-tr from-amber-500/20 via-purple-500/20 to-cyan-500/20 flex items-center justify-center border border-primary/20 shadow-lg">
        <Wand2 className="w-10 h-10 text-primary animate-pulse" />
        <div className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-amber-500/30 flex items-center justify-center border border-amber-500/50">
          <Sparkles className="w-3.5 h-3.5 text-amber-500" />
        </div>
      </div>

      <div className="space-y-1.5">
        <h3 className="text-lg font-bold text-foreground">
          Your AI Canvas Awaits
        </h3>
        <p className="text-xs text-muted-foreground leading-relaxed">
          Enter a prompt, choose your favorite style and aspect ratio, then
          click <span className="font-semibold text-foreground">Generate</span>{" "}
          to create your artwork.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2 w-full pt-2">
        <Card className="text-left p-3 gap-2">
          <CardHeader className="text-[11px] p-0">Pro Tip #1</CardHeader>
          <CardDescription className="text-[11px]">
            Use "Enhance" to automatically expand your prompt with camera &
            lighting details.
          </CardDescription>
        </Card>
        <Card className="text-left p-2 gap-2">
          <CardHeader className="text-[11px] p-0">Pro Tip #2</CardHeader>
          <CardDescription className="text-[11px]">
            Click "Surprise Me" for curated prompts ready to render with styles
            and settings.
          </CardDescription>
        </Card>
      </div>
    </div>
  );
}
