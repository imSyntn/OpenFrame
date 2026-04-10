"use client";

import { useGlobalStateStore } from "@/store";
import { useGetPictureById } from "@/hooks";
import { useEffect } from "react";
import { toast } from "sonner";
import { Content, ErrorOccured, NotFound } from "@/components/common";
import { ContentSkeleton } from "./ContentSkeleton";
import { AlertCircle, CameraOff } from "lucide-react";
import { Button } from "@workspace/ui/components/button";
import { notFound } from "next/navigation";

export function ShowContent({ pictureId }: { pictureId: string }) {
  const setOpen = useGlobalStateStore((state) => state.setOpen);
  const {
    data: picture,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetPictureById(pictureId);

  useEffect(() => {
    if (!isLoading && isError) {
      toast.error("Failed to fetch picture");
    } else if (!isLoading && !isError && picture?.data) {
      setOpen(false, picture?.data);
    }

    return () => {
      setOpen(false, undefined);
    };
  }, [isError, isLoading, picture?.data]);

  if (isLoading) {
    return <ContentSkeleton />;
  }

  if (isError) {
    return (
      <ErrorOccured
        title={(error as any)?.response?.data?.message}
        className="min-h-[calc(100vh-200px)]"
        onClick={() => refetch()}
      />
    );
  }

  if (!picture?.data) return notFound();

  return <Content />;
}
