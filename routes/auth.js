var express = require("express");
var passport = require("passport");
var router = express.Router();

router.route("/google/callback")
// Tell passport to use google strategy (JSON passed in) go to users route
  .get(passport.authenticate("google", {
    successRedirect: "/users/",
    failure: "/error/"
  }));

  // Route used to sign in with google to begin with (sign in with google icon)
  /* URL call with <a> tag in index.handlebars
  scope is specific to google strategy. It turns on the APIs telling it what this app
  actually wants. Also checks if enabled */
router.route("/google")
  .get(passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/userinfo.profile",
  "https://www.googleapis.com/auth/userinfo.email"]
}));

module.exports = router;
