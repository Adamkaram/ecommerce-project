const express = require("express");
const router = express.Router();
const returnController = require("../controllers/returnController.js");

/**
 * admin routes
 */
router.get("/", returnController.renderAdminIndex);
router.get("/create", returnController.renderCreatePage);

router.get("/edit/:id", returnController.renderAdminEdit);
router.get("/show/:id", returnController.showOrder);

/*
 * GET
 */
router.get("/paginate", returnController.paginate);

/*
 * GET
 */
router.get("/:id", returnController.show);

/*
 * POST
 */
router.post("/", returnController.create);

/*
 * PUT
 */
router.put("/", returnController.edit);

/*
 * DELETE
 */
router.delete("/:id", returnController.remove);

module.exports = router;
