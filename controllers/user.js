var models = require("../models");
var moment = require("moment");
var date = moment();

// var insertUser = function(profile, cb) {
//   models.User.findOrCreate({ where: {email: profile.email, lastName: profile.name.familyName, firstName: profile.name.givenName, createdAt: date }})
//     .spread(function(profile, wasCreated) {
//       cb(dbUser, wasCreated);
//     })
//     .catch(function(error) {
//       var wasCreated = false;
//       cb(error);
//     });
//     console.log(profile);
// };

// exports.insertUser = insertUser;