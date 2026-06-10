import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { reportSchema } from "@workspace/schema/report";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@workspace/ui/components/field";

import { Input } from "@workspace/ui/components/input";
import { Textarea } from "@workspace/ui/components/textarea";
import { Button } from "@workspace/ui/components/button";
import { useCreateReport } from "@/hooks";
import { useRouter } from "next/navigation";

export function Form({ imageId }: { imageId: string }) {
  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(reportSchema),
  });
  const { mutateAsync: reportImage, isPending } = useCreateReport();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = async (data: any) => {
    const res = await reportImage({ ...data, picId: imageId });
    router.push(`/report/status/${res.data.reportId}`);
  };

  return (
    <div className="w-full max-w-xl rounded-3xl border border-border/50 bg-card/60 p-6 shadow-2xl backdrop-blur-xl md:p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Report Image
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Help us understand the issue with this image.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <FieldGroup className="space-y-6">
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>

            <FieldDescription>Short summary of the issue.</FieldDescription>

            <Input
              id="title"
              placeholder="Spam, copyright issue, offensive content..."
              className="mt-2 h-11 rounded-xl"
              disabled={isPending}
              {...register("title")}
            />

            {errors.title?.message && (
              <FieldError className="mt-2">
                {String(errors.title.message)}
              </FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="reason">Reason</FieldLabel>

            <FieldDescription>Explain the issue in detail.</FieldDescription>

            <Textarea
              id="reason"
              rows={6}
              placeholder="Describe why this image should be reviewed..."
              className="mt-2 rounded-xl"
              disabled={isPending}
              {...register("reason")}
            />

            {errors.reason?.message && (
              <FieldError className="mt-2">
                {String(errors.reason.message)}
              </FieldError>
            )}
          </Field>

          {errors.root?.message && (
            <FieldError>{String(errors.root.message)}</FieldError>
          )}

          <Button
            type="submit"
            disabled={isPending}
            className="h-11 w-full rounded-xl text-sm font-medium"
          >
            {isPending ? "Submitting..." : "Submit Report"}
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
