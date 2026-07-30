import {
  ApiKeyType,
  UserLoginType,
  UserTypeUnregistered,
} from "@workspace/types";
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

export const userRefreshToken = async () => {
  const res = await api.get("/api/user/refresh-token");
  return res.data.data;
};

export const userSendVerificationLink = async (email: string) => {
  const res = await api.post("/api/user/send-verification-link", { email });
  return res.data.message;
};

export const userVerifyEmailToken = async (token: string) => {
  const res = await api.get(`/api/user/verify-email-token/${token}`);
  return res.data.message;
};

export const userGenerateApiKey = async (
  name: string,
): Promise<{ data: { apiKey: ApiKeyType }; message: string }> => {
  const res = await api.post(`/api/user/api-keys`, { name });
  return res.data;
};

export const userGetApiKeys = async (): Promise<{
  data: { keys: ApiKeyType[] | [] };
}> => {
  const res = await api.get(`/api/user/api-keys`);
  return res.data;
};

export const userDisableApiKey = async (
  id: number,
): Promise<{ message: string }> => {
  const res = await api.patch(`/api/user/api-keys/${id}`);
  return res.data;
};
