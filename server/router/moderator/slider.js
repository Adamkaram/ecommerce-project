const express = require("express");
const router = express.Router();
const sliderController = require("./controllers/slider");

router.get("/", sliderController.editSlider);
router.get("/second", sliderController.editSlider2);
router.get("/fetch-slider", sliderController.fetchSlider);
router.get("/fetch-slider2", sliderController.fetchSlider2);
router.post("/update", sliderController.update);
router.post("/upload-image", sliderController.uploadImage);

module.exports = router;
