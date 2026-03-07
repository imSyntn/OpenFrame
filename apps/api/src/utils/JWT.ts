import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config({
  path: "../../.env",
});

export const generateAccessToken = (user: any) => {
  console.log(user);
  return jwt.sign(
    {
      email: user.email,
      name: user.name,
    },
    process.env.JWT_ACCESS_SECRET!,
    { expiresIn: "15m" },
  );
};

export const generateRefreshToken = (user: any) => {
  return jwt.sign(
    {
      email: user.email,
    },
    process.env.JWT_REFRESH_SECRET!,
    { expiresIn: "7d" },
  );
};
