"use client";

import React from "react";
import { Card } from "@workspace/ui/components/card";
import { Generating, GenerationError, Idle, Metadata, Result } from "./status";
import { useImageGenerationStore } from "../Provider";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert";
import { InfoIcon } from "lucide-react";

export function ImageResultViewport() {
  const status = useImageGenerationStore((state) => state.status);
  const currentResult = useImageGenerationStore((state) => state.currentResult);
  return (
    <Card className="p-0">
      <div className="relative h-fit min-h-120 w-full overflow-hidden flex flex-col items-center justify-center p-4 shadow-xl ">
        {status === "idle" && <Idle />}
        {status === "generating" && <Generating />}
        {status === "error" && <GenerationError />}
        {status === "success" && currentResult && (
          <Result result={currentResult} />
        )}
      </div>

      {status === "success" && currentResult && (
        <Metadata result={currentResult} />
      )}

      {status === "success" && currentResult?.public && (
        <Alert variant="CC0_1_0">
          <InfoIcon />

          <AlertTitle>Coming to the community gallery</AlertTitle>

          <AlertDescription>
            Your generated image will be added to the community gallery soon.
          </AlertDescription>
        </Alert>
      )}
    </Card>
  );
}
