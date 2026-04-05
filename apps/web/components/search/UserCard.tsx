import { UserMatch } from "@workspace/types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";

export function UserCard({
  user,
  className,
}: {
  user: UserMatch;
  className?: string;
}) {
  return (
    <Link href={`/profile/${user.id}`} className="w-fit">
      <div
        className={cn(
          "flex items-center gap-3 px-3 py-2 bg-muted rounded-xl hover:bg-muted/70 transition cursor-pointer w-32",
          className,
        )}
      >
        <Avatar>
          <AvatarImage src={user.avatar} />
          <AvatarFallback>{user.name.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <span className="text-sm font-medium line-clamp-1">{user.name}</span>
      </div>
    </Link>
  );
}

export function UserCardSkeleton() {
  return (
    <div className="flex items-center gap-2 px-3 py-2 cursor-pointer bg-muted rounded-xl w-32">
      <Skeleton className="w-8 h-8 rounded-full bg-muted-foreground" />
      <Skeleton className="flex-1 h-4 bg-muted-foreground" />
    </div>
  );
}

export function UserCardMore({ query }: { query: string }) {
  return (
    <div className="flex items-center justify-center gap-3 px-3 py-2 cursor-pointer border-muted border rounded-xl w-32">
      <Link href={`/search?q=${query}&type=users`} className="text-background ">
        more
      </Link>
    </div>
  );
}
