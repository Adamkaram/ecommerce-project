const jwt = require("jsonwebtoken");
const secret = require("../config/constants").secret;
const User = require("../models/user");
const jwtMiddleWare = async (req, res, next) => {
  const authorizationHeader = req.headers.authorization;
  let user = null;
  if (authorizationHeader) {
    const token = req.headers.authorization.split(" ")[1];
    try {
      user = jwt.verify(token, secret);
      // const userFromDb = await User.findById(user._id);
      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({ message: "un authorized" });
    }
  } else {
    return res.status(401).json({ message: "un authorized" });
  }
};
module.exports = jwtMiddleWare;
