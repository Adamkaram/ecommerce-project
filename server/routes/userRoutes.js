const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

/**
 * admin routes
 */
router.get("/", userController.renderAdminIndex);
router.get("/edit/:id", userController.renderAdminEdit);

/*
 * GET
 */
router.get("/paginate", userController.paginate);

/*
 * GET
 */
router.get("/:id", userController.show);

/*
 * PUT
 */
router.put("/:id", userController.edit);

/*
 * DELETE
 */
router.delete("/:id", userController.remove);

module.exports = router;
