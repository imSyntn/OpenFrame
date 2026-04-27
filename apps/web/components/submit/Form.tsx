import React, { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { pictureSchema } from "@workspace/schema/picture";
import { Input } from "@workspace/ui/components/input";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@workspace/ui/components/field";
import { Button } from "@workspace/ui/components/button";
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor,
} from "@workspace/ui/components/combobox";
import { Textarea } from "@workspace/ui/components/textarea";
import { useCreatePictureUpload, useGetTags } from "@/hooks";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store";

export function Form({
  uploadedUrl,
  pictureId,
}: {
  uploadedUrl: string;
  pictureId: string;
}) {
  const { data: tags, isLoading, error } = useGetTags();
  const userId = useUserStore((state) => state.id);
  const { mutateAsync: createPictureUpload, isPending } =
    useCreatePictureUpload();
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(pictureSchema),
    defaultValues: {
      tags: [],
    },
  });
  const anchor = useComboboxAnchor();
  const router = useRouter();

  useEffect(() => {
    if (uploadedUrl && pictureId) {
      setValue("url", uploadedUrl, { shouldValidate: true });
      setValue("pictureId", pictureId, { shouldValidate: true });
    }
  }, [uploadedUrl, pictureId]);

  const submit = async (data: any) => {
    try {
      await createPictureUpload(data);
      toast.success("Picture uploaded successfully", {
        description: "Picture is being processed. It will take a few minutes.",
      });
      router.push(`/profile/${userId}`);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to upload image");
    }
  };

  if (!isLoading && !!error) {
    toast.error("Failed to fetch tags");
  }

  return (
    <form
      className="w-full max-w-4xl border rounded-xl p-7 space-y-6"
      onSubmit={handleSubmit(submit)}
    >
      <FieldSet disabled={isPending}>
        <FieldLegend>Image Details</FieldLegend>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input id="title" {...register("title")} />
            {errors.title && <FieldError>{errors.title.message}</FieldError>}
          </Field>
          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea id="description" {...register("description")} />
            {errors.description && (
              <FieldError>{errors.description.message}</FieldError>
            )}
          </Field>
          <Field>
            <FieldLabel>Tags</FieldLabel>

            <Controller
              name="tags"
              control={control}
              render={({ field }) => (
                <Combobox
                  multiple
                  autoHighlight
                  items={tags}
                  value={field.value}
                  onValueChange={(values: { id: number; name: string }[]) => {
                    const unique = values.filter(
                      (tag, index, self) =>
                        index ===
                        self.findIndex(
                          (t) =>
                            t.name.toLowerCase() === tag.name.toLowerCase(),
                        ),
                    );
                    field.onChange(unique);
                  }}
                >
                  <ComboboxChips ref={anchor} className="w-full">
                    <ComboboxValue>
                      {(values: { id: number; name: string }[]) => (
                        <>
                          {values.map((tag) => (
                            <ComboboxChip key={tag.id}>{tag.name}</ComboboxChip>
                          ))}

                          <ComboboxChipsInput
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();

                                const value = e.currentTarget.value.trim();
                                if (!value) return;

                                const exists = field.value.some(
                                  (tag) =>
                                    tag.name.toLowerCase() ===
                                    value.toLowerCase(),
                                );
                                if (!exists) {
                                  field.onChange([
                                    ...field.value,
                                    {
                                      id: Date.now(),
                                      name: value,
                                    },
                                  ]);
                                }
                                e.currentTarget.value = "";
                              }
                            }}
                          />
                        </>
                      )}
                    </ComboboxValue>
                  </ComboboxChips>

                  <ComboboxContent anchor={anchor}>
                    <ComboboxEmpty>Press enter to add tag</ComboboxEmpty>
                    <ComboboxList>
                      {(item: { id: number; name: string }) => (
                        <ComboboxItem
                          key={item.id}
                          value={{ id: item.id, name: item.name }}
                        >
                          {item.name}
                        </ComboboxItem>
                      )}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              )}
            />

            {errors.tags && <FieldError>{errors.tags.message}</FieldError>}
          </Field>
        </FieldGroup>

        <Button
          className="w-full h-11 rounded-lg bg-primary text-primary-foreground font-medium transition hover:opacity-90 active:scale-[0.99]"
          disabled={isPending}
        >
          {isPending ? "Uploading..." : "Upload Image"}
        </Button>
      </FieldSet>
    </form>
  );
}
