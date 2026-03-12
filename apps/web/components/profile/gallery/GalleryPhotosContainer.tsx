import { GalleryPhoto, PictureType } from "@/@types";
import { useProfileStore } from "@/store";
import React, { useState } from "react";
import { Button } from "@workspace/ui/components/button";
import { Masonry } from "@/components/common";
import { useGetPictures } from "@/hooks";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export function GalleryPhotosContainer() {
  const pictures = useProfileStore((state) => state.pictures) as PictureType[];
  const id = useProfileStore((state) => state.id);
  const pictureCount = useProfileStore((state) => state._count?.pictures);
  const [page, setPage] = useState(1);
  const { mutateAsync, isPending } = useGetPictures();

  const photos: GalleryPhoto[] = pictures.map((pic) => ({
    src: pic.src[0]?.url!,
    width: pic.src[0]?.width!,
    height: pic.src[0]?.height!,
    blurhash: pic.metadata.blurhash,
    user: pic.user,
    key: pic.id,
  }));

  const handleNextPage = async () => {
    try {
      await mutateAsync({
        id,
        page: page + 1,
      });
      setPage((prev) => prev + 1);
    } catch (error) {
      console.log(error);
      toast.error("Error occured.");
    }
  };

  return (
    <>
      <Masonry photos={photos} showUser={false} />
      <div className="flex-1 flex justify-center mt-5">
        {isPending ? (
          <Loader2 className="animate-spin" />
        ) : (
          <Button
            disabled={pictureCount === photos.length || isPending}
            onClick={handleNextPage}
          >
            Load more
          </Button>
        )}
      </div>
    </>
  );
}
