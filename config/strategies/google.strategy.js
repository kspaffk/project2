var passport = require("passport");

// Google strategy used by passport
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

module.exports = function() {
  // Middleware
  // Strategy JSON tokens letting google know how we are as an app to authenticate user
  passport.use(new GoogleStrategy( {
        clientID:
          "915481890439-v5lfe6idpujd9toa27cd35fongdgb9rg.apps.googleusercontent.com",
        clientSecret: "tpWX1-7SmwKTmSVMaY_PMjc6",
        callbackURL: "http://localhost:3000/auth/google/callback"
      },
      // Called when google returns profile data back to the callback URL
      function(req, accessToken, refreshToken, profile, done) {
        var user = {};

        user.email = profile.emails[0].value;
        user.image = profile.photos[0].value;
        user.displayName = profile.displayName;

        user.google = {};
        user.google.id = profile.id;
        user.google.token = accessToken;
console.log(profile);
        done(null, user);
      }
  ));
};