import { useGetAllUploadsStatus } from "@/hooks";
import { UnderProcessingPictureType } from "@workspace/types";
import React from "react";
import { Card, CardSkeleton } from "./Card";
import { Modal } from "./Modal";

export function Processing() {
  const { data, isLoading, error } = useGetAllUploadsStatus();
  const [selectedPicture, setSelectedPicture] =
    React.useState<UnderProcessingPictureType | null>(null);

  return (
    <>
      <div className="min-h-[60dvh] border rounded-xl p-6 grid gap-4 justify-center auto-rows-fr [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))] relative">
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}

        {error && (
          <div className="text-destructive text-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            Failed to load uploads.
          </div>
        )}

        {!isLoading && !error && data?.length === 0 && (
          <div className="text-muted-foreground text-sm absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            No uploads found.
          </div>
        )}

        {data?.map((item: UnderProcessingPictureType) => (
          <Card
            key={item.id}
            data={item}
            onClick={() => setSelectedPicture(item)}
          />
        ))}
      </div>
      <Modal
        data={selectedPicture}
        clearData={() => setSelectedPicture(null)}
      />
    </>
  );
}
