var express = require("express");
var router = express.Router();
var cityController = require("../controllers/cityController.js");

/**
 * show city create page
 */
router.get("/create", cityController.renderCreate);
router.get("/edit/:id", cityController.renderEdit);
router.get("/", cityController.renderIndex);

/*
 * GET
 */
router.get("/index", cityController.list);

/*
 * GET
 */
router.get("/:id", cityController.show);

/*
 * POST
 */
router.post("/", cityController.create);

/*
 * PUT
 */
router.put("/edit/:id", cityController.update);

/*
 * DELETE
 */
router.delete("/:id", cityController.remove);

module.exports = router;
