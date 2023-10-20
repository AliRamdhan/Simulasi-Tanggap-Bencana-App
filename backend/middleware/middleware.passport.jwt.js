// passport.js
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../components/model/model.user"); // Your user model

// Configure Passport.js
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret_key", // Replace with your actual secret key
};

passport.use(
  new JwtStrategy(jwtOptions, async (payload, done) => {
    // console.log("JWT Payload:", payload); // Check the payload received
    try {
      const user = await User.findById(payload._id);
      //   console.log("User Found:", user); // Check if a user was found

      if (!user) {
        return done(null, false);
      }

      return done(null, user);
    } catch (error) {
      console.error("Error:", error); // Check for any errors
      return done(error, false);
    }
  })
);

module.exports = passport;
