"use client";

import { useChangePassword, useOTPGenerate, useOTPVerify } from "@/hooks";
import { forgotPasswordSchema } from "@/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@workspace/ui/components/button";
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
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldSet,
} from "@workspace/ui/components/field";
import { Input } from "@workspace/ui/components/input";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@workspace/ui/components/input-otp";
import { Label } from "@workspace/ui/components/label";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const ForgotPassword = () => {
  const [step, setStep] = useState(0);
  const {
    register,
    control,
    trigger,
    reset,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const { mutateAsync: generateOTP } = useOTPGenerate();
  const { mutateAsync: verifyOTP } = useOTPVerify();
  const { mutateAsync: changePassword } = useChangePassword();

  const handleNext = async () => {
    clearErrors();
    try {
      setLoading(true);
      let response;
      if (step === 0) {
        const valid = await trigger("email");
        if (!valid) return;
        response = await generateOTP({ email: getValues("email") });
      }
      if (step === 1) {
        const valid = await trigger("otp");
        if (!valid) return;
        response = await verifyOTP({
          email: getValues("email"),
          otp: getValues("otp"),
        });
      }
      if (step === 2) {
        const valid = await trigger(["confirmPassword", "password"]);
        if (!valid) return;
        response = await changePassword({
          email: getValues("email"),
          password: getValues("password"),
        });
      }
      if (response?.status == 200) {
        if (step == 2) {
          setOpen(false);
        }
        toast.success(response?.data?.message || "Success", {
          duration: 5000,
          description: step == 2 ? "Login to continue" : "",
        });
        setStep((prev) => Math.min(prev + 1, 2));
      }
    } catch (error: any) {
      console.log(error);
      const message = error?.response?.data?.message;
      if (message) {
        setError("root", { type: "manual", message });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleDialogClose = (e: boolean) => {
    setOpen(e);
    if (e) return;
    reset();
    setStep(0);
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogClose}>
      <DialogTrigger asChild>
        <button className="ml-auto text-sm underline-offset-4 cursor-pointer hover:underline">
          Forgot your password?
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Reset your password</DialogTitle>
          <DialogDescription>
            Follow the steps below to verify your identity and create a new
            password.
          </DialogDescription>
        </DialogHeader>
        <FieldSet disabled={loading}>
          <FieldGroup>
            {step === 0 && (
              <>
                <Field>
                  <Label htmlFor="email">
                    Enter the email linked to your account
                  </Label>
                  <Input id="email" {...register("email")} />
                </Field>
                {errors.email && <FieldError errors={[errors.email]} />}
              </>
            )}
            {step === 1 && (
              <>
                <Field>
                  <Label htmlFor="digits-only">
                    Enter the 6-digit code we sent to your email
                  </Label>
                  <div className="w-full flex justify-center my-4">
                    <Controller
                      name="otp"
                      control={control}
                      render={({ field }) => (
                        <InputOTP
                          maxLength={6}
                          pattern={REGEXP_ONLY_DIGITS}
                          value={field.value}
                          onChange={field.onChange}
                        >
                          <InputOTPGroup>
                            <InputOTPSlot
                              index={0}
                              className="w-12 h-12 text-2xl"
                            />
                            <InputOTPSlot
                              index={1}
                              className="w-12 h-12 text-2xl"
                            />
                            <InputOTPSlot
                              index={2}
                              className="w-12 h-12 text-2xl"
                            />
                          </InputOTPGroup>

                          <InputOTPSeparator />

                          <InputOTPGroup>
                            <InputOTPSlot
                              index={3}
                              className="w-12 h-12 text-2xl"
                            />
                            <InputOTPSlot
                              index={4}
                              className="w-12 h-12 text-2xl"
                            />
                            <InputOTPSlot
                              index={5}
                              className="w-12 h-12 text-2xl"
                            />
                          </InputOTPGroup>
                        </InputOTP>
                      )}
                    />
                  </div>
                </Field>
                {errors.otp && <FieldError errors={[errors.otp]} />}
              </>
            )}
            {step === 2 && (
              <>
                <Field>
                  <Label htmlFor="password">New Password</Label>
                  <Input
                    id="password"
                    type="password"
                    className="bg-background"
                    {...register("password")}
                  />
                  <FieldDescription>
                    Must be at least 8 characters long.
                  </FieldDescription>
                  {errors.password && <FieldError errors={[errors.password]} />}
                </Field>
                <Field>
                  <Label htmlFor="confirm-password">Confirm New Password</Label>
                  <Input
                    id="confirm-password"
                    type="password"
                    className="bg-background"
                    {...register("confirmPassword")}
                  />
                  <FieldDescription>
                    Please confirm your password.
                  </FieldDescription>
                  {errors.confirmPassword && (
                    <FieldError errors={[errors.confirmPassword]} />
                  )}
                </Field>
              </>
            )}
          </FieldGroup>
        </FieldSet>
        {errors.root && <FieldError errors={[errors.root]} />}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleNext}>
            {loading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : step == 2 ? (
              "Submit"
            ) : (
              "Next"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ForgotPassword;
