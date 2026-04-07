"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { collectionSchema } from "@workspace/schema/collection";
import z from "zod";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldSet,
} from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import { Switch } from "@workspace/ui/components/switch";
import { Textarea } from "@workspace/ui/components/textarea";
import { Button } from "@workspace/ui/components/button";
import { Card, CardContent } from "@workspace/ui/components/card";
import { Lock } from "lucide-react";
import { useCreateCollection, useUpdateCollection } from "@/hooks";
// import { Collection } from "@workspace/types";
import { VisibilityBadge } from "../common";
import { useGlobalStateStore } from "@/store";

export function Form({
  // collection,
  onCreated,
  onUpdated,
}: {
  // collection?: Collection;
  onCreated?: (id: string) => void;
  onUpdated?: () => void;
}) {
  const collection = useGlobalStateStore((state) => state.openCollectionModal);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      title: collection?.title || "",
      description: collection?.description || "",
      visibility: collection?.visibility || "PUBLIC",
    },
  });
  const { mutateAsync: createCollection } = useCreateCollection();
  const { mutateAsync: updateCollection } = useUpdateCollection();

  const onSubmit = async (data: z.infer<typeof collectionSchema>) => {
    if (collection) {
      await updateCollection({ id: collection.id, data });
      onUpdated?.();
    } else {
      const { data: createdCollection } = await createCollection(data);
      onCreated?.(createdCollection.id);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FieldSet>
        <Field className="space-y-2">
          <FieldLabel>Title</FieldLabel>
          <Input placeholder="Collection title" {...register("title")} />
          {errors.title && (
            <p className="text-destructive text-sm">{errors.title.message}</p>
          )}
        </Field>
        <Field className="space-y-2">
          <FieldLabel>Description</FieldLabel>
          <Textarea placeholder="Description" {...register("description")} />
          {errors.description && (
            <p className="text-destructive text-sm">
              {errors.description.message}
            </p>
          )}
        </Field>
        <Field className="w-full">
          <Card className="border">
            <CardContent className="flex items-center justify-between gap-4 px-4 py-2">
              <FieldContent className="space-y-1">
                <FieldLabel className="flex items-center gap-2 text-sm font-medium">
                  <Lock className="h-4 w-4 text-amber-400" />
                  Make collection private
                </FieldLabel>
                <FieldDescription className="text-xs text-muted-foreground">
                  When enabled, only you can view this collection. Turn off to
                  make it public.
                </FieldDescription>
              </FieldContent>

              <Controller
                name="visibility"
                control={control}
                render={({ field }) => (
                  <div className="flex items-center gap-3">
                    <VisibilityBadge visibility={field.value} />

                    <Switch
                      checked={field.value === "PRIVATE"}
                      onCheckedChange={(checked) =>
                        field.onChange(checked ? "PRIVATE" : "PUBLIC")
                      }
                      className="cursor-pointer"
                    />
                  </div>
                )}
              />
            </CardContent>
          </Card>
        </Field>
        <Button type="submit">Create collection</Button>
      </FieldSet>
    </form>
  );
}
