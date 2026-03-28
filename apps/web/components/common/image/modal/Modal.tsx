"use client";

import React from "react";
import { Dialog, DialogContent } from "@workspace/ui/components/dialog";
import { useGlobalStateStore } from "@/store";
import { Content } from "./Content";

export function ImageModal() {
  const open = useGlobalStateStore((state) => state.open);
  const setOpen = useGlobalStateStore((state) => state.setOpen);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="min-w-[95vw] h-[90vh] p-0 overflow-hidden">
        <Content />
      </DialogContent>
    </Dialog>
  );
}
