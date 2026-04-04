import Link from "next/link";
import { Button } from "@workspace/ui/components/button";

export function NotFound({
  Icon,
  title,
  description,
}: {
  Icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-[calc(100vh-55px)] w-full items-center justify-center px-6">
      <div className="flex max-w-md flex-col items-center text-center gap-6">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <Icon className="h-8 w-8 text-muted-foreground" />
        </div>

        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>

        <p className="text-sm text-muted-foreground">{description}</p>

        <div className="flex gap-3">
          <Button asChild>
            <Link href="/">Go home</Link>
          </Button>

          <Button variant="outline" asChild>
            <Link href="/explore">Explore photos</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
