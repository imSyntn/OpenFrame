"use client";

import { useGenerateApiKey } from "@/hooks";
import { copyToClipboard } from "@/utils";
import { Button } from "@workspace/ui/components/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { Field, FieldError } from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Copy } from "lucide-react";
import { ReactNode, useState } from "react";

export function APICreate({ children }: { children: ReactNode }) {
  const { mutateAsync, isPending, isSuccess, isError, data, error } =
    useGenerateApiKey();
  const [name, setName] = useState("");

  const handleSubmit = async () => {
    await mutateAsync({ name });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isSuccess ? "API Key Created" : "Create API Key"}
          </DialogTitle>
          <DialogDescription>
            {isSuccess
              ? "Here is your API Key"
              : "Create a new API key to access the OpenFrame API."}
          </DialogDescription>
        </DialogHeader>

        {isSuccess ? (
          <Field>
            <Label htmlFor="api-key">API Key</Label>

            <div className="mt-2 flex gap-2">
              <Input
                id="api-key"
                value={data?.data?.apiKey.key}
                readOnly
                className="font-mono text-muted-foreground"
              />

              <Button
                size="icon"
                variant="outline"
                onClick={() => copyToClipboard(data?.data?.apiKey.key!)}
              >
                <Copy className="size-4" />
              </Button>
            </div>
          </Field>
        ) : (
          <Field>
            <Label htmlFor="api-key-name">Key Name</Label>

            <Input
              id="api-key-name"
              placeholder="Production"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2"
              disabled={isPending}
            />

            {isError && <FieldError errors={error?.response?.data?.errors || "Validation failed"} />} 
          </Field>
        )}

        <DialogFooter className="sm:justify-between">
          <DialogClose asChild>
            <Button type="button" variant="outline">
              {isSuccess ? "Done" : "Cancel"}
            </Button>
          </DialogClose>

          {!isSuccess && (
            <Button onClick={handleSubmit} disabled={isPending}>
              {isPending ? "Creating..." : "Create Key"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
