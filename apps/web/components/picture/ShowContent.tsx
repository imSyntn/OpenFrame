"use client";

import { useGlobalStateStore } from "@/store";
import { useGetPictureById } from "@/hooks";
import { useEffect } from "react";
import { toast } from "sonner";
import { Content, NotFound } from "@/components/common";
import { ContentSkeleton } from "./ContentSkeleton";
import { AlertCircle, CameraOff } from "lucide-react";
import { Button } from "@workspace/ui/components/button";

export function ShowContent({ pictureId }: { pictureId: string }) {
  const setOpen = useGlobalStateStore((state) => state.setOpen);
  const {
    data: picture,
    isLoading,
    isError,
    error,
  } = useGetPictureById(pictureId);

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
      <NotFound
        Icon={CameraOff}
        title="Picture not found"
        description={
          (error as any)?.response?.data?.message ||
          "The picture you're looking for doesn't exist or the link may be incorrect."
        }
      />
    );
  }

  return <Content />;
}
