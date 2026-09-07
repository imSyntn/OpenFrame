import { STEP_MESSAGES } from "@workspace/constants";
import { Progress } from "@workspace/ui/components/progress";
import { Sparkles } from "lucide-react";
import React, { useEffect, useState } from "react";

export function Generating() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress === 100) return;

    const interval = setInterval(() => {
      setProgress((prev) => prev + 20);
    }, 2000);
    return () => clearInterval(interval);
  }, [progress]);

  const stepMessage = STEP_MESSAGES[Math.ceil(progress / 20)];

  return (
    <>
      <div className="absolute inset-0 opacity-35 bg-[radial-gradient(circle,theme(colors.primary/15%)_1px,transparent_1px)] bg-[size:14px_14px] mask-[radial-gradient(ellipse_at_center,black,transparent_75%)] animate-[dots_5s_linear_infinite]" />
      <div className="flex flex-col items-center justify-center text-center p-6 max-w-sm space-y-6 w-full">
        <div className="relative flex h-28 w-28 items-center justify-center">
          <Sparkles
            className="h-10 w-10 text-fuchsia-500 dark:text-violet-400 animate-pulse"
            strokeWidth={1.25}
          />
        </div>

        <div className="space-y-2 w-full">
          <h4 className="text-base font-semibold text-foreground">
            Generating AI Image...
          </h4>
          <p className="text-xs text-muted-foreground font-mono">
            {stepMessage}
          </p>
          <Progress value={progress} className="h-2 w-full bg-muted" />
          <span className="text-[11px] text-muted-foreground/70 font-mono">
            {progress}% complete
          </span>
        </div>
      </div>
    </>
  );
}
