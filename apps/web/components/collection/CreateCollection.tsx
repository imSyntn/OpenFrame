"use client";

import { useUserStore } from "@/store";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import Link from "next/link";
import { Form } from "./Form";
import { ScrollArea } from "@workspace/ui/components/scroll-area";
// import { Collection } from "@workspace/types";
import { cn } from "@workspace/ui/lib/utils";
import { useState } from "react";

export function CreateCollection({
  // open,
  className,
  onCreated,
}: {
  // open: boolean | Collection;
  className?: string;
  onCreated?: (id?: string) => void;
}) {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const [open, setOpen] = useState(false);

  const handleModalClose = () => {
    setOpen(false);
    onCreated?.();
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div
        className={cn(
          "w-full flex justify-center items-center p-2 mb-4",
          className,
        )}
      >
        <DialogTrigger asChild>
          <Button>Create collection</Button>
        </DialogTrigger>
      </div>
      <DialogContent className="min-w-[95vw] sm:min-w-[70vw] max-h-[90vh] overflow-y-auto pr-0">
        <DialogHeader>
          <DialogTitle>Create collection</DialogTitle>
          <DialogDescription>
            Create a collection to organize your items and keep everything in
            one place for easy access.
          </DialogDescription>
        </DialogHeader>
        {!isLoggedIn ? (
          <div className="flex flex-col items-center gap-4">
            <p>Please login to create a collection</p>
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          </div>
        ) : (
          <ScrollArea className="max-h-[70vh] pr-4">
            <Form onCreated={handleModalClose} />
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
}
