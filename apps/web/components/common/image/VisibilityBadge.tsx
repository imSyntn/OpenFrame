import { Badge } from "@workspace/ui/components/badge";
import React from "react";

export function VisibilityBadge({
  visibility,
}: {
  visibility: "PUBLIC" | "PRIVATE";
}) {
  if (visibility == "PUBLIC") {
    return (
      <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
        Public
      </Badge>
    );
  }

  return (
    <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
      Private
    </Badge>
  );
}
