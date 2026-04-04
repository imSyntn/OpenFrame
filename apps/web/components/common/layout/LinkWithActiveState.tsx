"use client";

import { cn } from "@workspace/ui/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function LinkWithActiveState({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={cn(
        "text-sm font-medium transition-all duration-200",
        isActive
          ? "text-foreground font-semibold"
          : "text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </Link>
  );
}
