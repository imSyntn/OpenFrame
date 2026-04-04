import { useIncrementDownloadCount } from "@/hooks";
import { useGlobalStateStore } from "@/store";
import { Button } from "@workspace/ui/components/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@workspace/ui/components/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { toast } from "sonner";
import { useImageDownloader } from "use_image_downloader";

export function DownloadButton() {
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
      incrementDownloadCount({ id: image.id, ownerId: image.user_id }).catch(
        (e) => console.log(e),
      );
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
