"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import React, { useState } from "react";
import { Form } from "./Form";

export function SettingsModal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="cursor-pointer">{children}</DialogTrigger>
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
