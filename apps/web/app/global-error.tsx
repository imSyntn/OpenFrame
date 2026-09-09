"use client";

import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { AlertTriangle } from "lucide-react";
import { Button } from "@workspace/ui/components/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error caught:", error);
    Sentry.captureException(error);
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-background text-foreground antialiased">
        <div className="flex flex-col items-center justify-center min-h-dvh text-center px-6">
          <div className="flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 text-destructive mb-4">
            <AlertTriangle className="w-8 h-8" />
          </div>

          <h2 className="text-2xl font-semibold tracking-tight mb-2">
            Something went wrong!
          </h2>

          <p className="text-muted-foreground max-w-md text-sm mb-6">
            A critical application error occurred. You can try reloading the application.
          </p>

          <div className="flex gap-3">
            <Button onClick={() => reset()} variant="default">
              Try again
            </Button>

            <Button
              variant="outline"
              onClick={() => (window.location.href = "/")}
            >
              Go Home
            </Button>
          </div>

          {process.env.NODE_ENV === "development" && error?.message && (
            <pre className="mt-6 text-left text-xs bg-muted/60 border border-border p-4 rounded-xl overflow-auto max-w-xl text-destructive font-mono">
              {error.message}
            </pre>
          )}
        </div>
      </body>
    </html>
  );
}
