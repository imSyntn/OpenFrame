import { TagMatch } from "@workspace/types";
import { Badge } from "@workspace/ui/components/badge";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";

export function TagCard({
  tag,
  className,
}: {
  tag: TagMatch;
  className?: string;
}) {
  return (
    <Link
      href={`/explore?tag=${tag.id}`}
      //   className="px-3 py-1 text-sm bg-muted rounded-full hover:bg-muted/70 cursor-pointer"
    >
      <Badge variant="secondary" className={cn("h-full", className)}>
        #{tag.name}
      </Badge>
    </Link>
  );
}

export function TagCardSkeleton() {
  return <Skeleton className="rounded-full w-24 h-8" />;
}
export function TagCardMore({ query }: { query: string }) {
  return (
    <Link
      href={`/search?q=${query}&type=tags`}
      className="px-3 py-1 text-sm rounded-full border border-muted cursor-pointer text-background"
    >
      more
    </Link>
  );
}
