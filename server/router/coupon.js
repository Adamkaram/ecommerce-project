const express = require("express");
const router = express.Router();
const couponController = require("../controllers/coupon");

router.get("/create", couponController.renderAdminCreate);
router.get("/edit/:id", couponController.renderEditAdmin);
router.get("/paginate", couponController.paginate);
router.post("/", couponController.create);
router.get("/", couponController.renderAdminIndex);
router.delete("/:id", couponController.delete);
router.put("/:id", couponController.update);
module.exports = router;
