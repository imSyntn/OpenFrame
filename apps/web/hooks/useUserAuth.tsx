import {
  userChangePassword,
  userLogin,
  userOTPGenerate,
  userOTPVerify,
  userRefreshToken,
  userSignup,
} from "@/lib/apis";
import { useMutation, useQuery } from "@tanstack/react-query";
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
export const useRefreshToken = () => {
  return useQuery({
    queryKey: ["refresh-token"],
    queryFn: () => userRefreshToken(),
    retry: false,
  });
};
