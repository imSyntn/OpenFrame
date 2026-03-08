import { userLogin, userSignup } from "@/lib/apis";
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
