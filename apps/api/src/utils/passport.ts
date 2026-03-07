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

//initialize
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:4000/api/auth/google/callback",
      passReqToCallback: true,
    },
    async function (request, accessToken, refreshToken, profile, done) {
      // you can write some algorithms here based on your application models and all
      // an example - not related to this application

      /*
   const exist = await User.findOne({ email: profile["emails"][0].value });
   if (!exist) {
        await User.create({
        email: profile["emails"][0].value,
          fullName: profile["displayName"],
          avatar: profile["photos"][0].value,
          username: profile["name"]["givenName"],
          verified: true,
        });
      }
    const user = await User.findOne({ email: profile["emails"][0].value });
 return done(null, user);
*/
      return done(null, profile);
    },
  ),
);
