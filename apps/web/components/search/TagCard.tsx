import { TagMatch } from "@workspace/types";
import { Badge } from "@workspace/ui/components/badge";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { cn } from "@workspace/ui/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function TagCard({
  tag,
  className,
}: {
  tag: TagMatch;
  className?: string;
}) {
  return (
    <Link href={`/explore?tag=${tag.id}`}>
      <Badge
        variant="secondary"
        className={cn(
          "px-3 py-1.5 text-xs font-medium bg-muted/50 hover:bg-primary/10 hover:text-primary hover:border-primary/30 border border-border/50 transition-all duration-200 cursor-pointer rounded-lg inline-flex items-center gap-1",
          className,
        )}
      >
        <span className="text-primary/70">#</span>
        <span>{tag.content.name}</span>
      </Badge>
    </Link>
  );
}

export function TagCardSkeleton() {
  return <Skeleton className="rounded-lg w-20 h-7" />;
}

export function TagCardMore({ query }: { query: string }) {
  return (
    <Link
      href={`/search?q=${query}&type=tags`}
      className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-dashed border-border/70 hover:border-primary/50 bg-muted/20 hover:bg-muted/50 cursor-pointer text-muted-foreground hover:text-primary transition-all duration-200 inline-flex items-center gap-1.5 group"
    >
      <span>View all</span>
      <ArrowRight className="w-3 h-3 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
    </Link>
  );
}
