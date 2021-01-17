const express = require("express");
const router = express.Router();
const delayedOrderController = require("../controllers/delayedOrderController.js");
const jwtMiddleWare = require("../middlewares/jwtMiddleWare");

/*
 * GET
 */
router.get("/", jwtMiddleWare, delayedOrderController.list);

/*
 * GET
 */
router.get("/:id", delayedOrderController.show);

/*
 * POST
 */
router.post("/", jwtMiddleWare, delayedOrderController.create);

/*
 * PUT
 */
router.put("/:id", delayedOrderController.update);

/*
 * DELETE
 */
router.delete("/:id", delayedOrderController.remove);

module.exports = router;
