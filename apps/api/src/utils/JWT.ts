import jwt from "jsonwebtoken";
import { UserType } from "@workspace/types";
import dotenv from "dotenv";
dotenv.config({
  path: "../../.env",
});

type accessTokenPayload = Pick<UserType, "email" | "name" | "id">;
type refreshTokenPayload = Pick<UserType, "email" | "id">;

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

export const accessTokenVerify = (token: string) => {
  return jwt.verify(
    token,
    process.env.JWT_ACCESS_SECRET!,
  ) as accessTokenPayload;
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
