import { useUserDetails } from "@/hooks";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import { Skeleton } from "@workspace/ui/components/skeleton";
import Link from "next/link";
import React from "react";

export function UploaderDetails({ userId }: { userId: string }) {
  const { data: user, isLoading, error } = useUserDetails(userId);

  if (isLoading) {
    return (
      <div className="rounded-2xl border border-border/50 bg-secondary/20 p-4">
        <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Uploaded By
        </p>
        <div className="flex items-center gap-3 justify-between">
          <div className="flex items-center gap-3">
            <Skeleton className="h-12 w-12 rounded-full" />
            <Skeleton className="h-5 w-36 rounded-full" />
          </div>
          <Skeleton className="h-5 w-24 rounded-full" />
        </div>
      </div>
    );
  }

  if (error || !user) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-border/50 bg-secondary/20 p-4">
      <p className="mb-3 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        Uploaded By
      </p>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar size="lg">
            <AvatarImage src={user.avatar} />
            <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>

          <p className="truncate text-sm font-medium text-foreground">
            {user.name}
          </p>
        </div>
        <Link
          href={`/profile/${user.id}`}
          className="text-sm font-medium text-primary hover:underline"
          target="_blank"
        >
          View profile
        </Link>
      </div>
    </div>
  );
}
