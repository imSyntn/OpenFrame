import React from "react";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import { Button } from "@workspace/ui/components/button";

export default function NotLoggedIn({ message }: { message?: string }) {
  return (
    <div className="flex min-h-[calc(100dvh-55px)] w-full items-center justify-center px-6">
      <div className="flex max-w-md flex-col items-center text-center gap-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <AlertTriangle
            color="#eab308"
            className="h-8 w-8 text-muted-foreground"
          />
        </div>

        <h1 className="text-2xl font-semibold tracking-tight text-center">
          You are not logged in
        </h1>

        <p className="text-sm text-muted-foreground text-center">
          {message || "Please login to continue"}
        </p>

        <div className="flex gap-3">
          <Button asChild>
            <Link href="/login">Login</Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="/">Go home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
