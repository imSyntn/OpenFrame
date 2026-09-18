import { Loader2 } from "lucide-react";

export function PhotoEditorSkeleton() {
  return (
    <div className="flex h-full min-h-[500px] items-center justify-center">
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Loader2 className="animate-spin" /> Loading editor
      </div>
    </div>
  );
}
