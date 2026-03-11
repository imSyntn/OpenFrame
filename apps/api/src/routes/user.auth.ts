import express from "express";
import passport from "passport";
import {
  googleAuthController,
  logoutController,
  meController,
  otpGenerateController,
  otpVerifyController,
  resetPasswordController,
  signinController,
  signupController,
} from "@/controller";
import { authMiddleware } from "@/middleware";

const authRouter = express.Router();

authRouter.post("/signup", signupController);
authRouter.post("/signin", signinController);
authRouter.post("/otp", otpGenerateController);
authRouter.post("/otp/verify", otpVerifyController);
authRouter.post("/reset-password", resetPasswordController);

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

authRouter.get("/me", authMiddleware, meController);

authRouter.get("/logout", logoutController);

export { authRouter };
