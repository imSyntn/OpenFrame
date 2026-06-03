import { ReportType } from "@workspace/types";
import Link from "next/link";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import {
  ArrowUpRight,
  Clock3,
  FileText,
  InfoIcon,
  Mail,
  ShieldAlert,
} from "lucide-react";
import { Badge } from "@workspace/ui/components/badge";
import { Button } from "@workspace/ui/components/button";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@workspace/ui/components/alert";
import { UpdateStatus } from "./UpdateStatus";

const statusStyles = {
  PENDING: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-300",
  UNDER_REVIEW: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  REJECTED: "bg-red-500/10 text-red-700 dark:text-red-300",
  RESOLVED: "bg-green-500/10 text-green-700 dark:text-green-300",
};

export function StatusCard({ report }: { report: ReportType }) {
  const thumbnail =
    report.picture?.src?.find((img: any) => img.resolution === "SMALL") ||
    report.picture?.src?.find((img: any) => img.resolution === "THUMBNAIL");

  return (
    <div className="mx-auto max-w-5xl p-4 md:p-8">
      <div className="overflow-hidden rounded-[2rem] border border-border/50 bg-card/60 shadow-2xl backdrop-blur-xl">
        <div className="grid md:grid-cols-[380px_1fr]">
          <div className="relative border-b border-border/50 bg-secondary/20 md:border-b-0 md:border-r">
            {thumbnail?.url ? (
              <Image
                src={thumbnail.url}
                alt={report.title}
                width={640}
                height={420}
                unoptimized
                className="h-full min-h-[280px] w-full object-cover"
              />
            ) : (
              <div className="flex h-full min-h-[280px] items-center justify-center">
                <p className="text-sm text-muted-foreground">
                  No preview available
                </p>
              </div>
            )}

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
              <Badge
                className={`border px-3 py-1 text-xs font-medium backdrop-blur-lg ${statusStyles[report.status as keyof typeof statusStyles]}`}
              >
                {report.status}
              </Badge>

              <h2 className="mt-3 text-xl font-semibold text-white">
                {report.title}
              </h2>

              <p className="mt-1 text-sm text-white/80">
                Submitted{" "}
                {formatDistanceToNow(new Date(report.created_at), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>

          <div className="p-6 md:p-8">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-primary" />

              <p className="text-sm font-medium uppercase tracking-wide text-muted-foreground">
                Report Status
              </p>
            </div>

            <div className="flex w-full items-center justify-between gap-3">
              <h1 className="mt-2 text-3xl font-semibold tracking-tight">
                Moderation Request
              </h1>
              {report.isAdmin && (
                <UpdateStatus status={report.status} reportId={report.id} />
              )}
            </div>

            <div className="mt-8 rounded-2xl border border-border/50 bg-secondary/20 p-5">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />

                <p className="text-sm font-medium">Report Reason</p>
              </div>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                {report.reason}
              </p>
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-border/50 bg-secondary/20 p-5">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />

                  <p className="text-sm font-medium">Reporter</p>
                </div>

                <p className="mt-3 break-all text-sm text-muted-foreground">
                  {report.user_email}
                </p>
              </div>

              <div className="rounded-2xl border border-border/50 bg-secondary/20 p-5">
                <div className="flex items-center gap-2">
                  <Clock3 className="h-4 w-4 text-muted-foreground" />

                  <p className="text-sm font-medium">Submitted</p>
                </div>

                <p className="mt-3 text-sm text-muted-foreground">
                  {formatDistanceToNow(new Date(report.created_at), {
                    addSuffix: true,
                  })}
                </p>
              </div>
            </div>

            {report.note && (
              <Alert
                className="mt-4"
                variant={
                  report.status == "RESOLVED"
                    ? "CC0_1_0"
                    : report.status == "REJECTED"
                      ? "CC_BY_NC_4_0"
                      : "CC_BY_4_0"
                }
              >
                <InfoIcon />
                <AlertTitle>Moderation Note</AlertTitle>
                <AlertDescription>{report.note}</AlertDescription>
              </Alert>
            )}

            <div className="mt-8 flex flex-col gap-3 border-t border-border/50 pt-6 sm:flex-row">
              <Button asChild className="rounded-xl">
                <Link href={`/picture/${report.pic_id}`}>
                  View Reported Image
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>

              <div className="flex items-center rounded-xl border border-border/50 bg-secondary/20 px-4 py-2 text-xs text-muted-foreground">
                {report.status === "PENDING"
                  ? "Our moderation team will review this report."
                  : report.status === "UNDER_REVIEW"
                    ? "Our moderation team is reviewing this report."
                    : report.status === "REJECTED"
                      ? "This report has been rejected."
                      : "This report has been resolved."}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
