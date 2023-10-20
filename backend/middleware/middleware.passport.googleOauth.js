const passport = require("passport");
require("dotenv").config();
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../components/model/model.user");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_CLIENT_CALLBACKURL = process.env.GOOGLE_CLIENT_CALLBACKURL;

const findOrCreateUser = async (accessToken, refreshToken, profile) => {
  try {
    const user = await User.findOne({ googleId: profile.id });

    if (user) {
      console.log(user);
      return user;
    } else {
      const newUser = await User.create({
        googleId: profile.id,
        username: profile.displayName,
        email: profile.emails[0].value, // Email address
      });
      return newUser;
    }
  } catch (err) {
    throw err; // Handle the error appropriately in your application
  }
};

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: GOOGLE_CLIENT_CALLBACKURL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const user = await findOrCreateUser(accessToken, refreshToken, profile);
        done(null, user);
      } catch (err) {
        done(err, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  // Serialize the user's ID to store in the session
  done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
