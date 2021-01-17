var express = require("express");
var router = express.Router();
var AddressController = require("../controllers/AddressController.js");

/*
 * GET
 */
router.get("/", AddressController.list);

/*
 * GET
 */
router.get("/:id", AddressController.show);

/*
 * POST
 */
router.post("/", AddressController.create);

/*
 * PUT
 */
router.put("/:id", AddressController.update);

/*
 * DELETE
 */
router.delete("/:id", AddressController.remove);

module.exports = router;
