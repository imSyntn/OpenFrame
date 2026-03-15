import { useGetAllUploadsStatus } from "@/hooks";
import { UnderProcessingPictureType } from "@workspace/types";
import { Skeleton } from "@workspace/ui/components/skeleton";
import React from "react";
import { Card, CardSkeleton } from "./Card";
import { Modal } from "./Modal";
import { Dialog, DialogTrigger } from "@workspace/ui/components/dialog";

export function Processing() {
  const { data, isLoading, error } = useGetAllUploadsStatus();
  const [selectedPicture, setSelectedPicture] =
    React.useState<UnderProcessingPictureType | null>(null);

  return (
    <Dialog>
      <div className="min-h-[60dvh] border rounded-xl p-6 grid gap-4 justify-center auto-rows-fr [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))]">
        {isLoading &&
          Array.from({ length: 6 }).map((_, i) => <CardSkeleton key={i} />)}

        {error && (
          <p className="text-destructive text-sm">Failed to load uploads.</p>
        )}

        {data?.map((item: UnderProcessingPictureType) => (
          <DialogTrigger
            key={item.id}
            className="h-fit cursor-pointer mx-auto sm:mx-0"
          >
            <Card data={item} onClick={() => setSelectedPicture(item)} />
          </DialogTrigger>
        ))}
      </div>
      <Modal data={selectedPicture} />
    </Dialog>
  );
}
