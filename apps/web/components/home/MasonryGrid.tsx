import React, { useEffect } from "react";
import { MasonryPhotoAlbum, Photo } from "react-photo-album";
import { PhotoWithBlurHash } from "../common/image/BlurhashCanvas";
import { Masonry } from "../common";
import { GalleryPhoto } from "@/@types";
import { useGlobalStateStore } from "@/store";
import { useGetExplorePictures } from "@/hooks";
import { useState } from "react";
import { PictureType } from "@/@types";
import { toast } from "sonner";
import { Button } from "@workspace/ui/components/button";
import { Loader2 } from "lucide-react";
import { tagsType } from "@workspace/types";

export function MasonryGrid({
  tags,
  selectedTag,
}: {
  tags: tagsType[];
  selectedTag: number;
}) {
  const setOpen = useGlobalStateStore((state) => state.setOpen);
  const [data, setData] = useState<{
    pictures: PictureType[];
    nextCursor?: string;
  }>({
    pictures: [],
    nextCursor: "",
  });
  const [loading, setLoading] = useState<boolean>(true);
  const {
    mutateAsync: getExplorePictures,
    isPending,
    isError,
    error,
  } = useGetExplorePictures();

  const fetchPictures = async () => {
    try {
      setLoading(true);
      const newData = await getExplorePictures(data.nextCursor || "");
      setData((prev) => ({
        ...prev,
        pictures: [...prev.pictures, ...newData.pictures],
        nextCursor: newData.nextCursor,
      }));
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch pictures");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPictures();
  }, []);

  if (!loading && data.pictures.length == 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>No pictures found</p>
      </div>
    );
  }

  const photos: GalleryPhoto[] = data.pictures.map((pic) => {
    const original = pic.src.find((src) => src.resolution === "ORIGINAL");
    const thumbnail = pic.src.find((src) => src.resolution === "THUMBNAIL");
    return {
      src: thumbnail?.url! || original?.url!,
      width: original?.width!,
      height: original?.height!,
      blurhash: pic.metadata.blurhash,
      user: pic.user,
      key: pic.id,
      onClick: () => {
        setOpen(true, pic);
      },
    };
  });

  return (
    <div className="w-full">
      <Masonry photos={photos} />
      {loading && (
        <div className="flex w-full justify-center my-3">
          <Loader2 className="animate-spin" />
        </div>
      )}
      <div className="flex w-full justify-center my-3">
        <Button className="mx-auto" onClick={fetchPictures} disabled={loading}>
          Load More
        </Button>
      </div>
    </div>
  );
}
