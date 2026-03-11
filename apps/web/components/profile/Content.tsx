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
import { People } from "./people/People";

export function Content() {
  const isLoading = useProfileStore((state) => state.isLoading);
  return (
    <div className="max-w-8xl px-8 h-fit mb-8">
      <Tabs
        defaultValue="Gallery"
        orientation="vertical"
        className="flex flex-col gap-8"
      >
        <TabsList variant="line" className="flex gap-10">
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
            value="People"
            className="pl-3 data-[state=active]:border-b-primary rounded-none px-0 data-[state=active]:text-primary! cursor-pointer"
            disabled={isLoading}
          >
            {isLoading ? <Skeleton className="w-16 h-4" /> : "People"}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="Gallery" className="flex-1">
          <Gallery />
        </TabsContent>

        <TabsContent value="Statistics" className="flex-1">
          <Statistics />
        </TabsContent>

        <TabsContent value="People" className="flex-1">
          <People />
        </TabsContent>
      </Tabs>
    </div>
  );
}
