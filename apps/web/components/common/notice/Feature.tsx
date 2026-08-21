"use client";

import { useEffect, useState } from "react";
import { X, Sparkles } from "lucide-react";
import { Button } from "@workspace/ui/components/button";

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
      <div className="mx-auto flex min-h-10 max-w-screen-xl items-center justify-center gap-2 px-10 py-2 text-center text-sm">
        <Sparkles className="size-4 shrink-0 text-emerald-500" />

        <span className="font-medium">{title}</span>

        <span className="text-muted-foreground">{description}</span>
      </div>

      <Button
        variant="ghost"
        onClick={handleClose}
        className="absolute right-3 top-1/2 -translate-y-1/2"
      >
        <X className="size-4" />
      </Button>
    </div>
  );
}
