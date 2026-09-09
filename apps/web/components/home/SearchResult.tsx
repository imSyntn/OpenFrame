"use client";

import React from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Image as ImageIcon,
  Users as UsersIcon,
  Hash as HashIcon,
  Search,
  SearchX,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import {
  PictureCard,
  PictureCardMore,
  PictureCardSkeleton,
  TagCard,
  TagCardMore,
  TagCardSkeleton,
  UserCard,
  UserCardMore,
  UserCardSkeleton,
} from "../search";
import { useSearch } from "@/hooks";

interface ResultSectionProps {
  title: string;
  icon: React.ReactNode;
  count?: number;
  children: React.ReactNode;
  layout?: "grid-4" | "flex-wrap";
}

function ResultSection({
  title,
  icon,
  count,
  children,
  layout = "grid-4",
}: ResultSectionProps) {
  return (
    <div className="space-y-3 py-1 first:pt-0 last:pb-0">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="p-1 rounded-md bg-primary/10 text-primary">
            {icon}
          </span>
          <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {title}
          </h3>
          {count !== undefined && (
            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-muted text-muted-foreground">
              {count}
            </span>
          )}
        </div>
      </div>

      {layout === "grid-4" ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {children}
        </div>
      ) : (
        <div className="flex flex-wrap items-center gap-2">{children}</div>
      )}
    </div>
  );
}

function Container({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      className="absolute top-full left-0 right-0 z-50 mx-auto mt-3 w-full max-w-xl rounded-2xl bg-popover/95 dark:bg-popover/90 backdrop-blur-xl border border-border/60 p-4 sm:p-5 shadow-2xl shadow-black/15 dark:shadow-black/50 max-h-[72vh] overflow-y-auto space-y-4"
    >
      {children}
    </motion.div>
  );
}

export function SearchResults({ query }: { query: string }) {
  const { data: result, isLoading, error, isError } = useSearch(query);

  if (query.length < 3) {
    return (
      <AnimatePresence>
        <Container>
          <div className="flex flex-col items-center justify-center py-6 text-center space-y-2">
            <div className="p-3 rounded-full bg-muted/50 text-muted-foreground/70 animate-pulse">
              <Search className="w-5 h-5" />
            </div>
            <p className="text-sm font-medium text-foreground">
              Type at least 3 characters
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-primary/70 inline" />
              Search pictures, creators, or tags
            </p>
          </div>
        </Container>
      </AnimatePresence>
    );
  }

  if (isLoading) {
    return (
      <AnimatePresence>
        <Container>
          <ResultSection
            title="Pictures"
            icon={<ImageIcon className="w-3.5 h-3.5" />}
          >
            <PictureCardSkeleton />
            <PictureCardSkeleton />
            <PictureCardSkeleton />
            <PictureCardSkeleton />
          </ResultSection>

          <ResultSection
            title="Users"
            icon={<UsersIcon className="w-3.5 h-3.5" />}
          >
            <UserCardSkeleton />
            <UserCardSkeleton />
            <UserCardSkeleton />
            <UserCardSkeleton />
          </ResultSection>

          <ResultSection
            title="Tags"
            icon={<HashIcon className="w-3.5 h-3.5" />}
            layout="flex-wrap"
          >
            <TagCardSkeleton />
            <TagCardSkeleton />
            <TagCardSkeleton />
            <TagCardSkeleton />
          </ResultSection>
        </Container>
      </AnimatePresence>
    );
  }

  if (isError) {
    return (
      <AnimatePresence>
        <Container>
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive">
            <AlertCircle className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              {(error as any)?.response?.data?.message || "Failed to fetch search results."}
            </p>
          </div>
        </Container>
      </AnimatePresence>
    );
  }

  const { pictures = [], users = [], tags = [] } = result?.data || {};
  const hasResults = pictures.length > 0 || users.length > 0 || tags.length > 0;

  if (!hasResults) {
    return (
      <AnimatePresence>
        <Container>
          <div className="flex flex-col items-center justify-center py-8 text-center space-y-2">
            <div className="p-3.5 rounded-full bg-muted/60 text-muted-foreground mb-1">
              <SearchX className="w-6 h-6" />
            </div>
            <p className="text-sm font-semibold text-foreground">
              No results found
            </p>
            <p className="text-xs text-muted-foreground max-w-xs">
              We couldn&apos;t find anything matching &quot;
              <span className="text-foreground font-medium">{query}</span>&quot;. Try checking for typos or searching with different keywords.
            </p>
          </div>
        </Container>
      </AnimatePresence>
    );
  }

  return (
    <AnimatePresence>
      <Container>
        {pictures.length > 0 && (
          <ResultSection
            title="Pictures"
            icon={<ImageIcon className="w-3.5 h-3.5" />}
            count={pictures.length}
          >
            {pictures.slice(0, 3).map((pic) => (
              <PictureCard key={pic.id} pic={pic} />
            ))}
            <PictureCardMore query={query} />
          </ResultSection>
        )}

        {users.length > 0 && (
          <ResultSection
            title="Users"
            icon={<UsersIcon className="w-3.5 h-3.5" />}
            count={users.length}
          >
            {users.slice(0, 3).map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
            <UserCardMore query={query} />
          </ResultSection>
        )}

        {tags.length > 0 && (
          <ResultSection
            title="Tags"
            icon={<HashIcon className="w-3.5 h-3.5" />}
            count={tags.length}
            layout="flex-wrap"
          >
            {tags.slice(0, 3).map((tag) => (
              <TagCard key={tag.id} tag={tag} />
            ))}
            <TagCardMore query={query} />
          </ResultSection>
        )}
      </Container>
    </AnimatePresence>
  );
}
