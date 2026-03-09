import { createUser, getUser } from "@/service/user.service.js";
import { GoogleUserType } from "@workspace/types";
import dotenv from "dotenv";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
dotenv.config({
  path: "../../.env",
});

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET) {
  throw new Error("Missing Google OAuth credentials");
}

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL}/api/auth/google/callback`,
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      let userExists = await getUser({
        email: profile["emails"]?.[0].value as string,
      });
      if (!userExists) {
        userExists = await createUser(profile as GoogleUserType);
      }
      return done(null, { ...profile, userExists });
    },
  ),
);
