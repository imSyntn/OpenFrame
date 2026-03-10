import { UserLoginType, UserTypeUnregistered } from "@workspace/types";
import { api } from "../axios";

export const userSignup = (data: UserTypeUnregistered) => {
  return api.post("/api/auth/signup", data);
};
export const userLogin = (data: UserLoginType) => {
  return api.post("/api/auth/signin", data);
};
export const userLogout = () => {
  return api.get("/api/auth/logout");
};
export const userOTPGenerate = (data: { email: string }) => {
  return api.post("/api/auth/otp", data);
};
export const userOTPVerify = (data: { email: string; otp: string }) => {
  return api.post("/api/auth/otp/verify", data);
};
export const userChangePassword = (data: {
  email: string;
  password: string;
}) => {
  return api.post("/api/auth/reset-password", data);
};
