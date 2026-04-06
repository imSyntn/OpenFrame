"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";
import { AllCollections } from "./AllCollections";
import { MyCollections } from "./MyCollections";
import { ScrollArea, ScrollBar } from "@workspace/ui/components/scroll-area";
import { CreateCollection } from "./CreateCollection";

export function Content() {
  return (
    <div className="w-full h-[calc(100vh-55px)]">
      <Tabs
        defaultValue="all"
        className="flex flex-col md:flex-row"
        orientation="vertical"
      >
        <TabsList
          variant="line"
          className="flex flex-row md:flex-col max-h-fit mr-4 gap-3"
        >
          <TabsTrigger
            value="all"
            className="pl-3 data-[state=active]:text-primary! data-[state=active]:border-b-primary rounded-none px-0 cursor-pointer"
          >
            All Collections
          </TabsTrigger>
          <TabsTrigger
            value="my"
            className="pl-3 data-[state=active]:text-primary! data-[state=active]:border-b-primary rounded-none px-0 cursor-pointer"
          >
            My Collections
          </TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <ScrollArea className="h-[calc(100vh-55px)] pr-3">
            {/* <CreateCollection /> */}
            <AllCollections />
            <ScrollBar orientation="vertical" />
          </ScrollArea>
        </TabsContent>

        <TabsContent value="my">
          <ScrollArea className="h-[calc(100vh-55px)] pr-3">
            <CreateCollection />
            <MyCollections />
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
