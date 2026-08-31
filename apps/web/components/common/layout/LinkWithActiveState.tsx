"use client";

import { Badge } from "@workspace/ui/components/badge";
import { cn } from "@workspace/ui/lib/utils";
import { Dot } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface LinkWithActiveStateProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  badge?: string;
}

export function LinkWithActiveState({
  href,
  children,
  className,
  onClick,
  badge,
}: LinkWithActiveStateProps) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative text-sm font-medium transition-all duration-200",
        isActive
          ? "text-foreground font-semibold"
          : "text-muted-foreground hover:text-foreground",
        className,
      )}
    >
      {children}
      {!!badge && (
        <Badge
          variant="ghost"
          className="absolute -right-3 -top-2 animate-pulse p-0 m-0 pointer-events-none"
        >
          <Dot strokeWidth={8} className="text-success" />
        </Badge>
      )}
    </Link>
  );
}
