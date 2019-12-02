require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var passport = require("passport");
var session = require('express-session');
var db = require("./models");
var auth = require('./auth');

var app = express();

var PORT = process.env.PORT || 3000;

// Set up Google OAuth
var GoogleStrategy = ('passport-google-oauth').OAuth2Strategy;

// Middleware
passport.use(new GoogleStrategy({
  clientID: '915481890439-v5lfe6idpujd9toa27cd35fongdgb9rg.apps.googleusercontent.com',
  clientSecret: 'tpWX1-7SmwKTmSVMaY_PMjc6',
  callbackURL: 'http://localhost:3000/auth/google/callback'},
  function(req, accessToken, refreshToken, profile, done) {
    done(null, profile);
  }
));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));
app.use(session({secret: 'anything'}));

// Pull in passport middleware to set up framework
app.use(passport.initialize());
app.use(passport.session());
// Passport uses to place into the session
passport.serializeUser(function(empId, done) {
  done(null, empId);
});
// Passport uses to pull from session
passport.deserializeUser(function(empId, done) {
  user.findById(id);
  done(null, empId);
});

app.use('auth', auth);

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
