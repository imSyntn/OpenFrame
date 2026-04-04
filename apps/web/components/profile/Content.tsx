"use client";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import React from "react";
import { Gallery } from "./gallery/Gallery";
import { Statistics } from "./statistics/Statistics";
import { useProfileStore } from "@/store";
import { Skeleton } from "@workspace/ui/components/skeleton";
import { cn } from "@workspace/ui/lib/utils";
import { useUserStore } from "@/store";
import { Processing } from "./processing/Processing";
import { ShowUserCollections } from "../collection";

export function Content() {
  const isLoading = useProfileStore((state) => state.isLoading);
  const loggedInUserID = useUserStore((state) => state.id);
  const id = useProfileStore((state) => state.id);

  const isOwner = loggedInUserID === id;

  return (
    <div className="max-w-8xl px-8 h-fit mb-8">
      <Tabs
        defaultValue="Gallery"
        orientation="horizontal"
        className="gap-4 md:gap-8"
      >
        <TabsList variant="line" className="flex flex-wrap gap-10">
          <TabsTrigger
            value="Gallery"
            className={cn(
              "pl-3 data-[state=active]:text-primary! data-[state=active]:border-b-primary rounded-none px-0 cursor-pointer",
              isLoading && "border-none",
            )}
            disabled={isLoading}
          >
            {isLoading ? <Skeleton className="w-16 h-4" /> : "Gallery"}
          </TabsTrigger>
          <TabsTrigger
            value="Statistics"
            className="pl-3 data-[state=active]:text-primary! data-[state=active]:border-b-primary rounded-none px-0 cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? <Skeleton className="w-16 h-4" /> : "Statistics"}
          </TabsTrigger>
          <TabsTrigger
            value="Collections"
            className="pl-3 data-[state=active]:border-b-primary rounded-none px-0 data-[state=active]:text-primary! cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? <Skeleton className="w-16 h-4" /> : "Collections"}
          </TabsTrigger>
          {isOwner && (
            <TabsTrigger
              value="processing"
              className="pl-3 data-[state=active]:border-b-primary rounded-none px-0 data-[state=active]:text-primary! cursor-pointer max-w-fit"
              disabled={isLoading}
            >
              Processing
            </TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="Gallery" className="flex-1">
          <Gallery />
        </TabsContent>

        <TabsContent value="Statistics" className="flex-1">
          <Statistics />
        </TabsContent>

        <TabsContent value="Collections" className="flex-1">
          <ShowUserCollections id={id} />
        </TabsContent>
        {isOwner && (
          <TabsContent value="processing" className="flex-1">
            <Processing />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}
