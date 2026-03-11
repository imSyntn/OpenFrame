"use client";

import Link from "next/link";
import { Button } from "@workspace/ui/components/button";
import { CameraOff } from "lucide-react";

export default function NotFound() {
  return (
    <div className="flex min-h-screen w-full items-center justify-center px-6">
      <div className="flex max-w-md flex-col items-center text-center gap-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <CameraOff className="h-8 w-8 text-muted-foreground" />
        </div>

        <h1 className="text-2xl font-semibold tracking-tight">
          Profile not found
        </h1>

        <p className="text-sm text-muted-foreground">
          The photographer you're looking for doesn't exist or the link may be
          incorrect.
        </p>

        <div className="flex gap-3">
          <Button asChild>
            <Link href="/">Go home</Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="/explore">Explore photos</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
