import express from "express";
import passport from "passport";
import {
  deleteUserController,
  getUserController,
  googleAuthController,
  logoutController,
  otpGenerateController,
  otpVerifyController,
  refreshTokenController,
  resetPasswordController,
  sendVerificationLinkController,
  signinController,
  signupController,
  updateUserController,
  verifyEmailTokenController,
} from "@/controller";
import { authLimiter } from "@/middleware";

const authRouter = express.Router();

authRouter.post("/signup", authLimiter, signupController);
authRouter.post("/signin", authLimiter, signinController);
authRouter.post("/otp", authLimiter, otpGenerateController);
authRouter.post("/otp/verify", authLimiter, otpVerifyController);
authRouter.post("/reset-password", authLimiter, resetPasswordController);
authRouter.get("/refresh-token", authLimiter, refreshTokenController);
authRouter.get("/logout", authLimiter, logoutController);
authRouter.delete("/delete", authLimiter, deleteUserController);

authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["email", "profile"],
    accessType: "offline",
    prompt: "consent",
  }),
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.FRONTEND_URL}/signup?error=Authentication failed`,
    session: false,
  }),
  googleAuthController,
);

authRouter.post(
  "/send-verification-link",
  authLimiter,
  sendVerificationLinkController,
);
authRouter.get(
  "/verify-email-token/:token",
  authLimiter,
  verifyEmailTokenController,
);

authRouter.get("/:id", getUserController);
authRouter.patch("/:id", authLimiter, updateUserController);

export { authRouter };
