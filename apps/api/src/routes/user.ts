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
import { authMiddleware } from "@/middleware";

const authRouter = express.Router();

authRouter.post("/signup", signupController);
authRouter.post("/signin", signinController);
authRouter.post("/otp", otpGenerateController);
authRouter.post("/otp/verify", otpVerifyController);
authRouter.post("/reset-password", resetPasswordController);
authRouter.get("/refresh-token", refreshTokenController);
authRouter.get("/logout", logoutController);
authRouter.delete("/delete", authMiddleware, deleteUserController);

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
  authMiddleware,
  sendVerificationLinkController,
);
authRouter.get("/verify-email-token/:token", verifyEmailTokenController);

authRouter.get("/:id", getUserController);
authRouter.patch("/:id", authMiddleware, updateUserController);

export { authRouter };
