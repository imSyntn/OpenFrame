"use client";

import { useEffect, useState } from "react";
import { cn } from "@workspace/ui/lib/utils";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export function OnThisPage() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll("article h2, article h3"),
    );

    const items = elements.map((el) => ({
      id: el.id,
      text: el.textContent ?? "",
      level: Number(el.tagName.charAt(1)),
    }));

    const animId = requestAnimationFrame(() => {
      setHeadings(items);
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      {
        rootMargin: "-55.2px 0% -70% 0%",
      },
    );

    elements.forEach((el) => observer.observe(el));
    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
    setActiveId(id);
  };

  if (headings.length === 0) return null;

  return (
    <nav className="w-full text-xs">
      <p className="mb-3 font-semibold text-muted-foreground tracking-wide uppercase text-[11px]">
        On This Page
      </p>

      <div className="relative border-l border-border/40 pl-3 space-y-2">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          return (
            <a
              key={heading.id}
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={cn(
                "group relative block leading-relaxed transition-colors duration-150",
                heading.level === 3 ? "pl-3 text-[11px]" : "font-normal",
                isActive
                  ? "text-foreground font-medium"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {isActive && (
                <span className="absolute -left-[13px] top-1/2 -translate-y-1/2 h-3.5 w-[2px] bg-foreground rounded-full transition-all duration-200" />
              )}
              <span className="line-clamp-2">{heading.text}</span>
            </a>
          );
        })}
      </div>
    </nav>
  );
}
