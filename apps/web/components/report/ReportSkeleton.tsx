import { Skeleton } from "@workspace/ui/components/skeleton";

export default function ReportPageSkeleton() {
  return (
    <div className="min-h-[calc(100dvh-55px)] bg-background">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-8 px-4 py-8 md:flex-row md:items-center md:justify-center md:px-8">
        <div className="w-full max-w-md shrink-0">
          <div className="overflow-hidden rounded-3xl border border-border/50 bg-card/40 p-3 shadow-2xl backdrop-blur-xl">
            <Skeleton className="aspect-[4/3] w-full rounded-2xl" />
          </div>

          <div className="mt-5 space-y-4 px-2">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Skeleton className="h-7 w-48 rounded-lg" />
                <Skeleton className="h-6 w-24 rounded-full" />
              </div>

              <Skeleton className="h-4 w-full rounded-md" />
              <Skeleton className="h-4 w-[85%] rounded-md" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-border/50 bg-secondary/30 p-3">
                <Skeleton className="h-3 w-20 rounded-md" />
                <Skeleton className="mt-3 h-5 w-24 rounded-md" />
              </div>

              <div className="rounded-2xl border border-border/50 bg-secondary/30 p-3">
                <Skeleton className="h-3 w-16 rounded-md" />
                <Skeleton className="mt-3 h-5 w-28 rounded-md" />
              </div>
            </div>

            <Skeleton className="h-28 w-full rounded-2xl" />

            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-8 w-20 rounded-full" />
              <Skeleton className="h-8 w-24 rounded-full" />
              <Skeleton className="h-8 w-16 rounded-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-3 w-full rounded-md" />
              <Skeleton className="h-3 w-[90%] rounded-md" />
            </div>
          </div>
        </div>

        <div className="w-full max-w-xl rounded-3xl border border-border/50 bg-card/60 p-6 shadow-2xl backdrop-blur-xl md:p-8">
          <div className="mb-8 space-y-3">
            <Skeleton className="h-8 w-48 rounded-lg" />
            <Skeleton className="h-4 w-72 rounded-md" />
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <Skeleton className="h-4 w-16 rounded-md" />
              <Skeleton className="h-3 w-40 rounded-md" />
              <Skeleton className="h-11 w-full rounded-xl" />
            </div>

            <div className="space-y-3">
              <Skeleton className="h-4 w-20 rounded-md" />
              <Skeleton className="h-3 w-52 rounded-md" />
              <Skeleton className="h-36 w-full rounded-xl" />
            </div>
            <Skeleton className="h-11 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
