import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { collectionSchema } from "@/schema";
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
import { Badge } from "@workspace/ui/components/badge";
import { Lock } from "lucide-react";
import { useCreateCollection, useUpdateCollection } from "@/hooks";
import { Collection } from "@workspace/types";

export function Form({ collection }: { collection?: Collection }) {
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

  const onSubmit = (data: z.infer<typeof collectionSchema>) => {
    if (collection) {
      updateCollection({ id: collection.id, data });
    } else {
      createCollection(data);
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
                    {field.value === "PRIVATE" ? (
                      <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
                        Private
                      </Badge>
                    ) : (
                      <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
                        Public
                      </Badge>
                    )}

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
