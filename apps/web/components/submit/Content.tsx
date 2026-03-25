import React, { useEffect, useRef, useState } from "react";
import { ImageInput } from "../common";
import { Input } from "@workspace/ui/components/input";
import { Button } from "@workspace/ui/components/button";
import { XIcon } from "lucide-react";
import { Progress } from "@workspace/ui/components/progress";
import { cn } from "@workspace/ui/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import { Form } from "./Form";
import { MAX_PICTURE_SIZE } from "@workspace/constants";
import { useGetUploadUrl } from "@/hooks";
import { toast } from "sonner";
import axios from "axios";

export function Content() {
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [uploadedUrl, setUploadedUrl] = useState("");
  const [pictureId, setPictureId] = useState("");
  const { mutateAsync: getUploadUrl } = useGetUploadUrl();
  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    const uploadImage = async () => {
      if (!file) return;
      setIsUploading(true);
      controllerRef.current = new AbortController();
      try {
        const { type, size } = file;

        const { uploadUrl, fileUrl, id } = await getUploadUrl({
          type,
          size,
        });

        if (!uploadUrl) {
          toast.error("Failed to get upload url");
          return;
        }

        await axios.put(uploadUrl, file, {
          headers: {
            "Content-Type": type,
          },
          signal: controllerRef.current.signal,
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1),
            );
            setProgress(percentCompleted);
          },
        });
        setUploadedUrl(fileUrl);
        setPictureId(id);
      } catch (error: any) {
        console.log(error);
        toast.error(error?.response?.data?.message || "Failed to upload image");
      } finally {
        setIsUploading(false);
      }
    };
    uploadImage();
  }, [file]);

  const cancelUpload = () => {
    setFile(null);
    setProgress(0);
    setIsUploading(false);
    controllerRef.current?.abort();
  };

  return (
    <main className="min-h-screen flex flex-col items-center px-6 py-10 gap-8">
      <div className="w-full max-w-4xl border rounded-xl overflow-hidden bg-muted/10">
        {file ? (
          <div className="relative flex flex-col items-center p-4 group">
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              className={cn(
                "max-h-[70vh] w-auto rounded-md object-contain transition",
                isUploading && "opacity-40 blur-sm",
              )}
            />

            {isUploading && <Progress value={progress} className="w-full" />}

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  onClick={cancelUpload}
                  size="icon"
                  className="absolute top-6 right-6 rounded-full bg-foreground/80 text-background backdrop-blur-lg transition group-hover:opacity-100 opacity-0"
                >
                  <XIcon className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{isUploading ? "Cancel Upload" : "Remove Image"}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
            <ImageInput
              MAX_SIZE={MAX_PICTURE_SIZE}
              setImageFile={setFile}
              className="w-full max-w-sm"
            />

            <p className="text-xs text-muted-foreground mt-4">
              Max file size: 10MB
            </p>
          </div>
        )}
      </div>

      <Form uploadedUrl={uploadedUrl} pictureId={pictureId} />
    </main>
  );
}
