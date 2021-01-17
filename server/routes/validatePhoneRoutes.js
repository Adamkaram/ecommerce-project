var express = require("express");
var router = express.Router();
const validatePhoneController = require("../controllers/validatePhoneController.js");

router.post("/", validatePhoneController.create);
router.post("/validate", validatePhoneController.validate);

module.exports = router;
