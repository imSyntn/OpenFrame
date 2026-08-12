"use client";

import { ApiReferenceReact } from "@scalar/api-reference-react";
import "@scalar/api-reference-react/style.css";
import { cn } from "@workspace/ui/lib/utils";
import { Loader2 } from "lucide-react";
import { useState } from "react";

export default function ApiDocs() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="api-docs">
      {isLoading && (
        <div className="h-screen w-full flex justify-center items-center">
          <Loader2 className="animate-spin" />
        </div>
      )}

      <div className={cn(isLoading ? "invisible" : "visible")}>
        <ApiReferenceReact
          configuration={{
            url: process.env.NEXT_PUBLIC_OPENAPI_SPEC_URL,
            theme: "default",
            agent: {
              disabled: true,
            },
            onLoaded: () => setIsLoading(false),
          }}
        />
      </div>
    </div>
  );
}
