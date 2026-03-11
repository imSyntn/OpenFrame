"use client";

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@workspace/ui/components/tabs";

export function People() {
  return (
    <div className="w-full">
      <Tabs defaultValue="Follower" className="flex flex-col md:flex-row">
        <TabsList
          variant="line"
          className="flex flex-row md:flex-col max-h-fit mr-5 gap-3"
        >
          <TabsTrigger
            value="Follower"
            className="pl-3 data-[state=active]:text-primary! data-[state=active]:border-b-primary rounded-none px-0 cursor-pointer"
          >
            Followers
          </TabsTrigger>
          <TabsTrigger
            value="Following"
            className="pl-3 data-[state=active]:text-primary! data-[state=active]:border-b-primary rounded-none px-0 cursor-pointer"
          >
            Following
          </TabsTrigger>
        </TabsList>

        <TabsContent value="Follower">
          <PeopleGrid type="followers" />
        </TabsContent>

        <TabsContent value="Following">
          <PeopleGrid type="following" />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function PeopleGrid({ type }: { type: "followers" | "following" }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {Array.from({ length: 9 }).map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between border rounded-lg p-4 hover:bg-muted/50 transition"
        >
          <div className="flex items-center gap-3">
            <img
              src={`https://i.pravatar.cc/100?img=${i + 1}`}
              className="w-10 h-10 rounded-full"
            />

            <div className="flex flex-col">
              <span className="text-sm font-medium">User {i + 1}</span>
              <span className="text-xs text-muted-foreground">
                @{type}_{i + 1}
              </span>
            </div>
          </div>

          <button className="text-xs px-3 py-1 border rounded-md hover:bg-muted transition">
            Follow
          </button>
        </div>
      ))}
    </div>
  );
}
