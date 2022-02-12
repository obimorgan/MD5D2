/** @format */

import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import usersSchema from "../users/usersSchema.js";
import { JWTAuthentication } from "./JWTAuthentication.js";

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_OAUTH_ID,
    clientSecret: process.env.GOOGLE_OAUTH_SECRET,
    callbackURL: `${process.env.API_URL}/users/googleRedirect`,
  },
  async (accessToken, refreshToken, profile, passportNext) => {
    try {
      // this callback is executed when Google gives us a successfull response
      // here we are receiving some informations about the user from Google (profile, email)
      // console.log("PROFILE: ", profile);

      // 1. Check if the user is already in our db
      const user = await usersSchema.findOne({ googleId: profile.id });

      if (user) {
        // 2. If the user is already there --> create some tokens for him/her
        const tokens = await JWTAuthentication(user);
        // 3. Next
        passportNext(null, { tokens }); // passportNext attaches tokens to req.user --> req.user.tokens
      } else {
        // 4. If user is not in db --> add user to db and then create some tokens for him/her
        const newUser = new usersSchema({
          first_name: profile.name.givenName,
          last_name: profile.name.familyName,
          email: profile.emails[0].value,
          googleId: profile.id,
        });

        const savedUser = await newUser.save();
        const tokens = await JWTAuthentication(savedUser);
        // 5. Next
        passportNext(null, { tokens });
      }
    } catch (error) {
      passportNext(error);
    }
  }
);

passport.serializeUser(function (data, passportNext) {
  // if you don't have this function, passport will trigerr a "failed to serialize" error
  passportNext(null, data);
});

export default googleStrategy;
