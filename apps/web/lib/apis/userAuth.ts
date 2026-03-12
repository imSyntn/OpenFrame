import { UserLoginType, UserTypeUnregistered } from "@workspace/types";
import { api } from "../axios";

export const userSignup = (data: UserTypeUnregistered) => {
  return api.post("/api/user/signup", data);
};
export const userLogin = (data: UserLoginType) => {
  return api.post("/api/user/signin", data);
};
export const userLogout = () => {
  return api.get("/api/user/logout");
};
export const userOTPGenerate = (data: { email: string }) => {
  return api.post("/api/user/otp", data);
};
export const userOTPVerify = (data: { email: string; otp: string }) => {
  return api.post("/api/user/otp/verify", data);
};
export const userChangePassword = (data: {
  email: string;
  password: string;
}) => {
  return api.post("/api/user/reset-password", data);
};
