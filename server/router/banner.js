const express = require("express");
const router = express.Router();
const sliderController = require("../controllers/banner");

router.get("/", sliderController.editSlider);
router.get("/web", sliderController.editSliderWeb);
router.get("/fetch-slider", sliderController.fetchSlider);
router.get("/fetch-slider-web", sliderController.fetchSliderWeb);
router.post("/update", sliderController.update);
router.post("/upload-image", sliderController.uploadImage);
router.post("/upload-image-web", sliderController.uploadImagWeb);
router.get("/dev", sliderController.dev);

module.exports = router;
