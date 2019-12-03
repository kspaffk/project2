var express = require("express");
var router = express.Router();

// GET users listing and pass back to users.handlebars
router.get("/", function(req, res) {
  res.render("../views/users.handlebars", 
    {name: {req.user.displayName,
     image: req.user._json.image.url}});
});

module.exports = router;