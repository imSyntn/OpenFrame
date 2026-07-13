import { useGetPictureById } from "@/hooks";
import React from "react";
import { NotFound } from "../common";
import { AlertCircle } from "lucide-react";
import { Form } from "./Form";
import { Preview } from "./Preview";
import ReportPageSkeleton from "./ReportSkeleton";

export function Content({ imageId }: { imageId: string }) {
  const { data: imageData, isLoading } = useGetPictureById(imageId);

  if (isLoading) {
    return <ReportPageSkeleton />;
  }

  const { data: image } = imageData || {};

  if (!image) {
    return (
      <NotFound
        Icon={AlertCircle}
        title="Invalid image id"
        description="Please provide a valid image id"
      />
    );
  }

  return (
    <div className="min-h-[calc(100dvh-55px)] bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-4 py-8 md:flex-row md:items-center md:justify-center md:px-8">
        <Preview image={image} />
        <Form imageId={imageId} />
      </div>
    </div>
  );
}
