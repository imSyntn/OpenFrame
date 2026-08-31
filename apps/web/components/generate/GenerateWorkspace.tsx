"use client";

import React, { useState } from "react";
import { ImageResultViewport } from "./ImageResultViewport";
import { Card } from "@workspace/ui/components/card";
import { ImageGenerateForm } from "./ImageGenerateForm";

export function GenerateWorkspace() {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <Card className="lg:col-span-5 p-4 sm:p-6 ">
          <ImageGenerateForm />
        </Card>

        <div className="lg:col-span-7">
          <ImageResultViewport />
        </div>
      </div>
    </>
  );
}
