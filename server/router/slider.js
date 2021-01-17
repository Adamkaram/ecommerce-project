const express = require("express");
const router = express.Router();
const sliderController = require("../controllers/slider");

router.get("/", sliderController.editSlider);
router.get("/slider-web", sliderController.editSliderWeb);
router.get("/second", sliderController.editSlider2);
router.get("/fetch-slider", sliderController.fetchSlider);
router.get("/fetch-slider2", sliderController.fetchSlider2);
router.get("/fetch-slider-web", sliderController.fetchSliderWeb);
router.get("/fetch-slider-web2", sliderController.fetchSliderWeb2);
router.post("/update", sliderController.update);
router.post("/upload-image", sliderController.uploadImage);
router.post("/upload-image-web", sliderController.uploadImageWeb);

module.exports = router;
