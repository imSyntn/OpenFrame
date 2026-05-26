import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@workspace/ui/components/field";
import { RadioGroupItem } from "@workspace/ui/components/radio-group";
import { LicenseObjType } from "@workspace/types";
import { Check, Globe, Pencil, RefreshCw, Shield, X } from "lucide-react";
import React from "react";
import { cn } from "@workspace/ui/lib/utils";

const permissionIcons = {
  commercialUse: Globe,
  modification: Pencil,
  redistribution: RefreshCw,
  attributionRequired: Shield,
  shareAlike: RefreshCw,
};

const permissionLabels = {
  commercialUse: "Commercial Use",
  modification: "Modification",
  redistribution: "Redistribution",
  attributionRequired: "Attribution Required",
  shareAlike: "Share Alike",
};

export function LicenseSelector({
  license,
  fieldState,
}: {
  license: LicenseObjType;
  fieldState: any;
}) {
  const permissions = Object.entries(license.permissions);

  return (
    <FieldLabel htmlFor={license.key} className="cursor-pointer">
      <Field orientation="horizontal" data-invalid={fieldState.invalid}>
        <FieldContent className="space-y-4">
          <div className="space-y-1">
            <FieldTitle className="text-base">{license.name}</FieldTitle>

            <FieldDescription className="text-sm leading-relaxed">
              {license.bestFor}
            </FieldDescription>
          </div>

          <ul className="grid gap-2 text-sm">
            {permissions.map(([key, value]) => {
              const Icon = permissionIcons[key as keyof typeof permissionIcons];

              return (
                <li
                  key={key}
                  className={cn(
                    "flex items-center gap-3 rounded-md border px-3 py-2",
                    value
                      ? "border-green-500/20 bg-green-500/5"
                      : "border-red-500/20 bg-red-500/5",
                  )}
                >
                  <div
                    className={cn(
                      "flex size-6 items-center justify-center rounded-full",
                      value
                        ? "bg-green-500/10 text-green-600 dark:text-green-400"
                        : "bg-red-500/10 text-red-600 dark:text-red-400",
                    )}
                  >
                    {value ? (
                      <Check className="size-3.5" />
                    ) : (
                      <X className="size-3.5" />
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <Icon className="size-4 text-muted-foreground" />

                    <span className="font-medium">
                      {permissionLabels[key as keyof typeof permissionLabels]}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </FieldContent>

        <RadioGroupItem
          value={license.key}
          id={license.key}
          aria-invalid={fieldState.invalid}
          className="mt-1"
        />
      </Field>
    </FieldLabel>
  );
}
