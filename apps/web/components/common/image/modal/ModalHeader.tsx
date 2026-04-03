import { Button } from "@workspace/ui/components/button";
import {
  BadgeCheck,
  Bookmark,
  ChevronDown,
  Download,
  Mail,
  MapPin,
  Plus,
  Share2,
  ThumbsUp,
} from "lucide-react";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@workspace/ui/components/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { useGlobalStateStore, useUserStore } from "@/store";
import {
  useIncrementDownloadCount,
  useIncrementLikeCount,
  useUserDetails,
} from "@/hooks";
import { Skeleton } from "@workspace/ui/components/skeleton";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { toast } from "sonner";
import { useImageDownloader } from "use_image_downloader";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import Link from "next/link";
import { cn } from "@workspace/ui/lib/utils";
import { TooltipButton } from "../../layout";

function DownloadButton() {
  const image = useGlobalStateStore((state) => state.image);
  const downloadImage = useImageDownloader();
  const { mutateAsync: incrementDownloadCount } = useIncrementDownloadCount();

  const src = image?.src;

  if (!src || !image) return null;
  const downloadOptions = src.filter((s) => s.resolution !== "ORIGINAL");
  const original = src.find((s) => s.resolution === "ORIGINAL");

  const handleDownload = async (
    url: string | undefined,
    variant: string = "ORIGINAL",
  ) => {
    if (!url) {
      toast.error("Failed to download.");
      return;
    }
    try {
      const name =
        image.title +
        "_" +
        variant.toLowerCase() +
        "." +
        url.split(".").reverse()[0];
      await downloadImage(url, name);
    } catch (error) {
      console.log(error);
      toast.error("Failed to download.");
    } finally {
      incrementDownloadCount(image.id).catch((e) => console.log(e));
    }
  };

  return (
    <div className="flex">
      <Button
        className="rounded-r-none"
        onClick={() => handleDownload(original?.url)}
      >
        Download
      </Button>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="rounded-l-none" size="icon">
            <ChevronDown />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-fit">
          <DropdownMenuGroup>
            {downloadOptions.map((option) => (
              <DropdownMenuItem
                key={option.resolution}
                onClick={() => handleDownload(option.url, option.resolution)}
              >
                <p className="font-bold">{option.resolution}</p>
                <p className="text-sm text-muted-foreground">
                  {option.width}x{option.height}
                </p>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={() => handleDownload(original?.url)}>
              <p className="font-bold">{original?.resolution}</p>
              <p className="text-sm text-muted-foreground">
                {original?.width}x{original?.height}
              </p>
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

function OwnerInfo({ id }: { id: string }) {
  const { data, isLoading, isError } = useUserDetails(id);
  const setOpen = useGlobalStateStore((state) => state.setOpen);

  if (isError || (!data && !isLoading)) return null;

  return (
    <div className="flex items-center gap-3 min-w-[192px]">
      {isLoading ? (
        <Skeleton className="h-10 w-10 rounded-full" />
      ) : (
        <Avatar className="w-10 h-10">
          <AvatarImage src={data?.avatar} alt={data?.name} />
          <AvatarFallback>{data?.name.charAt(0)}</AvatarFallback>
        </Avatar>
      )}

      {isLoading ? (
        <div className="flex items-center gap-3">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <div>
              <p className="font-semibold flex items-center gap-1">
                {data?.name}
                {data?.is_verified && (
                  <BadgeCheck className="h-4 w-4 text-emerald-500" />
                )}
              </p>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Mail className="h-3 w-3" /> {data?.email}
              </p>
            </div>
          </TooltipTrigger>
          <TooltipContent side="bottom" className="w-72 p-4">
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-3">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={data?.avatar} alt={data?.name} />
                  <AvatarFallback>{data?.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <div>
                  <p className="font-semibold flex items-center gap-1">
                    {data?.name}
                    {data?.is_verified && (
                      <BadgeCheck className="h-4 w-4 text-emerald-500" />
                    )}
                  </p>

                  {data?.location && (
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {data?.location}
                    </p>
                  )}
                </div>
              </div>

              {data?.bio && (
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {data?.bio}
                </p>
              )}

              <div className="flex justify-between text-sm">
                <div className="text-center">
                  <p className="font-semibold">{data?._count?.pictures ?? 0}</p>
                  <p className="text-muted-foreground text-xs">Photos</p>
                </div>

                <div className="text-center">
                  <p className="font-semibold">
                    {data?.metrics?.total_likes ?? 0}
                  </p>
                  <p className="text-muted-foreground text-xs">Likes</p>
                </div>

                <div className="text-center">
                  <p className="font-semibold">
                    {data?.metrics?.total_downloads ?? 0}
                  </p>
                  <p className="text-muted-foreground text-xs">Downloads</p>
                </div>
              </div>
              <Button
                asChild
                onClick={() => setOpen(false)}
                variant="secondary"
              >
                <Link href={`/profile/${data?.id}`}>View Profile</Link>
              </Button>
            </div>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}

export function ModalHeader() {
  const image = useGlobalStateStore((state) => state.image);
  const open = useGlobalStateStore((state) => state.open);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const { mutateAsync: incrementLikeCount } = useIncrementLikeCount();
  if (!image) {
    return null;
  }

  const handleLike = async () => {
    try {
      await incrementLikeCount(image.id);
      toast.success("Liked successfully.");
    } catch (error) {
      toast.error("Failed to like.");
    }
  };

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(
        `${window.location.origin}/picture/${image.id}`,
      );
      toast.success("Link copied to clipboard.");
    } catch (error) {
      toast.error("Failed to copy link.");
    }
  };

  const isModal = open == true && !!image?.id;

  const Header = isModal ? DialogHeader : "div";
  return (
    <Header
      className={cn(
        "h-fit! flex flex-row justify-between px-6 pt-6",
        !isModal && "mb-4",
      )}
    >
      {isModal && (
        <>
          <DialogTitle className="sr-only">{image.title}</DialogTitle>
          <DialogDescription className="sr-only">
            {image.description}
          </DialogDescription>
        </>
      )}
      <OwnerInfo id={image.user_id} />
      <div className="flex items-center gap-2">
        {isLoggedIn && (
          <TooltipButton
            value={<ThumbsUp />}
            size="icon"
            content="Like"
            onClick={handleLike}
          />
        )}
        <TooltipButton
          value={<Share2 />}
          size="icon"
          content="Share"
          onClick={handleShare}
        />
        {isLoggedIn && (
          <TooltipButton
            value={<Plus />}
            size="icon"
            content="Add to collection"
          />
        )}
        <DownloadButton />
      </div>
    </Header>
  );
}
