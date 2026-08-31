import { copyToClipboard } from "@/utils";
import { GenerationResult } from "@/@types";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent, CardHeader } from "@workspace/ui/components/card";
import { Check, Copy, Dot, Download } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";
import { useImageDownloader } from "use_image_downloader";

export function Result({ result }: { result: GenerationResult }) {
  const [copied, setCopied] = useState(false);
  const downloadImage = useImageDownloader();

  const handleCopyPrompt = () => {
    copyToClipboard(result.prompt, "Prompt copied to clipboard.");
    setCopied(true);
    setTimeout(() => setCopied(false), 5000);
  };

  const handleDownload = async () => {
    let toastID;
    try {
      toastID = toast.loading("Downloading...");
      const fileName = result.styleName + "_" + result.id + "." + "png";
      const URL = `data:image/png;base64,${result.image}`;
      await downloadImage(URL, fileName);
      toast.success("Image downloaded successfully", { id: toastID });
    } catch (error) {
      toast.error("Failed to download image", { id: toastID });
    }
  };

  return (
    <div className="group relative w-full h-full flex items-center justify-center overflow-hidden rounded-xl">
      <img
        src={`data:image/png;base64,${result.image}`}
        alt={result.prompt}
        className="max-h-130 w-full object-contain rounded-xl shadow-2xl transition-transform duration-300 group-hover:scale-[1.01]"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col justify-between p-4">
        <Badge variant="ghost">{result.styleName}</Badge>

        <div className="space-y-2">
          <p className="text-xs text-white/90 line-clamp-2 font-medium drop-shadow">
            "{result.prompt}"
          </p>

          <div className="flex items-center gap-2 pt-1">
            <Button
              size="sm"
              onClick={handleDownload}
              className="gap-1.5 bg-white text-black hover:bg-white/90 text-xs font-semibold shadow"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </Button>

            <Button
              size="sm"
              variant="outline"
              onClick={handleCopyPrompt}
              className="gap-1.5 bg-black/40 text-white border-white/30 hover:bg-black/60 text-xs shadow"
            >
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400" />
              ) : (
                <Copy className="w-3.5 h-3.5" />
              )}
              <span>{copied ? "Copied" : "Copy Prompt"}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Metadata({ result }: { result: GenerationResult }) {
  return (
    <Card className="p-4">
      <CardHeader className="p-0 text-xs font-semibold text-primary uppercase tracking-wider">
        Prompt Used
      </CardHeader>
      <CardContent className="space-y-3 p-0 pt-1">
        <p className="text-xs text-foreground font-medium leading-relaxed">
          {result.prompt}
        </p>

        {result.negativePrompt && (
          <div className="border-t pt-2">
            <span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider block mb-0.5">
              Negative Prompt
            </span>
            <p className="text-xs text-muted-foreground font-medium leading-relaxed">
              {result.negativePrompt}
            </p>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t text-[11px] text-muted-foreground pt-3 font-mono">
          <span>
            Style:{" "}
            <strong className="text-foreground">{result.styleName}</strong>
          </span>
          <span>
            Model: <strong className="text-foreground">{result.model}</strong>
          </span>
          <span>
            Visibility:{" "}
            <strong className="text-foreground">
              {result.public ? "Public" : "Private"}
            </strong>
          </span>
          <span>
            Created:{" "}
            <strong className="text-foreground">
              {new Date(result.createdAt).toLocaleString()}
            </strong>
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
