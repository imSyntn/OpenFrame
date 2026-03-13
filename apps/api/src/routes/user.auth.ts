import express from "express";
import passport from "passport";
import {
  getUserController,
  googleAuthController,
  logoutController,
  otpGenerateController,
  otpVerifyController,
  refreshTokenController,
  resetPasswordController,
  signinController,
  signupController,
  updateUserController,
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

authRouter.get("/refresh-token", refreshTokenController);
authRouter.get("/:id", getUserController);
authRouter.patch("/:id", authMiddleware, updateUserController);

authRouter.get("/logout", logoutController);

export { authRouter };
