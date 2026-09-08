import { UserMatch } from "@workspace/types";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { cn } from "@workspace/ui/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function UserCard({
  user,
  className,
}: {
  user: UserMatch;
  className?: string;
}) {
  return (
    <Link href={`/profile/${user.id}`} className="w-full">
      <div
        className={cn(
          "flex items-center gap-2.5 p-2 bg-muted/30 hover:bg-accent/60 border border-border/40 hover:border-border/80 rounded-xl transition-all duration-200 cursor-pointer w-full group shadow-xs",
          className,
        )}
      >
        <Avatar className="h-8 w-8 shrink-0 border border-border/50">
          <AvatarImage src={user.content.avatar} alt={user.content.name} />
          <AvatarFallback className="text-xs font-semibold bg-primary/10 text-primary">
            {user.content.name?.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <span className="text-xs font-medium line-clamp-1 truncate text-foreground group-hover:text-primary transition-colors">
          {user.content.name}
        </span>
      </div>
    </Link>
  );
}

export function UserCardSkeleton() {
  return (
    <div className="flex items-center gap-2.5 p-2 bg-muted/20 border border-border/30 rounded-xl w-full">
      <Skeleton className="w-8 h-8 rounded-full shrink-0" />
      <Skeleton className="h-3.5 flex-1 rounded-md" />
    </div>
  );
}

export function UserCardMore({ query }: { query: string }) {
  return (
    <Link
      href={`/search?q=${query}&type=users`}
      className="flex items-center justify-center gap-1.5 p-2 cursor-pointer border border-dashed border-border/70 hover:border-primary/50 bg-muted/20 hover:bg-muted/50 rounded-xl w-full transition-all duration-200 group text-center"
    >
      <span className="text-xs font-semibold text-muted-foreground group-hover:text-primary transition-colors">
        View all
      </span>
      <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
    </Link>
  );
}
