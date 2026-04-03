"use client";

import { useGlobalStateStore } from "@/store";
import { useGetPictureById } from "@/hooks";
import { useEffect } from "react";
import { toast } from "sonner";
import { Content } from "@/components/common";
import { ContentSkeleton } from "./ContentSkeleton";
import { AlertCircle } from "lucide-react";
import { Button } from "@workspace/ui/components/button";

export function ShowContent({ pictureId }: { pictureId: string }) {
  const setOpen = useGlobalStateStore((state) => state.setOpen);
  const { data: picture, isLoading, isError } = useGetPictureById(pictureId);

  useEffect(() => {
    if (!isLoading && isError) {
      toast.error("Failed to fetch picture");
    } else if (!isLoading && !isError) {
      setOpen(false, picture?.data);
    }

    return () => {
      setOpen(false, undefined);
    };
  }, [isError, isLoading]);

  if (isLoading) {
    return <ContentSkeleton />;
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] text-center px-6">
        <div className="mb-4 rounded-full bg-red-50 p-3 dark:bg-red-950">
          <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
        </div>
        <h2 className="text-lg font-semibold mb-1">Something went wrong</h2>

        <p className="text-sm text-muted-foreground mb-4 max-w-sm">
          We couldn’t load this content. Please try again or check your
          connection.
        </p>

        <Button onClick={() => window.location.reload()}>Try again</Button>
      </div>
    );
  }

  return <Content />;
}
