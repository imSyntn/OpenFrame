"use client";

import dynamic from "next/dynamic";
import "@scalar/api-reference-react/style.css";
import { Loader2 } from "lucide-react";

const ApiReferenceReact = dynamic(
  () =>
    import("@scalar/api-reference-react").then(
      (module) => module.ApiReferenceReact,
    ),
  {
    loading: () => (
      <div className="h-screen w-full flex justify-center items-center">
        <Loader2 className="animate-spin" />
      </div>
    ),
  },
);

export default function ApiDocs() {
  return (
    <div className="min-h-screen">
      <ApiReferenceReact
        configuration={{
          url: process.env.NEXT_PUBLIC_OPENAPI_SPEC_URL,
          theme: "default",
          agent: {
            disabled: true,
          },
        }}
      />
    </div>
  );
}
