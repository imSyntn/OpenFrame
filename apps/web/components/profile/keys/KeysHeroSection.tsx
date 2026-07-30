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

export function KeysHeroSection({
  loading,
  keys,
}: {
  loading: boolean;
  keys: ApiKeyType[] | [];
}) {
  const activeKeys = keys.filter((key) => key.isActive);

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
            <Button disabled={activeKeys.length >= 1}>Create API Key</Button>
          </APICreate>
        )}
      </div>

      <Alert className="border-yellow-500/30 bg-yellow-500/5">
        <ShieldAlert className="mt-0.5 h-6! w-6! text-yellow-500!" />
        <AlertTitle className="text-yellow-200">
          Keep your keys secure
        </AlertTitle>
        <AlertDescription className="text-yellow-200">
          <ul className="list-disc pl-3">
            <li>
              <em>Never share your API key.</em> Store it in a secure location.
            </li>
            <li>
              <em>Only one active API key is allowed</em> per account at a time.
            </li>
            <li>
              <em>
                Creating a new API key requires disabling your current one.
              </em>
            </li>
          </ul>
        </AlertDescription>
      </Alert>
    </>
  );
}
