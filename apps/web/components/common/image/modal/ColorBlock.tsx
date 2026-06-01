import { copyToClipboard } from "@/utils";
import { Button } from "@workspace/ui/components/button";
import { Copy } from "lucide-react";
import React from "react";

export function ColorBlock({ color }: { color: string }) {
  const copyColor = async () => {
    await copyToClipboard(
      color,
      "Color copied to clipboard",
      "Failed to copy color",
    );
  };
  return (
    <Button
      size="icon"
      variant="outline"
      className="rounded-full group"
      style={{
        backgroundColor: color,
      }}
      onClick={copyColor}
    >
      <Copy className="opacity-0 transition-all duration-200 group-hover:opacity-100 mix-blend-difference" />
    </Button>
  );
}
