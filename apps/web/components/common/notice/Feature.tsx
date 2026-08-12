"use client";

import { toast } from "sonner";
import { useEffect } from "react";

export function Feature() {
  useEffect(() => {
    const isViewed = localStorage.getItem("notice:migration-completed");

    if (isViewed) {
      return;
    }

    localStorage.setItem("notice:migration-completed", "true");
    toast.success("Migration Complete", {
      description:
        "All services are operational and the platform is now running normally.",
      duration: 10000,
      action: {
        label: "Close",
        onClick: () => console.log("Close"),
      },
    });
  }, []);

  return null;
}
