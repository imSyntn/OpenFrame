import jwt from "jsonwebtoken";
import { UserType } from "@workspace/types";
import "@workspace/lib/env";

type accessTokenPayload = Pick<UserType, "email" | "name" | "id">;
type refreshTokenPayload = Pick<UserType, "email" | "id">;
type verificationTokenPayload = { email: string; otp: string };

export const generateAccessToken = (user: accessTokenPayload) => {
  const { email, name, id } = user;
  return jwt.sign(
    {
      email,
      name,
      id,
    },
    process.env.JWT_ACCESS_SECRET!,
    { expiresIn: "15m" },
  );
};

export const generateVerificationToken = (user: verificationTokenPayload) => {
  const { email, otp } = user;
  return jwt.sign(
    {
      email,
      otp,
    },
    process.env.JWT_VERIFICATION_SECRET!,
    { expiresIn: "10m" },
  );
};

export const verifyVerificationToken = (token: string) => {
  return jwt.verify(
    token,
    process.env.JWT_VERIFICATION_SECRET!,
  ) as verificationTokenPayload;
};

export const accessTokenVerify = (token: string) => {
  return jwt.verify(
    token,
    process.env.JWT_ACCESS_SECRET!,
  ) as accessTokenPayload;
};

export const refreshTokenVerify = (token: string) => {
  return jwt.verify(
    token,
    process.env.JWT_REFRESH_SECRET!,
  ) as refreshTokenPayload;
};

export const generateRefreshToken = (user: refreshTokenPayload) => {
  const { email, id } = user;
  return jwt.sign(
    {
      email,
      id,
    },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: "7d" },
  );
};
