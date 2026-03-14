import { useGetAllUploadsStatus } from "@/hooks";
import { UnderProcessingPictureType } from "@workspace/types";
import { Skeleton } from "@workspace/ui/components/skeleton";
import React from "react";
import { Card } from "./Card";
import { Modal } from "./Modal";

export function Processing() {
  const { data, isLoading, error } = useGetAllUploadsStatus();

  return (
    <div className="min-h-[60dvh] border rounded-xl p-6 flex gap-3 flex-wrap">
      {isLoading &&
        Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="border rounded-xl p-4 flex gap-4 items-start">
            <Skeleton className="w-16 h-16 rounded-lg" />
            <div className="flex flex-col gap-2 flex-1">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-3 w-48" />
            </div>
          </div>
        ))}

      {error && (
        <p className="text-destructive text-sm">Failed to load uploads.</p>
      )}

      {data?.map((item: UnderProcessingPictureType) => (
        <Modal key={item.id} data={item}>
          <Card data={item} />
        </Modal>
      ))}
    </div>
  );
}
