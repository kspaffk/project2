var passport = require("passport");
var models = require("../../models");
var moment = require('moment');
var date = moment();

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

      // insertUser(profile, function(dbUser, wasCreated) {
      //   console.log(dbUser);
      var insertUser = function(profile, cb) {
        models.User.findOrCreate({ where: {email: profile.email, lastName: profile.name.familyName, firstName: profile.name.givenName, createdAt: date }})
          .spread(function(dbUser, wasCreated) {
            console.log(dbUser);
            cb(dbUser, wasCreated);
          })
          .catch(function(error) {
            var wasCreated = false;
            cb(error);
          });
          // console.log(profile);
      // done(error, user);
        } 
        insertUser(profile, function(dbUser, wasCreated) {
          console.log("THIS IS RUNNING");
          done(wasCreated, dbUser);
        });
    }
  ));
};