const express = require("express");

const router = express.Router();
const sliderRouter = require("../router/slider");
const bannerRouter = require("../router/banner");
const categoryRouter = require("../router/category");
const productRouter = require("../router/product");
const cardRouter = require("../router/cards");
const cartItemRouter = require("../routes/cartItemRoutes");
const cityRoutes = require("../routes/cityRoutes");
const paymentRoutes = require("../routes/paymentMethodsRoutes");
const couponRoutes = require("../router/coupon");
const orderRouter = require("../router/orders");
const delayedOrdersRouter = require("../router/delayedOrders");
const moderatorRouter = require("../router/manageModerator");
const returnRoutes = require("../routes/returnRoutes");
const constantRoutes = require("../routes/constantRoutes");
const userRoutes = require("../routes/userRoutes");
//{requireNewController}

router.get("/", (req, res) => {
  res.render("admin/index", { title: "لوحة التحكم" });
});
router.use("/category", categoryRouter);
router.use("/slider", sliderRouter);
router.use("/banner", bannerRouter);
router.use("/product", productRouter);
router.use("/card", cardRouter);
router.use("/cartItem", cartItemRouter);
router.use("/city", cityRoutes);
router.use("/payment", paymentRoutes);
router.use("/coupon", couponRoutes);
router.use("/order", orderRouter);
router.use("/delayed-order", delayedOrdersRouter);
router.use("/moderators", moderatorRouter);
router.use("/return", returnRoutes);
router.use("/constant", constantRoutes);
router.use("/user", userRoutes);
//{registerNewRoutes}

module.exports = router;
