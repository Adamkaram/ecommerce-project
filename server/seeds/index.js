const { Router } = require("express");
const Banners = require("../models/banners");
const Slider = require("../models/slider");

const router = Router();

router.get("/banners", async (req, res) => {
  const banners = [];
  const bnr = { image: "test", refType: "product", refId: {} };
  for (let i = 0; i < 4; i++) {
    banners.push(bnr);
  }
  const createdBanners = await Banners.create(banners);
  return res.json(createdBanners);
});

router.get("/sliders", async (req, res) => {
  const banners = [];
  const bnr = { image: "test", refType: "product", refId: {} };
  for (let i = 0; i < 10; i++) {
    banners.push(bnr);
  }
  const createdBanners = await Slider.create(banners);
  return res.json(createdBanners);
});

module.exports = router;
