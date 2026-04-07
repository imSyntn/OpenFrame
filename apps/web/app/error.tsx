"use client";

import { useEffect } from "react";
import { AlertTriangle } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { Header } from "@/components/common";

type ErrorProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error("Error caught in boundary:", error);
  }, [error]);

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-55px)] text-center px-6">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mb-4">
          <AlertTriangle className="w-8 h-8 text-destructive" />
        </div>

        <h2 className="text-2xl font-semibold mb-2">Something went wrong</h2>

        <p className="text-muted-foreground max-w-md mb-6">
          An unexpected error occurred. You can try again or go back to safety.
        </p>

        <div className="flex gap-3">
          <Button onClick={() => reset()} variant="default">
            Try again
          </Button>

          <Button
            variant="secondary"
            onClick={() => (window.location.href = "/")}
          >
            Go Home
          </Button>
        </div>

        {process.env.NODE_ENV === "development" && (
          <pre className="mt-6 text-left text-xs bg-muted p-4 rounded-lg overflow-auto max-w-xl">
            {error.message}
          </pre>
        )}
      </div>
    </>
  );
}
