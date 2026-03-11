import { NextFunction, Request, Response } from "express";
import {
  GoogleUserType,
  UserTypeDB,
  UserTypeUnregistered,
} from "@workspace/types";
import {
  generateAccessToken,
  generateOtp,
  generateRefreshToken,
} from "../utils";
import { userSigninSchema, userSignupSchema } from "@/schema";
import { ErrorWithStatus } from "@/middleware";
import {
  createUser,
  generateEmailTemplate,
  getUser,
  sendEmail,
  updateUser,
} from "@/service";
import bcrypt from "bcryptjs";
import {
  EMAIL_MAX_CHAR_LIMIT,
  OTP_VALIDATION_TIME_LIMIT,
} from "@workspace/constants";
import { otpStore } from "@/db";

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
      `${process.env.FRONTEND_URL}?id=${userExists.id}&name=${userExists.name}&email=${userExists.email}&avatar=${userExists.avatar}`,
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
      return next(new ErrorWithStatus(409, "User already exists"));
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

export const otpGenerateController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.body;

    if (!email || email.length > EMAIL_MAX_CHAR_LIMIT) {
      return next(new ErrorWithStatus(400, "Invalid email"));
    }

    const userExist = await getUser({ email });
    if (!userExist) {
      return next(new ErrorWithStatus(404, "User not found"));
    }

    const otp = generateOtp();

    await otpStore.set(email, otp, "EX", OTP_VALIDATION_TIME_LIMIT);

    const template = generateEmailTemplate({
      type: "otp",
      data: {
        name: userExist.name,
        otp,
        duration: OTP_VALIDATION_TIME_LIMIT.toString(),
      },
    });

    const emailSent = await sendEmail(email, "OTP Verification", template);

    if (!emailSent) {
      return next(new ErrorWithStatus(500, "Failed to send email"));
    }

    return res.status(200).json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const otpVerifyController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, otp } = req.body;

    if (!email || email.length > EMAIL_MAX_CHAR_LIMIT) {
      return next(new ErrorWithStatus(400, "Invalid email"));
    }

    const generatedOtp = await otpStore.get(email);

    if (!generatedOtp || generatedOtp !== otp) {
      return next(new ErrorWithStatus(400, "Invalid OTP"));
    }

    await otpStore.set(email, "otpVerified", "EX", OTP_VALIDATION_TIME_LIMIT);

    return res.status(200).json({
      message: "OTP verified successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const resetPasswordController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email, password } = req.body;

    const user = userSigninSchema.parse({ email, password });

    const emailOtpVerified = await otpStore.get(email);

    if (!emailOtpVerified || emailOtpVerified !== "otpVerified") {
      return next(new ErrorWithStatus(400, "OTP not verified"));
    }

    const userExist = await getUser({ email: user.email });
    if (!userExist) {
      return next(new ErrorWithStatus(404, "User not found"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await updateUser({
      where: { email },
      data: { password: hashedPassword },
    });

    res.clearCookie("access_token");
    res.clearCookie("refresh_token");

    return res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const meController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.user as UserTypeDB;
    const user = await getUser(
      { id },
      {
        pictures: true,
        _count: true,
        collection: true,
        followers: true,
        following: true,
        likes: true,
        Links: true,
        metrics: true,
      },
      {
        google_id: true,
        password: true,
      },
    );

    return res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
};

export const logoutController = async (req: Request, res: Response) => {
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");

  return res.status(200).json({
    message: "Logged out successfully",
  });
};
