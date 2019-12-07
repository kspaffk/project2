var passport = require("passport");

// create the following strategy pages
// var LocalStrategy    = require('passport-local').Strategy;
// var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(app) {
// Pull in passport middleware to set up framework that it needs
app.use(passport.initialize());
app.use(passport.session());

// Passport uses to place into the session
passport.serializeUser(function(user, done) {
  done(null, user);
});
// Passport uses to pull from session
passport.deserializeUser(function(user, done) {
  // user.findById(empId);
  done(null, user);
});

require("./strategies/google.strategy")();

require("./strategies/twitter.strategy")();
};