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
  generateVerificationToken,
  refreshTokenVerify,
  verifyVerificationToken,
} from "../utils";
import {
  emailSchema,
  signinSchema,
  signupSchema,
} from "@workspace/schema/auth";
import { ErrorWithStatus } from "@/middleware";
import {
  createUser,
  deleteUser,
  generateEmailTemplate,
  getUser,
  sendEmail,
  updateUser,
} from "@/service";
import bcrypt from "bcryptjs";
import { OTP_VALIDATION_TIME_LIMIT } from "@workspace/constants";
import { otpStore } from "@/lib";
import { Prisma } from "@workspace/lib";

const isProduction = process.env.NODE_ENV === "production";

export const googleAuthController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      return next(new ErrorWithStatus(400, "Authentication failed"));
    }

    const profile = req.user as UserTypeDB;
    const { name, email, id, avatar } = profile;

    const accessToken = generateAccessToken({ name, email, id });
    const refreshToken = generateRefreshToken({ email, id });

    // res.cookie("access_token", accessToken, {
    //   httpOnly: true,
    //   sameSite: "lax",
    //   secure: false,
    //   maxAge: 1000 * 60 * 15,
    // });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: isProduction,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.redirect(
      `${process.env.FRONTEND_URL}?id=${id}&name=${name}&email=${email}&avatar=${avatar}&accessToken=${accessToken}`,
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
  try {
    const { email, password } = req.body;

    const user = signinSchema.parse({ email, password });

    const userExists = await getUser({ email: user.email }, "auth");
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

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: isProduction,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.status(200).json({
      message: "User logged in.",
      data: {
        name: userExists.name,
        avatar: userExists.avatar,
        email,
        id: userExists.id,
        accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signupController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    const user = signupSchema.parse({
      name,
      email,
      password,
      confirmPassword,
    });

    const userExists = await getUser({ email: user.email }, "auth");
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

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      secure: isProduction,
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return res.status(201).json({
      message: "User created successfully",
      data: {
        name,
        email,
        avatar: newUser.avatar,
        id: newUser.id,
        accessToken,
      },
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

    const emailData = emailSchema.parse(email);

    const userExist = await getUser({ email: emailData }, "auth");
    if (!userExist) {
      return next(new ErrorWithStatus(404, "User not found"));
    }

    const otp = generateOtp();

    await otpStore.set(emailData, otp, "EX", OTP_VALIDATION_TIME_LIMIT * 60);

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

    const emailData = emailSchema.parse(email);

    const generatedOtp = await otpStore.get(emailData);

    if (!generatedOtp || generatedOtp !== otp) {
      return next(new ErrorWithStatus(400, "Invalid OTP"));
    }

    await otpStore.set(
      email,
      "otpVerified",
      "EX",
      OTP_VALIDATION_TIME_LIMIT * 60,
    );

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

    const user = signinSchema.parse({ email, password });

    const emailOtpVerified = await otpStore.get(email);

    if (!emailOtpVerified || emailOtpVerified !== "otpVerified") {
      return next(new ErrorWithStatus(400, "OTP not verified"));
    }

    const userExist = await getUser({ email: user.email }, "auth");
    if (!userExist) {
      return next(new ErrorWithStatus(404, "User not found"));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await updateUser({ email }, { password: hashedPassword });

    res.clearCookie("access_token");
    res.clearCookie("refresh_token");

    return res.status(200).json({
      message: "Password reset successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;

    if (!id) {
      return next(new ErrorWithStatus(400, "User ID is required"));
    }

    const include: Prisma.UserInclude = {
      _count: {
        select: {
          pictures: true,
          collection: true,
          likes: true,
        },
      },
      links: true,
      metrics: true,
    };
    const exclude = {
      google_id: true,
      password: true,
    };

    const user = await getUser({ id }, "profile", include, exclude);

    if (!user) {
      return next(new ErrorWithStatus(404, "User not found"));
    }

    return res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
};

export const updateUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id as string;
    const { id: tokenID } = req.user as UserTypeDB;

    if (!id) {
      return next(new ErrorWithStatus(400, "User ID is required"));
    }

    if (id !== tokenID) {
      return next(
        new ErrorWithStatus(
          403,
          "You are not authorized to perform this action.",
        ),
      );
    }

    const include: Prisma.UserInclude = {
      _count: {
        select: {
          pictures: true,
          collection: true,
          likes: true,
        },
      },
      links: true,
      metrics: true,
    };
    const exclude = {
      google_id: true,
      password: true,
    };

    const user = await updateUser({ id }, req.body, include, exclude);

    return res.status(200).json({ data: user });
  } catch (error) {
    next(error);
  }
};

export const deleteUserController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.user as UserTypeDB;

    if (!id) {
      return next(
        new ErrorWithStatus(
          403,
          "You are not authorized to perform this action.",
        ),
      );
    }

    await deleteUser(id);

    res.clearCookie("access_token");
    res.clearCookie("refresh_token");

    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const refreshTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies["refresh_token"];

    if (!token) {
      return next(new ErrorWithStatus(401, "You are not logged in."));
    }

    const decoded = refreshTokenVerify(token);

    const user = await getUser({ id: decoded.id }, "auth");
    if (!user) {
      return next(new ErrorWithStatus(404, "User not found"));
    }

    const accessToken = generateAccessToken({
      name: user.name,
      email: user.email,
      id: user.id,
    });

    return res.status(200).json({
      data: {
        name: user.name,
        avatar: user.avatar,
        email: user.email,
        id: user.id,
        accessToken,
      },
    });
  } catch (error) {
    return next(error);
  }
};

export const sendVerificationLinkController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { email } = req.body;

    const user = await getUser({ email }, "auth");
    if (!user) {
      return next(new ErrorWithStatus(404, "User not found"));
    }

    const otp = generateOtp();
    await otpStore.set(email, otp, "EX", OTP_VALIDATION_TIME_LIMIT * 60);

    const verificationToken = generateVerificationToken({ email, otp });
    const template = generateEmailTemplate({
      type: "email-verification",
      data: {
        name: user.name,
        verificationUrl: `${process.env.FRONTEND_URL}/verify-email?token=${verificationToken}`,
        duration: OTP_VALIDATION_TIME_LIMIT.toString(),
      },
    });
    const emailSent = await sendEmail(email, "Email Verification", template);
    if (!emailSent) {
      return next(new ErrorWithStatus(500, "Failed to send email"));
    }
    return res.status(200).json({
      message: "Email verification link sent successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const verifyEmailTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { token } = req.params;

    if (!token) {
      return next(new ErrorWithStatus(400, "Token is required"));
    }

    const { email, otp } = verifyVerificationToken(token as string);

    const generatedOtp = await otpStore.get(email);
    if (!generatedOtp || generatedOtp !== otp) {
      return next(new ErrorWithStatus(400, "Invalid OTP"));
    }

    await otpStore.del(email);

    await updateUser({ email }, { is_verified: true });
    return res.status(200).json({
      message: "Email verified successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const logoutController = async (req: Request, res: Response) => {
  console.log("Controller called");
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");

  return res.status(200).json({
    message: "Logged out successfully",
  });
};
