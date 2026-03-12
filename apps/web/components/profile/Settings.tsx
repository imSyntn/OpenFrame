"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import React from "react";
import { Form } from "./Form";

export function Settings() {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const open = !!params.get("settings");

  const handleClose = () => {
    const newParams = new URLSearchParams(params.toString());
    newParams.delete("settings");

    router.replace(`${pathname}?${newParams.toString()}`);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="min-w-[95vw] sm:min-w-[80vw] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Profile Settings</DialogTitle>
          <DialogDescription>
            Update your profile information visible to other users.
          </DialogDescription>
        </DialogHeader>

        <Form handleClose={handleClose} />
      </DialogContent>
    </Dialog>
  );
}
