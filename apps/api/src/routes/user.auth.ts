import express from "express";
import passport from "passport";
import { generateAccessToken, generateRefreshToken } from "../utils/JWT.js";

const authRouter = express.Router();

authRouter.post("/register", (req, res) => {});
authRouter.post("/login", (req, res) => {});

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
  (req, res) => {
    if (!req.user) {
      console.log("Authentication failed");
      return res.status(400).json({ error: "Authentication failed" });
    }

    const profile = req.user as any;

    const accessToken = generateAccessToken(profile);
    const refreshToken = generateRefreshToken(profile);

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

    res.redirect("http://localhost:3000");
  },
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
