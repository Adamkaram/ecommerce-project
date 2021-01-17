const express = require("express");
const moderatorMiddleWare = require("../middlewares/rules");
const router = express.Router();
const sliderRouter = require("./moderator/slider");
const bannerRouter = require("./moderator/banner");
const productRouter = require("./moderator/product");
const cardRouter = require("./moderator/cards");
const couponRoutes = require("./moderator/coupon");
const orderRouter = require("./moderator/orders");
const ProductController = require("../controllers/product");
const delayedOrdersRouter = require("./moderator/delayedOrderRoutes");
router.get("/product/all-names", ProductController.getAllNames);

router.get("/", (req, res) => {
  res.render("moderator/index", { title: "لوحة التحكم" });
});
router.use("/slider", moderatorMiddleWare.CAN_CREATE_SLIDERS, sliderRouter);
router.use("/banner", moderatorMiddleWare.CAN_CREATE_SLIDERS, bannerRouter);
router.use("/product", moderatorMiddleWare.CAN_CREAT_PRODUCT, productRouter);
router.use("/card", moderatorMiddleWare.CAN_MANAGE_CARDS, cardRouter);
router.use("/coupon", moderatorMiddleWare.CAN_CREATE_COUPONS, couponRoutes);
router.use("/order", moderatorMiddleWare.CAN_MANAGE_ORDERS, orderRouter);
router.use(
  "/delayed-order",
  moderatorMiddleWare.CAN_MANAGE_DELAYED,
  delayedOrdersRouter
);

module.exports = router;
