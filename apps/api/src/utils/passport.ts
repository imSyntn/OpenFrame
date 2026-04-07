import { createUser, getUser } from "@/service/user.service.js";
import { GoogleUserType } from "@workspace/types";
import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import "@workspace/lib/env";

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
      const googleUser: GoogleUserType = {
        id: profile.id,
        name: profile.displayName,
        email: profile.emails?.[0]?.value || "",
        _json: profile._json as GoogleUserType["_json"],
      };

      let userExists = await getUser(
        {
          email: googleUser.email,
        },
        "auth",
      );
      if (!userExists) {
        userExists = await createUser(googleUser);
      }
      return done(null, userExists);
    },
  ),
);
