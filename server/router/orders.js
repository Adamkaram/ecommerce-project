const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orders");

router.get("/", orderController.renderAdminIndex);
router.get("/show/:id", orderController.showOrder);
router.get("/paginate", orderController.paginate);
router.put("/", orderController.update);
module.exports = router;
