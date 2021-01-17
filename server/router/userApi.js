const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const constants = require("../config/constants");
const secret = constants.secret;
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwtMiddleWare = require("../middlewares/jwtMiddleWare");

router.post(
  "/register",

  async (req, res) => {
    const { name, username, phone, email, password } = req.body;
    if (!name || !username || !phone || !email || !password) {
      return res.status(422).json({ message: "fields" });
    }

    const Salt = await bcrypt.genSalt(10);
    const Hash = await bcrypt.hash(password, Salt);
    // check if user exist

    const checkEmail = await User.findOne({
      email: { $regex: email, $options: "i" }
    });
    if (checkEmail) return res.status(423).json({ message: "email" });

    const checkUsername = await User.findOne({
      username: { $regex: username, $options: "i" }
    });
    if (checkUsername) return res.status(424).json({ message: "username" });

    const checkPhone = await User.findOne({ phone });
    if (checkPhone) return res.status(425).json({ message: "phone" });

    const user = {
      name: name,
      username: username,
      email: email,
      password: Hash,
      phone: phone,
      role: [{ id: 0 }]
    };
    try {
      const newUser = await User.create(user);
      const token = jwt.sign(newUser.toJSON(), secret);
      return res.status(200).json({ token, userData: newUser });
    } catch (error) {
      return res.status(430).json({ message: "error" });
    }
  }
);

router.post("/login", async (req, res) => {
  // const token = req.body.token
  // const user = jwt.verify(token,secret)
  if (!req.body.username) {
    return res.json({
      message: " يجب كتابة اسم مستخدم او بريد الكترونى ",
      code: 201
    });
  }
  if (!req.body.password) {
    return res.json({ message: "يجب كتابة رقم سرى ", code: 202 });
  }
  const user = await User.findOne({
    $or: [{ email: req.body.username }, { username: req.body.username }]
  });

  if (!user) {
    return res.status(431).json({ message: "not found" });
  }
  const pass = await bcrypt.compare(req.body.password, user.password);
  if (!pass) {
    return res.status(432).json({ message: "password wrong" });
  }
  const token = jwt.sign(user.toJSON(), secret);
  return res.status(200).json({ token, userData: user });
});

router.get("/get-data", jwtMiddleWare, async (req, res) => {
  try {
    const user = req.user;
    const userData = await User.findById(user._id);
    return res.json({ userData });
  } catch (err) {
    return res.status(413).json({ message: "un authorized" });
  }
});

module.exports = router;
