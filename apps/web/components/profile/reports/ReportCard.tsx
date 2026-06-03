import Link from "next/link";
import { ReportType } from "@workspace/types";
import Image from "next/image";
import { Card } from "@workspace/ui/components/card";
import { Button } from "@workspace/ui/components/button";

export function ReportCard({ report }: { report: ReportType }) {
  const thumbnail =
    report.picture?.src?.find((img) => img.resolution === "THUMBNAIL") ||
    report.picture?.src?.find((img) => img.resolution === "SMALL");

  return (
    <Card className="flex flex-col! gap-3 p-5 w-fit">
      <Link
        href={`/picture/${report.pic_id}`}
        className="shrink-0"
        target="_blank"
      >
        <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-secondary/30">
          {thumbnail?.url ? (
            <Image
              src={thumbnail.url}
              alt={report.title}
              width={100}
              height={100}
              unoptimized
              className="h-32 w-full object-cover transition-transform duration-300 group-hover:scale-105 sm:w-44"
            />
          ) : (
            <div className="flex h-32 w-full items-center justify-center bg-muted sm:w-44">
              <p className="text-sm text-muted-foreground">No Preview</p>
            </div>
          )}
        </div>
      </Link>

      <h2 className="line-clamp-1 text-lg font-semibold tracking-tight text-foreground">
        {report.title}
      </h2>
      <p className="line-clamp-3 text-sm leading-relaxed text-muted-foreground">
        {report.reason}
      </p>

      <Link href={`/report/status/${report.id}`}>
        <Button variant="link">View updates</Button>
      </Link>
    </Card>
  );
}
