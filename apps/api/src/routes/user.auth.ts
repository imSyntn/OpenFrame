import express from "express";
import passport from "passport";
import {
  googleAuthController,
  signinController,
  signupController,
} from "@/controller";

const authRouter = express.Router();

authRouter.post("/signup", signupController);
authRouter.post("/signin", signinController);

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
    failureRedirect: "http://localhost:3000/signup?error=Authentication failed",
    session: false,
  }),
  googleAuthController,
);

authRouter.get("/me", (req, res) => {
  res.json(req.user);
});

authRouter.post("/logout", (req, res) => {
  req.logout(() => {
    res.sendStatus(200);
  });
});

export { authRouter };
