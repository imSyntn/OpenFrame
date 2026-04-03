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
import { Collection } from "@workspace/types";
import { Settings } from "lucide-react";

export function UpdateCollection({ open }: { open: boolean | Collection }) {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="icon">
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent className="min-w-[95vw] sm:min-w-[70vw] max-h-[90vh] overflow-y-auto pr-0">
        <DialogHeader>
          <DialogTitle>Update collection</DialogTitle>
          <DialogDescription>
            Update your collection to organize your items and keep everything in
            one place for easy access.
          </DialogDescription>
        </DialogHeader>
        {!isLoggedIn ? (
          <div className="flex flex-col items-center gap-4">
            <p>Please login to update a collection</p>
            <Link href="/login">
              <Button>Login</Button>
            </Link>
          </div>
        ) : (
          <ScrollArea className="max-h-[70vh] pr-4">
            <Form {...(typeof open == "boolean" ? {} : { collection: open })} />
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
}
