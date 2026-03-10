import Link from "next/link";
import React from "react";
import { HeaderRight } from "./HeaderRight";
import { Input } from "@workspace/ui/components/input";
import { Search } from "lucide-react";
import { Logo } from "./Logo";

export function Header() {
  return (
    <header className="h-14 flex items-center justify-between border-b px-5">
      <div className="flex items-center gap-6">
        <Logo />

        <Link
          href="/explore"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Explore
        </Link>

        <Link
          href="/collections"
          className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
        >
          Collections
        </Link>
      </div>
      <div className="flex gap-2">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search photos, users..."
            className="pl-9 rounded-xl bg-muted/40 focus-visible:ring-2 focus-visible:ring-primary"
          />
        </div>
        <HeaderRight />
      </div>
    </header>
  );
}
