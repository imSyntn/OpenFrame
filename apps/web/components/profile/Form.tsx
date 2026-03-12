import React from "react";
import { useProfileStore } from "@/store";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@workspace/ui/components/avatar";
import { Button } from "@workspace/ui/components/button";
import { Input } from "@workspace/ui/components/input";
import { Label } from "@workspace/ui/components/label";
import { Textarea } from "@workspace/ui/components/textarea";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { settingSchema } from "@/schema";
import { useUpdateUserDetails } from "@/hooks";
import { ProfileType } from "@/@types";
import { toast } from "sonner";

export function Form({ handleClose }: { handleClose: () => void }) {
  const { name, avatar, bio, location, email, joined_at, links, id, setData } =
    useProfileStore();
  const { mutateAsync, isSuccess } = useUpdateUserDetails(id);
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(settingSchema),
    defaultValues: {
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
    } catch (error) {
      console.log(error);
      toast.error("Failed to update profile");
    }
  };

  const { fields, append, remove } = useFieldArray({
    control,
    name: "links",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={avatar} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>

        <Button variant="secondary">Change Avatar</Button>
      </div>

      <div className="space-y-2">
        <Label>Name</Label>
        <Input placeholder="Your name" {...register("name")} />
        {errors.name && (
          <p className="text-destructive text-sm">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Bio</Label>
        <Textarea
          placeholder="Tell people about yourself"
          {...register("bio")}
        />
        {errors.bio && (
          <p className="text-destructive text-sm">{errors.bio.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Location</Label>
        <Input placeholder="City, Country" {...register("location")} />
        {errors.location && (
          <p className="text-destructive text-sm">{errors.location.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>Email</Label>
        <Input value={email} disabled />
      </div>

      <div className="text-sm text-muted-foreground">
        Joined {new Date(joined_at).toLocaleDateString()}
      </div>

      <div className="border-t pt-6 space-y-4">
        <p className="text-sm font-semibold">Social Links</p>

        {fields.map((field, index) => (
          <div key={field.id} className="flex gap-2 items-start">
            <div>
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
            </div>

            <div className="flex-1">
              <Input
                placeholder="https://..."
                {...register(`links.${index}.url`)}
              />
              {errors.links?.[index]?.url && (
                <p className="text-destructive text-sm mt-1">
                  {errors.links[index]?.url?.message}
                </p>
              )}
            </div>

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
    </form>
  );
}
