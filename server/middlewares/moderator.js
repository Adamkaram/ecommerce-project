const moderatorMiddleWare = (req, res, next) => {
  const user = req.user;
  if (!user) {
    res.redirect("/login");
  }
  if (user) {
    let havePermission = false;
    for (let i = 0; i < user.role.length; i++) {
      if (user.role[i].id == 1) {
        havePermission = true;
        break;
      }
    }
    if (havePermission) {
      next();
    } else {
      res.redirect("/login");
    }
  }
};
module.exports = moderatorMiddleWare;
