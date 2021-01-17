const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const passport = require("passport");
router.use((req, res, next) => {
  // console.log('Request URL:', req.originalUrl)
  next();
});
router.get("/secret/register", (req, res) => {
  res.render("user/register");
});
router.get("/secret/login", (req, res) => {
  if (req.user != null) {
    res.redirect("/");
  } else {
    res.render("user/login");
  }
});
router.post("/secret/register", (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    name: req.body.name,
    username: req.body.username,
  };
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(req.body.password, salt, (err, hash) => {
      newUser.password = hash;
      User.create(newUser).then(user => {
        if (user) {
          res.redirect("/secret/login");
        }
      });
    });
  });
});
router.post("/secret/login", function(req, res, next) {
  passport.authenticate("local", function(err, user, info) {
    if (err) {
      res.json(err);
    }
    if (!user) {
      return res.json({ user: "no", message: info.message });
    }
    req.logIn(user, function(err) {
      if (err) {
        res.json(err);
      }
      if (req.body.rememberme) {
        req.session.cookie.maxAge = 1000 * 60 * 60 * 24 * 10;
        return res.redirect("/");
      }
      return res.redirect("/");
    });
  })(req, res, next);
});

router.get("/secret/logout", (req, res) => {
  res.clearCookie("connect.sid");
  req.session = null;
  req.logout();
  res.redirect("/");
});

module.exports = router;
