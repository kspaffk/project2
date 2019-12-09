var passport = require("passport");

module.exports = function(app) {
  // Pull in passport middleware to set up framework that it needs
  app.use(passport.initialize());
  app.use(passport.session());

  // Passport uses to place into the session
  passport.serializeUser(function(user, done) {
    console.log(`DONE DONE DONE SERIALIZE USER`)
    done(null, user);
  });
  // Passport uses to pull from session
  passport.deserializeUser(function(user, done) {
    //user.findById(empId);
    done(null, user);
  });

  require("./strategies/googleStrategy")();

  // require("./strategies/twitterStrategy")();
};
