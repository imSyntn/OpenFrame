import { useUpdateReport } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { reportUpdateSchema } from "@workspace/schema/report";
import { ReportStatus } from "@workspace/types";
import { Button } from "@workspace/ui/components/button";
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@workspace/ui/components/combobox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@workspace/ui/components/dialog";
import { Field, FieldError, FieldGroup } from "@workspace/ui/components/field";
import { Label } from "@workspace/ui/components/label";
import { Textarea } from "@workspace/ui/components/textarea";
import { Controller, useForm } from "react-hook-form";

const statusItems = Object.values(ReportStatus);

export function UpdateStatus({
  status,
  reportId,
}: {
  status: ReportStatus;
  reportId: string;
}) {
  const {
    handleSubmit,
    control,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(reportUpdateSchema),
    defaultValues: {
      status,
    },
  });
  const { mutate: updateReport, isPending } = useUpdateReport();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data: any) => {
    updateReport({ ...data, reportId });
  };

  return (
    <Dialog modal={false}>
      <DialogTrigger asChild>
        <Button className="mt-4 w-fit" variant="outline">
          Update
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogHeader>
            <DialogTitle>Edit Status</DialogTitle>
            <DialogDescription className="mb-2">
              Change status
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Status</Label>
              <Controller
                control={control}
                name="status"
                render={({ field }) => (
                  <Combobox
                    items={statusItems}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <ComboboxInput placeholder="Select a status" />
                    <ComboboxContent className="z-50">
                      <ComboboxEmpty>No status found.</ComboboxEmpty>
                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem key={item} value={item}>
                            {item}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                )}
              />
            </Field>
            <Field>
              <Label htmlFor="note">Note</Label>
              <Textarea
                id="note"
                placeholder="Note for the user..."
                {...register("note")}
              />
              {errors.note && <FieldError>{errors.note.message}</FieldError>}
            </Field>
          </FieldGroup>
          <DialogFooter className="mt-4">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Updating..." : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
