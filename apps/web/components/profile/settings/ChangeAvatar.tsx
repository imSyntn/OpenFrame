import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { Label } from "@workspace/ui/components/label";
import { toast } from "sonner";
import { useGetUploadUrl } from "@/hooks";

const MAX_FILE_SIZE = 2 * 1024 * 1024;

export function ChangeAvatar({
  changeAvatar,
  children,
}: {
  changeAvatar: (avatar: string) => void;
  children: React.ReactNode;
}) {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { mutateAsync: getUploadUrl } = useGetUploadUrl();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    console.log(file);
    if (file && file.size > MAX_FILE_SIZE) {
      toast.error("File size exceeds the limit of 2MB");
      return;
    }
    if (file) setImageFile(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];

    console.log(file);
    if (file && file.type.startsWith("image/")) {
      if (file.size > MAX_FILE_SIZE) {
        toast.error("File size exceeds the limit of 2MB");
        return;
      }
      setImageFile(file);
    }
  };

  const handleClearImage = () => {
    setImageFile(null);
  };

  const handleUploadImage = async () => {
    try {
      if (!imageFile) return;
      const { type, size } = imageFile;

      const { uploadUrl, fileUrl } = await getUploadUrl({
        type,
        size,
      });

      if (!uploadUrl) {
        toast.error("Failed to get upload url");
        return;
      }
      console.log(uploadUrl);
      console.log(fileUrl);

      await fetch(uploadUrl, {
        method: "PUT",
        body: imageFile,
        headers: {
          "Content-Type": type,
        },
      });

      changeAvatar(fileUrl);
      toast.success("Avatar uploaded successfully", {
        description: "You must save the changes to update your avatar.",
      });
    } catch (error) {
      console.log(error);
      toast.error("Failed to upload image");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Change Avatar</DialogTitle>
          <DialogDescription>
            Update your profile picture visible to other users.
          </DialogDescription>
        </DialogHeader>

        {!imageFile ? (
          <div
            className={`border-2 border-dashed rounded-lg p-6 text-center transition
              ${dragging ? "border-primary bg-muted" : "border-muted"}
            `}
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
                accept="image/*"
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
        ) : (
          <div className="flex flex-col items-center gap-3">
            <img
              src={URL.createObjectURL(imageFile)}
              alt="new avatar"
              className="w-24 h-24 rounded-full border-2 border-primary object-cover"
            />

            <div className="flex w-full justify-between">
              <Button variant="destructive" onClick={handleClearImage}>
                Clear
              </Button>

              <Button onClick={handleUploadImage}>Upload</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
