import React from "react";
import { Logo } from "../Logo";
import { cn } from "@workspace/ui/lib/utils";
import { HeaderRight } from "./HeaderRight";
import { LinkWithActiveState } from "./LinkWithActiveState";
import { MobileNav } from "./MobileNav";

const NAV_ITEMS = [
  { href: "/explore", label: "Explore" },
  { href: "/collections", label: "Collections" },
  { href: "/search", label: "Search" },
  { href: "/generate", label: "Generate", badge: "New" },
  { href: "/api", label: "API", badge: "New" },
  { href: "/about", label: "About" },
];

export function Header({ className }: { className?: string }) {
  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60",
        className,
      )}
    >
      <div className="max-w-8xl mx-auto flex h-14 items-center justify-between gap-3 px-4 md:px-6">
        <div className="flex items-center gap-3 md:gap-6">
          <MobileNav items={NAV_ITEMS} />

          <Logo />

          <nav
            aria-label="Main navigation"
            className="hidden items-center gap-6 md:flex"
          >
            {NAV_ITEMS.map((item) => (
              <LinkWithActiveState
                key={item.href}
                href={item.href}
                badge={item.badge}
              >
                {item.label}
              </LinkWithActiveState>
            ))}
          </nav>
        </div>

        <HeaderRight />
      </div>
    </header>
  );
}
