const express = require("express");
const router = express.Router();

const jwtMiddleWare = require("../middlewares/jwtMiddleWare");
const sliderController = require("../controllers/slider");
const bannerController = require("../controllers/banner");
const CatController = require("../controllers/category");
const ProductController = require("../controllers/product");
const cardController = require("../controllers/card");
const couponController = require("../controllers/coupon");
const cartItemController = require("../controllers/cartItemController");
const delayedOrderController = require("../controllers/delayedOrderController");
const addressController = require("../controllers/AddressController");
const Cities = require("../models/cityModel");
const paymentsMethodsController = require("../controllers/paymentMethodsController");
const orderController = require("../controllers/orders");
const favoriteController = require("../controllers/favoriteController");
const constantsController = require("../controllers/constantController");
const userController = require("../controllers/user");
const returnsController = require("../controllers/returnController");
const validatePhoneRoutes = require("../routes/validatePhoneRoutes");

/**
 * slider
 */
router.get("/slider", sliderController.fetchSlider);
router.get("/slider-web", sliderController.fetchSliderWeb);
router.get("/slider-web2", sliderController.fetchSliderWeb2);
router.get("/slider2", sliderController.fetchSlider2);
router.get("/banner", bannerController.fetchSlider);
router.get("/banner-web", bannerController.fetchSliderWeb);

/**
 * categories
 */
router.get("/category/get-parents", CatController.getParentCategories);
router.get("/category/get-children", CatController.getAllChildren);
router.get("/category/get-children/:_id", CatController.getChildren);
router.get("/category/paginate", CatController.paginateCategories);
router.get("/category", CatController.fetchAllCategories);

/**
 * products
 */
router.get("/product/latest", ProductController.getLatestProducts);
router.get("/product/search", ProductController.search);
router.get("/product/best-seller", ProductController.getBestSeller);
router.get("/product/best-seller2", ProductController.getBestSeller2);
router.get("/product-by-id/:id", ProductController.getById);
router.get("/product/paginate", ProductController.paginateProduct);
router.get("/product/category", ProductController.paginateProductOfCategory);
router.get("/product/499", ProductController.getUnder499);
router.get("/product/999", ProductController.getUnder999);

/**
 * cards
 */
router.get("/card/category/paginate", cardController.paginateCategories);
router.get("/card/card/paginate", cardController.paginateCards);
router.get("/card/card/category", cardController.getCardsByCategory);

/**
 * cartItem
 */
router.get("/cart", jwtMiddleWare, cartItemController.list);
router.post("/cart", jwtMiddleWare, cartItemController.create);
router.put("/cart", jwtMiddleWare, cartItemController.update);
router.post("/coupon", jwtMiddleWare, couponController.handle);

/**
 * delayed orders
 */
router.post("/delayed-order", jwtMiddleWare, delayedOrderController.create);
router.get("/delayed-order", jwtMiddleWare, delayedOrderController.list);

/**
 * Addresses
 */
router.get("/address", jwtMiddleWare, addressController.list);
router.get("/cities", async (req, res) => {
  const cities = await Cities.find({});
  res.json({ cities });
});
router.post("/address", jwtMiddleWare, addressController.create);
router.get("/payment-methods", paymentsMethodsController.list);

/**
 * Orders
 */
router
  .route("/order")
  .post(jwtMiddleWare, orderController.create)
  .get(jwtMiddleWare, orderController.fetchUserOrders);
router.get(
  "/order-delivered",
  jwtMiddleWare,
  orderController.getDeliveredOrders
);
/**
 * Favorites
 */
router
  .route("/favorite")
  .post(jwtMiddleWare, favoriteController.addToFavorites)
  .get(jwtMiddleWare, favoriteController.getFavorites);

router.get("/constants", constantsController.paginate);

/**
 * user
 */
router.put("/user/change-name", jwtMiddleWare, userController.changeName);
router.put("/user/change-pass", jwtMiddleWare, userController.changePass);

/**
 * returns
 */
router.get("/returns", jwtMiddleWare, returnsController.getUserReturns);
router.get(
  "/returns-accepted",
  jwtMiddleWare,
  returnsController.getUserReturnsAccepted
);
router.post("/returns", jwtMiddleWare, returnsController.create);

router.use("/verify", validatePhoneRoutes);

module.exports = router;
