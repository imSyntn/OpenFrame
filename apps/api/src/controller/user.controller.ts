import { NextFunction, Request, Response } from "express";
import {
  GoogleUserType,
  UserTypeDB,
  UserTypeUnregistered,
} from "@workspace/types";
import { generateAccessToken, generateRefreshToken } from "../utils";
import { userSigninSchema, userSignupSchema } from "@/schema";
import { ErrorWithStatus } from "@/middleware";
import { createUser, getUser } from "@/service";
import bcrypt from "bcryptjs";

export const googleAuthController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      return next(new ErrorWithStatus(400, "Authentication failed"));
    }

    const profile = req.user as GoogleUserType;
    const { name, email } = profile._json;

    type existingUser = typeof req.user & { userExists: UserTypeDB };

    const { userExists } = req.user as existingUser;

    const accessToken = generateAccessToken({ name, email, id: userExists.id });
    const refreshToken = generateRefreshToken({ email, id: userExists.id });

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 1000 * 60 * 15,
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.redirect(
      `http://localhost:3000?id=${userExists.id}&name=${userExists.name}&email=${userExists.email}&avatar=${userExists.avatar}`,
    );
  } catch (error) {
    next(error);
  }
};

export const signinController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;

  const user = userSigninSchema.parse({ email, password });

  const userExists = await getUser({ email: user.email });
  if (!userExists) {
    return next(new ErrorWithStatus(400, "User doesn't exist"));
  }

  const isPasswordValid = await bcrypt.compare(
    password,
    userExists.password as string,
  );

  if (!isPasswordValid) {
    return next(new ErrorWithStatus(400, "Wrong email or password"));
  }

  const accessToken = generateAccessToken({
    name: userExists.name,
    email: userExists.email,
    id: userExists.id,
  });
  const refreshToken = generateRefreshToken({
    email: userExists.email,
    id: userExists.id,
  });

  res.cookie("access_token", accessToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 1000 * 60 * 15,
  });

  res.cookie("refresh_token", refreshToken, {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  });

  return res.status(200).json({
    message: "User logged in.",
    data: {
      name: userExists.name,
      avatar: userExists.avatar,
      email,
      id: userExists.id,
    },
  });
};

export const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password } = req.body;

    const user = userSignupSchema.parse({ name, email, password });

    const userExists = await getUser({ email: user.email });
    if (userExists) {
      return next(new ErrorWithStatus(400, "User already exists"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await createUser({
      ...user,
      password: hashedPassword,
    } as UserTypeUnregistered);

    const accessToken = generateAccessToken({ name, email, id: newUser.id });
    const refreshToken = generateRefreshToken({ email, id: newUser.id });

    res.cookie("access_token", accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 1000 * 60 * 15,
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: false,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.status(201).json({
      message: "User created successfully",
      data: { name, email, avatar: newUser.avatar, id: newUser.id },
    });
  } catch (error) {
    next(error);
  }
};
