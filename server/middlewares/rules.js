const rules = require("../config/moderatorRules");
module.exports = rulesMiddleWare = {
  CAN_CREAT_PRODUCT: (req, res, next) => {
    const user = req.user;
    if (!user) {
      res.redirect("/login");
    }
    if (user) {
      if (user.rules.includes(rules.CAN_CREAT_PRODUCT)) {
        next();
      } else {
        res.redirect("/moderator");
      }
    }
  },
  CAN_CREATE_COUPONS: (req, res, next) => {
    const user = req.user;
    if (!user) {
      res.redirect("/login");
    }
    if (user) {
      if (user.rules.includes(rules.CAN_CREATE_COUPONS)) {
        next();
      } else {
        res.redirect("/moderator");
      }
    }
  },
  CAN_MANAGE_ORDERS: (req, res, next) => {
    const user = req.user;
    if (!user) {
      res.redirect("/login");
    }
    if (user) {
      if (user.rules.includes(rules.CAN_MANAGE_ORDERS)) {
        next();
      } else {
        res.redirect("/moderator");
      }
    }
  },
  CAN_MANAGE_DELAYED: (req, res, next) => {
    const user = req.user;
    if (!user) {
      res.redirect("/login");
    }
    if (user) {
      if (user.rules.includes(rules.CAN_MANAGE_DELAYED)) {
        next();
      } else {
        res.redirect("/moderator");
      }
    }
  },
  CAN_CREATE_SLIDERS: (req, res, next) => {
    const user = req.user;
    if (!user) {
      res.redirect("/login");
    }
    if (user) {
      if (user.rules.includes(rules.CAN_CREATE_SLIDERS)) {
        next();
      } else {
        res.redirect("/moderator");
      }
    }
  },
  CAN_MANAGE_CARDS: (req, res, next) => {
    const user = req.user;
    if (!user) {
      res.redirect("/login");
    }
    if (user) {
      if (user.rules.includes(rules.CAN_MANAGE_CARDS)) {
        next();
      } else {
        res.redirect("/moderator");
      }
    }
  }
};
