"use client";

import { Dialog, DialogContent } from "@workspace/ui/components/dialog";
import { useGlobalStateStore, useUserStore } from "@/store";
import { CollectionModalContent } from "./CollectionModalContent";

export function ViewCollectionModal() {
  const setOpenCollectionModal = useGlobalStateStore(
    (state) => state.setOpenCollectionModal,
  );
  const collection = useGlobalStateStore((state) => state.openCollectionModal);
  if (!collection) return null;

  return (
    <Dialog
      open={true}
      onOpenChange={(value) =>
        setOpenCollectionModal(value ? collection : null)
      }
    >
      <DialogContent className="min-w-[95vw] max-h-[90vh] overflow-y-auto pr-0">
        <CollectionModalContent />
      </DialogContent>
    </Dialog>
  );
}
