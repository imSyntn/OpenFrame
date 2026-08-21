import { UserLoginType, UserTypeUnregistered } from "@workspace/types";
import { api } from "../axios";

export const userSignup = (data: UserTypeUnregistered) => {
  return api.post("/user/signup", data);
};

export const userLogin = (data: UserLoginType) => {
  return api.post("/user/signin", data);
};

export const userLogout = () => {
  return api.get("/user/logout");
};

export const userOTPGenerate = (data: { email: string }) => {
  return api.post("/user/otp", data);
};

export const userOTPVerify = (data: { email: string; otp: string }) => {
  return api.post("/user/otp/verify", data);
};

export const userChangePassword = (data: {
  email: string;
  password: string;
}) => {
  return api.post("/user/reset-password", data);
};

export const userRefreshToken = async () => {
  const res = await api.get("/user/refresh-token");
  return res.data.data;
};

export const userSendVerificationLink = async (email: string) => {
  const res = await api.post("/user/send-verification-link", { email });
  return res.data.message;
};

export const userVerifyEmailToken = async (token: string) => {
  const res = await api.get(`/user/verify-email-token/${token}`);
  return res.data.message;
};
