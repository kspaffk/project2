var passport = require("passport");

// Twitter strategy used by passport
var TwitterStrategy = require("passport-twitter").Strategy;
module.exports = function() {
  passport.use(new TwitterStrategy( {
    consumerKey: 'aPzAyfZnwp0cTTQNYfMBMM5U8',
    consumerSecret: 'j8zY7ITIRQ9IhNiUe2649UDs3163kihvujEW9qsGWxNVpf6pZH',
    callbackURL: 'http://127.0.0.1:3000/twitter/callback',
    passReqToCallback: true
  },
  function(req, token, tokenSecret, profile, done) {
    var user = {};

    // twitter does not allow you to have email if it exits
    // user.email = profile.emails[0].value;
    user.image = profile._json.image.url;
    user.displayName = profile.displayName;

    user.twitter = {};
    user.twitter.id = profile.id;
    user.twitter.token = accessToken;

    console.log(profile);
    done(null, user);
 }))
};