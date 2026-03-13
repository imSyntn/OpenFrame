import React, { useState } from "react";
import { useProfileStore } from "@/store";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { settingSchema } from "@/schema";
import { useUpdateUserDetails } from "@/hooks";
import { ProfileType } from "@/@types";
import { toast } from "sonner";
import { Field, FieldLabel, FieldSet } from "@workspace/ui/components/field";
import { ChangeAvatar } from "./ChangeAvatar";

export function Form({ handleClose }: { handleClose: () => void }) {
  const { name, avatar, bio, location, email, joined_at, links, id, setData } =
    useProfileStore();
  const { mutateAsync, isPending } = useUpdateUserDetails(id);
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(settingSchema),
    defaultValues: {
      avatar,
      name,
      bio: bio || "",
      location: location || "",
      links: Array.isArray(links) ? links : [],
    },
  });

  const onSubmit = async (data: Partial<ProfileType>) => {
    try {
      const res = await mutateAsync(data);
      handleClose();
      toast.success("Profile updated successfully");
      setData(res);
    } catch (error: any) {
      console.log(error?.response?.data?.message);
      toast.error(
        error?.response?.data?.message || "Failed to update profile.",
      );
    }
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  const changeAvatar = (avatar: string) => {
    setValue("avatar", avatar);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FieldSet disabled={isPending}>
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={watch("avatar") || avatar} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>

          <ChangeAvatar changeAvatar={changeAvatar}>
            <Button variant="outline">Change avatar</Button>
          </ChangeAvatar>
        </div>

        <Field className="space-y-2">
          <FieldLabel>Name</FieldLabel>
          <Input placeholder="Your name" {...register("name")} />
          {errors.name && (
            <p className="text-destructive text-sm">{errors.name.message}</p>
          )}
        </Field>

        <Field className="space-y-2">
          <FieldLabel>Bio</FieldLabel>
          <Textarea
            placeholder="Tell people about yourself"
            {...register("bio")}
          />
          {errors.bio && (
            <p className="text-destructive text-sm">{errors.bio.message}</p>
          )}
        </Field>

        <Field className="space-y-2">
          <FieldLabel>Location</FieldLabel>
          <Input placeholder="City, Country" {...register("location")} />
          {errors.location && (
            <p className="text-destructive text-sm">
              {errors.location.message}
            </p>
          )}
        </Field>

        <Field className="space-y-2">
          <FieldLabel>Email</FieldLabel>
          <Input value={email} disabled />
        </Field>

        <div className="text-sm text-muted-foreground">
          Joined {new Date(joined_at).toLocaleDateString()}
        </div>

        <div className="border-t pt-6 space-y-4">
          <p className="text-sm font-semibold">Social Links</p>

          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 items-start">
              <Field className="w-fit">
                <Input
                  placeholder="Platform"
                  className="w-[100px] md:w-[140px]"
                  {...register(`links.${index}.name`)}
                />
                {errors.links?.[index]?.name && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.links[index]?.name?.message}
                  </p>
                )}
              </Field>

              <Field>
                <Input
                  placeholder="https://..."
                  {...register(`links.${index}.url`)}
                />
                {errors.links?.[index]?.url && (
                  <p className="text-destructive text-sm mt-1">
                    {errors.links[index]?.url?.message}
                  </p>
                )}
              </Field>

              <Button
                type="button"
                variant="destructive"
                size="icon"
                onClick={() => remove(index)}
              >
                ✕
              </Button>
            </div>
          ))}

          <Button
            type="button"
            variant="secondary"
            onClick={() => append({ name: "", url: "" })}
          >
            Add Link
          </Button>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>

          <Button>Save Changes</Button>
        </div>

        <div className="border-t pt-6 flex items-center justify-between">
          <p className="text-sm font-semibold text-destructive">Danger Zone</p>

          <Button variant="destructive" type="submit">
            Delete Account
          </Button>
        </div>
      </FieldSet>
    </form>
  );
}
