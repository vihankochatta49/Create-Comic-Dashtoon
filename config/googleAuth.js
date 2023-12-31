const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth2").Strategy;
const User = require("../routes/registerModels");

//passport google strategy
passport.use(
  new GoogleStrategy(
    {
      clientID:
        "****",
      clientSecret: "****",
      callbackURL: ("http://localhost:3000/google/callback"||"https://comic-dashtoon.onrender.com/google/callback"),
      passReqToCallback: true,
    },
    function (request, accessToken, refreshToken, profile, done) {
      User.findOrCreate(
        {
          name: profile.displayName,
          email: profile.email,
          provider: "GOOGLE",
        },
        function (err, user) {
          return done(err, user);
        }
      );
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});
