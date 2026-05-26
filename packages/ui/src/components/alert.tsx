import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@workspace/ui/lib/utils";

const alertVariants = cva(
  "group/alert relative grid w-full gap-0.5 rounded-lg border px-2.5 py-2 text-left text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pr-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-card text-card-foreground",
        destructive:
          "bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current",

        ALL_RIGHTS_RESERVED:
          "border-[var(--license-all-rights-reserved)]/30 bg-[var(--license-all-rights-reserved)]/10 text-[var(--license-all-rights-reserved)] *:data-[slot=alert-description]:text-[var(--license-all-rights-reserved)]/90",

        CC_BY_4_0:
          "border-[var(--license-cc-by-4-0)]/30 bg-[var(--license-cc-by-4-0)]/10 text-[var(--license-cc-by-4-0)] *:data-[slot=alert-description]:text-[var(--license-cc-by-4-0)]/90",

        CC_BY_SA_4_0:
          "border-[var(--license-cc0-1-0)]/30 bg-[var(--license-cc0-1-0)]/10 text-[var(--license-cc0-1-0)] *:data-[slot=alert-description]:text-[var(--license-cc0-1-0)]/90",

        CC_BY_NC_4_0:
          "border-[var(--license-cc-by-nc-4-0)]/30 bg-[var(--license-cc-by-nc-4-0)]/10 text-[var(--license-cc-by-nc-4-0)] *:data-[slot=alert-description]:text-[var(--license-cc-by-nc-4-0)]/90",

        CC0_1_0:
          "border-[var(--license-cc-by-sa-4-0)]/30 bg-[var(--license-cc-by-sa-4-0)]/10 text-[var(--license-cc-by-sa-4-0)] *:data-[slot=alert-description]:text-[var(--license-cc-by-sa-4-0)]/90",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

function Alert({
  className,
  variant,
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof alertVariants>) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  );
}

function AlertTitle({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-title"
      className={cn(
        "font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
        className,
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-description"
      className={cn(
        "text-sm text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
        className,
      )}
      {...props}
    />
  );
}

function AlertAction({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-action"
      className={cn("absolute top-2 right-2", className)}
      {...props}
    />
  );
}

export { Alert, AlertTitle, AlertDescription, AlertAction };
