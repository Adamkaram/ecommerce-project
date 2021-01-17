const express = require("express");
const router = express.Router();
const sliderController = require("./controllers/banner");

router.get("/", sliderController.editSlider);
router.get("/fetch-slider", sliderController.fetchSlider);
router.post("/update", sliderController.update);
router.post("/upload-image", sliderController.uploadImage);

module.exports = router;
