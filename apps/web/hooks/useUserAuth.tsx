import {
  userChangePassword,
  userLogin,
  userLogout,
  userOTPGenerate,
  userOTPVerify,
  userRefreshToken,
  userSendVerificationLink,
  userSignup,
  userVerifyEmailToken,
} from "@/lib/apis";
import { useUserStore } from "@/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { UserLoginType, UserTypeUnregistered } from "@workspace/types";
import { toast } from "sonner";

export const useSignUp = () => {
  return useMutation({
    mutationFn: (data: UserTypeUnregistered) => userSignup(data),
  });
};

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: UserLoginType) => userLogin(data),
    onSuccess: () => {
      toast.dismiss();
      toast.success("Logged in successfully", {
        description: "You are being redirected.",
      });
    },
  });
};

export const useLogout = () => {
  return useMutation({
    mutationFn: () => userLogout(),
    onSuccess: () => {
      toast.dismiss();
      toast.success("Logged out successfully", {
        description: "You are being redirected.",
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    },
    onError: (error: any) => {
      toast.dismiss();
      toast.error("Logout failed", {
        description: error?.response?.data?.message || "Something went wrong",
      });
    },
  });
};

export const useOTPGenerate = () => {
  return useMutation({
    mutationFn: (data: { email: string }) => userOTPGenerate(data),
  });
};

export const useOTPVerify = () => {
  return useMutation({
    mutationFn: (data: { email: string; otp: string }) => userOTPVerify(data),
  });
};

export const useChangePassword = () => {
  return useMutation({
    mutationFn: (data: { email: string; password: string }) =>
      userChangePassword(data),
  });
};

export const useRefreshToken = () => {
  return useQuery({
    queryKey: ["refresh-token"],
    queryFn: () => userRefreshToken(),
    retry: false,
  });
};

export const useSendVerificationLink = () => {
  return useMutation({
    mutationFn: ({ email }: { email: string }) =>
      userSendVerificationLink(email),
  });
};

export const useVerifyEmailToken = (token: string) => {
  return useQuery({
    queryKey: ["verify-email-token", token],
    queryFn: () => userVerifyEmailToken(token),
    retry: 1,
  });
};
