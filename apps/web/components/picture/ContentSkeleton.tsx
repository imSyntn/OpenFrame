import { Skeleton } from "@workspace/ui/components/skeleton";
import { ScrollArea } from "@workspace/ui/components/scroll-area";

export function ContentSkeleton() {
  return (
    <>
      <div className="flex items-center justify-between px-6 pt-6 mb-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-8 w-8 rounded-full" />
          <div className="space-y-1">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-9 rounded-md" />
          <Skeleton className="h-9 w-20 rounded-md" />
        </div>
      </div>

      <ScrollArea className="flex-1 min-h-0 px-6 pb-6">
        <div className="space-y-6">
          <div className="w-full flex justify-center rounded-xl overflow-hidden min-h-[60vh]">
            <Skeleton className="w-full h-[60vh] rounded-xl" />
          </div>

          <div className="space-y-2">
            <Skeleton className="h-6 w-1/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>

          <div className="flex gap-10">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton className="h-3 w-12" />
                <Skeleton className="h-5 w-10" />
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-6 w-16 rounded-full" />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="rounded-xl border p-5 space-y-4">
              <Skeleton className="h-5 w-20" />
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex justify-between">
                  <Skeleton className="h-3 w-20" />
                  <Skeleton className="h-3 w-16" />
                </div>
              ))}
            </div>

            <div className="rounded-xl border p-5 space-y-4">
              <Skeleton className="h-5 w-20" />

              <div className="flex justify-between items-center">
                <Skeleton className="h-3 w-20" />
                <div className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5 rounded" />
                  <Skeleton className="h-3 w-16" />
                </div>
              </div>

              <div className="flex justify-between">
                <Skeleton className="h-3 w-20" />
                <Skeleton className="h-3 w-32" />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Skeleton className="h-5 w-20" />

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="border rounded-lg p-3 space-y-2 bg-muted/30"
                >
                  <Skeleton className="h-3 w-16" />
                  <Skeleton className="h-4 w-20" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>
    </>
  );
}
