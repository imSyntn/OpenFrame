import { ShieldAlert } from "lucide-react";
import React from "react";
import { APICreate } from "./APICreate";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert";
import { Button } from "@workspace/ui/components/button";
import { ApiKeyType } from "@workspace/types";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { useProfileStore } from "@/store";

export function KeysHeroSection({
  loading,
  keys,
}: {
  loading: boolean;
  keys: ApiKeyType[] | [];
}) {
  const activeKeys = keys.filter((key) => key.isActive);
  const pictures = useProfileStore((state) => state._count?.pictures);

  const disableApiCreation = activeKeys.length > 0 || (pictures ?? 0) < 5;

  return (
    <>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Keys</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Create and manage API keys to access the OpenFrame API.
          </p>
        </div>

        {loading ? (
          <Skeleton className="h-8 w-28 rounded-lg" />
        ) : (
          <APICreate>
            <Button disabled={disableApiCreation}>Create API Key</Button>
          </APICreate>
        )}
      </div>

      <Alert className="overflow-hidden border-yellow-500/20 bg-gradient-to-br from-yellow-500/[0.08] via-background to-background p-5">
        <div className="flex gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-yellow-500/10 ring-1 ring-yellow-500/20">
            <ShieldAlert className="size-6 text-processing" />
          </div>

          <div className="min-w-0 flex-1">
            <AlertTitle className="text-base font-semibold text-processing">
              Keep your keys secure
            </AlertTitle>

            <AlertDescription className="mt-3">
              <div className="space-y-2">
                <div className="rounded-lg border border-border/50 bg-background/50 px-3.5 py-3">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    <span className="font-medium text-foreground">
                      Never share your API key.
                    </span>{" "}
                    Store it in a secure location.
                  </p>
                </div>

                <div className="rounded-lg border border-border/50 bg-background/50 px-3.5 py-3">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    <span className="font-medium text-foreground">
                      Only one active API key
                    </span>{" "}
                    is allowed per account at a time.
                  </p>
                </div>

                <div className="rounded-lg border border-border/50 bg-background/50 px-3.5 py-3">
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    <span className="font-medium text-foreground">
                      Creating a new API key
                    </span>{" "}
                    requires disabling your current one.
                  </p>
                </div>
              </div>
            </AlertDescription>
          </div>
        </div>
      </Alert>
    </>
  );
}
