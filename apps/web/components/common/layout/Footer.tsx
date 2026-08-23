import { Badge } from "@workspace/ui/components/badge";
import { Github, Heart } from "lucide-react";
import React from "react";
import { LinkWithActiveState } from "./LinkWithActiveState";

const navigationLinks = [
  { label: "Home", href: "/" },
  { label: "Explore Photos", href: "/explore" },
  { label: "Search Photos", href: "/search" },
  { label: "Collections", href: "/collections" },
  { label: "About", href: "/about" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms of Service", href: "/terms-of-service" },
  { label: "Cookie Policy", href: "/cookie-policy" },
  { label: "Copyright Policy", href: "/copyright-policy" },
  { label: "License Details", href: "/license-details" },
];

const resourceLinks = [
  { label: "API Docs", href: "/api" },
  { label: "FAQ", href: "/faq" },
  { label: "Roadmap", href: "/roadmap" },
  {
    label: "Sponsor Project",
    href: "https://github.com/sponsors/imSyntn",
    isExternal: true,
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t bg-background/50 backdrop-blur-xl mx-auto max-w-8xl px-6 pt-10 pb-4">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div className="absolute top-0 left-1/2 -z-10 h-32 w-full max-w-3xl -translate-x-1/2 bg-primary/10 blur-[120px]" />

      <div className="grid grid-cols-2 gap-8 md:grid-cols-5">
        <div className="col-span-2 md:col-span-2">
          <p className="text-lg font-semibold">OpenFrame</p>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm">
            Free high-resolution photos for creators.
          </p>

          <div className="mt-4 flex items-center gap-2">
            <a
              href="https://github.com/imSyntn/OpenFrame"
              target="_blank"
              rel="noreferrer"
              aria-label="OpenFrame GitHub Repository"
              className="group inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/50 bg-secondary/80 text-secondary-foreground shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-primary hover:text-primary-foreground hover:shadow-xl hover:shadow-primary/25"
            >
              <Github
                size={20}
                className="transition-transform duration-300 group-hover:scale-110"
              />
            </a>

            <a
              href="https://github.com/sponsors/imSyntn"
              target="_blank"
              rel="noreferrer"
              aria-label="Sponsor OpenFrame on GitHub"
              className="group inline-flex h-10 px-3.5 items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 text-rose-500 text-xs font-semibold shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-rose-500 hover:text-white hover:shadow-xl hover:shadow-rose-500/25"
            >
              <Heart
                size={16}
                className="fill-current transition-transform duration-300 group-hover:scale-110"
              />
              <span>Sponsor</span>
            </a>
          </div>
        </div>

        <div className="col-span-1">
          <h3 className="mb-3 text-sm font-semibold">Navigation</h3>
          <ul className="space-y-2">
            {navigationLinks.map((link) => (
              <li key={link.label}>
                <LinkWithActiveState href={link.href}>
                  {link.label}
                </LinkWithActiveState>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-1">
          <h3 className="mb-3 text-sm font-semibold">Legal</h3>
          <ul className="space-y-2">
            {legalLinks.map((link) => (
              <li key={link.label}>
                <LinkWithActiveState href={link.href}>
                  {link.label}
                </LinkWithActiveState>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-2 md:col-span-1">
          <h3 className="mb-3 text-sm font-semibold">Resources</h3>
          <ul className="space-y-2">
            {resourceLinks.map((link) => (
              <li key={link.label}>
                {link.isExternal ? (
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-medium text-muted-foreground transition-all duration-200 hover:text-rose-500 inline-flex items-center gap-1.5"
                  >
                    {link.label}
                    <Heart className="h-3 w-3 fill-rose-500 text-rose-500" />
                  </a>
                ) : (
                  <LinkWithActiveState href={link.href}>
                    {link.label}
                  </LinkWithActiveState>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 flex flex-col items-center justify-between gap-6 border-t border-border/40 pt-6 md:flex-row">
        <p className="text-sm font-medium text-muted-foreground">
          &copy; {new Date().getFullYear()} OpenFrame. All rights reserved.
        </p>

        <Badge
          variant="secondary"
          className="group flex items-center gap-1.5 px-4 py-4 text-sm"
          asChild
        >
          <a href="https://sayantan.online" target="_blank" rel="noreferrer">
            <span className="text-muted-foreground">built with</span>
            <Heart
              size={14}
              className="text-rose-500 transition-transform duration-300 group-hover:scale-110 group-hover:fill-rose-500"
            />
            <span className="text-muted-foreground">by</span>
            <span className="font-semibold text-foreground transition-colors duration-200 hover:text-primary">
              @imsyntn
            </span>
          </a>
        </Badge>
      </div>
    </footer>
  );
}
