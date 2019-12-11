require("dotenv").config();
var passport = require("passport");
var models = require("../../models");

// Google strategy used by passport
var GoogleStrategy = require("passport-google-oauth").OAuth2Strategy;

module.exports = function() {
  // Middleware
  // Strategy JSON tokens letting google know how we are as an app to authenticate user
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOG_CLIENTID,
        clientSecret: process.env.GOOG_CLIENTSECRET,
        callbackURL: process.env.GOOG_CBURL
      },
      // Called when google returns profile data back to the callback URL
      function(req, accessToken, refreshToken, profile, done) {
        models.User.findOrCreate({
          where: {
            email: profile.emails[0].value,
            lastName: profile.name.familyName,
            firstName: profile.name.givenName
          }
        })
          .spread(function(dbUser, wasCreated) {
            console.log(`USER ADDED TO DB created = true: ${wasCreated}`);

            done(null, dbUser);
          })
          .catch(function(error) {
            done(error);
          });
      }
    )
  );
};