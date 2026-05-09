"use client";

import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { cn } from "@workspace/ui/lib/utils";
import React, { useRef, useState } from "react";
import { toast } from "sonner";

export function ImageInput({
  MAX_SIZE,
  setImageFile,
  className,
}: {
  MAX_SIZE: number;
  setImageFile: (file: File) => void;
  className?: string;
}) {
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file && file.size > MAX_SIZE) {
      toast.error(`File size exceeds the limit of ${MAX_SIZE / 1024 / 1024}MB`);
      return;
    }
    if (file) setImageFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];

    if (file && file.type.startsWith("image/")) {
      if (file.size > MAX_SIZE) {
        toast.error(
          `File size exceeds the limit of ${MAX_SIZE / 1024 / 1024}MB`,
        );
        return;
      }
      setImageFile(file);
    }
  };

  return (
    <div
      className={cn(
        "border-2 border-dashed rounded-lg p-6 text-center transition",
        dragging ? "border-primary bg-muted" : "border-muted",
        className,
      )}
      onDragOver={(e) => {
        e.preventDefault();
        setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
    >
      <p className="text-sm text-muted-foreground mb-2">
        Drag & drop an image here
      </p>

      <p className="text-xs text-muted-foreground mb-4">or</p>

      <Label className="cursor-pointer flex items-center justify-center">
        <Input
          type="file"
          accept=".png,.jpeg,.jpg"
          onChange={handleImageChange}
          className="hidden"
          ref={inputRef}
        />

        <Button
          type="button"
          variant="secondary"
          onClick={() => inputRef?.current?.click()}
        >
          Choose Image
        </Button>
      </Label>
    </div>
  );
}
