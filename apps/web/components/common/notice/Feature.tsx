"use client";

import { useEffect, useState } from "react";
import { X, Sparkles } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import Link from "next/link";

type FeatureNoticeProps = {
  storageKey: string;
  title: string;
  description: string;
};

export function Feature({
  storageKey,
  title,
  description,
}: FeatureNoticeProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(!localStorage.getItem(storageKey));
  }, [storageKey]);

  if (!visible) return null;

  const handleClose = () => {
    localStorage.setItem(storageKey, "true");
    setVisible(false);
  };

  return (
    <div className="relative border-b bg-muted/50">
      <div className="mx-auto flex max-w-screen-xl items-center gap-3 px-4 py-3 pr-12 text-left md:min-h-10 md:justify-center md:px-10 md:py-2 md:text-center">
        <Sparkles className="size-4 shrink-0 text-emerald-500" />

        <div className="flex items-center md:justify-center gap-2">
          <span className="text-sm font-medium">{title}</span>

          <span className="text-xs text-muted-foreground sm:text-sm hidden md:inline">
            {description}
          </span>

          <Link
            href="/roadmap"
            className="text-xs text-muted-foreground font-medium underline-offset-4 underline md:hidden"
          >
            Roadmap
          </Link>
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleClose}
        className="absolute right-1 top-1/2 size-8 -translate-y-1/2 sm:right-3"
        aria-label="Close feature announcement"
      >
        <X className="size-4" />
      </Button>
    </div>
  );
}
