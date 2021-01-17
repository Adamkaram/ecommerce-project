const adminMiddleWare = (req, res, next) => {
  const user = req.user;
  if (!user) {
    res.redirect("/secret/login");
  }
  if (user) {
    if (user.email === "admin@webay.com") {
      next();
    } else {
      res.redirect("/secret/login");
    }
  }
};
module.exports = adminMiddleWare;
