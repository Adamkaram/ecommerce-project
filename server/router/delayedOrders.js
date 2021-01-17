const express = require("express");
const router = express.Router();
const delayedOrdersController = require("../controllers/delayedOrderController");

router.get("/", delayedOrdersController.renderAdminIndex);
router.get("/paginate", delayedOrdersController.paginate);
router.put("/update", delayedOrdersController.update);
router.get("/:id", delayedOrdersController.renderAdminShow);

module.exports = router;
