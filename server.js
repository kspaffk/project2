require("dotenv").config();

var app = require('./app');
var PORT = process.env.PORT || 3000;

// Server spins up and hands to apps.js
var server = app.listen(PORT, function() {
  console.log("Server listening on port: " + PORT);
});
