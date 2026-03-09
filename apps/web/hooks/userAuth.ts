import {
  userChangePassword,
  userLogin,
  userOTPGenerate,
  userOTPVerify,
  userSignup,
} from "@/lib/apis";
import { useMutation } from "@tanstack/react-query";
import { UserLoginType, UserTypeUnregistered } from "@workspace/types";

export const useSignUp = () => {
  return useMutation({
    mutationFn: (data: UserTypeUnregistered) => userSignup(data),
  });
};
export const useLogin = () => {
  return useMutation({
    mutationFn: (data: UserLoginType) => userLogin(data),
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
