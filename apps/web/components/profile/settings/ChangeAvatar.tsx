import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { Button } from "@workspace/ui/components/button";
import { toast } from "sonner";
import { useGetUploadUrl } from "@/hooks";
import { MAX_AVATAR_SIZE } from "@workspace/constants";
import { ImageInput } from "@/components/common";

export function ChangeAvatar({
  changeAvatar,
  children,
}: {
  changeAvatar: (avatar: string) => void;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const { mutateAsync: getUploadUrl } = useGetUploadUrl();

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
        isAvatar: true,
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
      setOpen(false);
      toast.success("Avatar uploaded successfully", {
        description: "You must save the changes to update your avatar.",
      });
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to upload image");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Change Avatar</DialogTitle>
          <DialogDescription>
            Update your profile picture visible to other users.
          </DialogDescription>
        </DialogHeader>

        {!imageFile ? (
          <ImageInput MAX_SIZE={MAX_AVATAR_SIZE} setImageFile={setImageFile} />
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
