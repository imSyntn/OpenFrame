import { Button } from "@workspace/ui/components/button";
import { BadgeCheck, Mail, MapPin } from "lucide-react";
import { useGlobalStateStore } from "@/store";
import { useUserDetails } from "@/hooks";
import { Skeleton } from "@workspace/ui/components/skeleton";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@workspace/ui/components/tooltip";
import Link from "next/link";

export function OwnerInfo({ id }: { id: string }) {
  const { data, isLoading, isError } = useUserDetails(id);
  const setOpen = useGlobalStateStore((state) => state.setOpen);

  if (isError || (!data && !isLoading)) return null;

  return (
    <div className="flex items-center gap-3 min-w-[192px]">
      {isLoading ? (
        <>
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="flex items-center gap-3">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        </>
      ) : (
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex items-center gap-3">
              <Avatar className="w-10 h-10">
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
                <p className="text-sm text-muted-foreground flex items-center gap-1">
                  <Mail className="h-3 w-3" /> {data?.email}
                </p>
              </div>
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
