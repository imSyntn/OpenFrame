"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { useSearch } from "@/hooks";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";

import { TagCard, TagCardSkeleton } from "./TagCard";
import { UserCard, UserCardSkeleton } from "./UserCard";
import { PictureCardSkeleton } from "./PictureCard";
import { ErrorOccured } from "../common";
import { PicturesContainer } from "./PicturesContainer";

function Container({ children }: { children: React.ReactNode }) {
  return <div className="min-h-[50vh] w-full px-10 mb-10">{children}</div>;
}

export function Content({ query, type }: { query: string; type?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const {
    data: result,
    isLoading,
    error,
    isError,
    refetch,
  } = useSearch(query, type);

  const { pictures = [], users = [], tags = [] } = result?.data || {};

  const computedDefaultTab = useMemo(() => {
    if (pictures.length > 0) return "pictures";
    if (users.length > 0) return "users";
    return "tags";
  }, [pictures.length, users.length]);

  const [activeTab, setActiveTab] = useState(type || computedDefaultTab);

  useEffect(() => {
    setActiveTab(type || computedDefaultTab);
  }, [type, computedDefaultTab]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);

    const params = new URLSearchParams(searchParams.toString());
    params.set("type", value);

    router.push(`?${params.toString()}`);
  };

  if (query.length < 3) {
    return (
      <Container>
        <p className="text-center text-muted-foreground mt-8">
          Enter more than 3 chars
        </p>
      </Container>
    );
  }

  if (isLoading) {
    return (
      <Container>
        <Tabs value="pictures" className="w-full mt-4">
          <TabsList className="mb-6 grid w-full max-w-md mx-auto grid-cols-3">
            <TabsTrigger
              value="pictures"
              className="data-[state=active]:text-primary!"
            >
              Pictures
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="data-[state=active]:text-primary!"
            >
              Users
            </TabsTrigger>
            <TabsTrigger
              value="tags"
              className="data-[state=active]:text-primary!"
            >
              Tags
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pictures">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(256px,1fr))] gap-4">
              {Array.from({ length: 20 }).map((_, i) => (
                <PictureCardSkeleton key={i} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="users">
            <div className="flex flex-wrap gap-4 justify-center">
              {Array.from({ length: 13 }).map((_, i) => (
                <UserCardSkeleton key={i} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="tags">
            <div className="flex flex-wrap gap-2 justify-center">
              {Array.from({ length: 20 }).map((_, i) => (
                <TagCardSkeleton key={i} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </Container>
    );
  }

  if (isError) {
    return (
      <Container>
        <ErrorOccured
          title={(error as any)?.response?.data?.message}
          className="min-h-[calc(100vh-200px)]"
          onClick={() => refetch()}
        />
      </Container>
    );
  }

  if (pictures.length === 0 && users.length === 0 && tags.length === 0) {
    return (
      <Container>
        <p className="text-center text-muted-foreground mt-8">
          No results found
        </p>
      </Container>
    );
  }

  return (
    <Container>
      <Tabs
        value={activeTab}
        onValueChange={handleTabChange}
        className="w-full mt-4"
      >
        <TabsList className="mb-6 flex w-full max-w-md mx-auto">
          <TabsTrigger
            value="pictures"
            className="flex-1 cursor-pointer data-[state=active]:text-primary!"
          >
            Pictures {pictures.length > 0 && `(${pictures.length})`}
          </TabsTrigger>
          <TabsTrigger
            value="users"
            className="flex-1 cursor-pointer data-[state=active]:text-primary!"
          >
            Users {users.length > 0 && `(${users.length})`}
          </TabsTrigger>
          <TabsTrigger
            value="tags"
            className="flex-1 cursor-pointer data-[state=active]:text-primary!"
          >
            Tags {tags.length > 0 && `(${tags.length})`}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pictures" className="mt-4 animate-in fade-in-50">
          <PicturesContainer pictures={pictures} />
        </TabsContent>

        <TabsContent value="users" className="mt-4 animate-in fade-in-50">
          <div className="flex flex-wrap gap-4 justify-center">
            {users.map((user) => (
              <UserCard key={user.id} user={user} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tags" className="mt-4 animate-in fade-in-50">
          <div className="flex flex-wrap gap-2 justify-center">
            {tags.map((tag) => (
              <TagCard key={tag.id} tag={tag} className="min-w-24 h-8" />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Container>
  );
}
