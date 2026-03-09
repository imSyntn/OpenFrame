"use client";

import { cn } from "@workspace/ui/lib/utils";
import { Button } from "@workspace/ui/components/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldSet,
} from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { loginSchema } from "@/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import ForgotPassword from "./ForgotPassword";
import { googleLoginHandler } from "@/utils";
import { useLogin } from "@/hooks";
import { UserLoginType } from "@workspace/types";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);

  const { mutateAsync } = useLogin();

  const onSubmit = async (payload: UserLoginType) => {
    const toastId = toast.loading("Logging you in...");
    try {
      const response = await mutateAsync(payload);
      if (response.status === 200) {
        toast.success("Logged in successfully", {
          id: toastId,
          description: "You are being redirected.",
        });
        setUser({
          isLoggedIn: true,
          email: response.data.data.email,
          id: response.data.data.id,
          name: response.data.data.name,
          avatar: response.data.data.avatar,
        });
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
    } catch (error: any) {
      toast.dismiss(toastId);

      const apiError = error?.response?.data;
      if (apiError?.errors) {
        apiError.errors.forEach((err: { field: string; message: string }) => {
          setError(err.field as keyof UserLoginType, {
            type: "server",
            message: err.message,
          });
        });
        return;
      }

      setError("root", {
        type: "server",
        message: apiError?.message || "Something went wrong",
      });
    }
  };

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <FieldSet disabled={isSubmitting || isLoggedIn}>
        <FieldGroup>
          <div className="flex flex-col items-center gap-1 text-center">
            <h1 className="text-2xl font-bold">Login to your account</h1>
            <p className="text-sm text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <Field>
            <FieldLabel htmlFor="email">Email</FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              className="bg-background"
              {...register("email")}
            />
            {errors.email && <FieldError errors={[errors.email]} />}
          </Field>
          <Field>
            <div className="flex items-center">
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <ForgotPassword />
            </div>
            <Input
              id="password"
              type="password"
              className="bg-background"
              {...register("password")}
            />
            {errors.password && <FieldError errors={[errors.password]} />}
          </Field>

          {errors.root && <FieldError errors={[errors.root]} />}
          <Field>
            <Button type="submit">Login</Button>
          </Field>
          <FieldSeparator className="*:data-[slot=field-separator-content]:bg-muted dark:*:data-[slot=field-separator-content]:bg-card">
            Or continue with
          </FieldSeparator>
          <Field>
            <Button
              variant="outline"
              type="button"
              onClick={googleLoginHandler}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                className="h-5 w-5"
              >
                {" "}
                <path
                  fill="#FFC107"
                  d="M43.611 20.083h-1.611V20H24v8h11.303C33.809 32.657 29.297 36 24 36c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.957 3.043l5.657-5.657C33.883 6.053 29.221 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.651-.389-3.917z"
                />{" "}
                <path
                  fill="#FF3D00"
                  d="M6.306 14.691l6.571 4.819C14.655 16.108 18.961 13 24 13c3.059 0 5.842 1.154 7.957 3.043l5.657-5.657C33.883 6.053 29.221 4 24 4c-7.732 0-14.41 4.417-17.694 10.691z"
                />{" "}
                <path
                  fill="#4CAF50"
                  d="M24 44c5.176 0 9.86-1.977 13.409-5.188l-6.19-5.238C29.207 35.091 26.715 36 24 36c-5.275 0-9.777-3.316-11.284-7.946l-6.523 5.024C9.444 39.556 16.154 44 24 44z"
                />{" "}
                <path
                  fill="#1976D2"
                  d="M43.611 20.083h-1.611V20H24v8h11.303a12.05 12.05 0 0 1-4.084 5.574l6.19 5.238C36.96 36.337 44 30.695 44 24c0-1.341-.138-2.651-.389-3.917z"
                />{" "}
              </svg>
              Login with Google
            </Button>
            <FieldDescription className="text-center">
              Don&apos;t have an account?{" "}
              <Link href="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </FieldSet>
    </form>
  );
}
