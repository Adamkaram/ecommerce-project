/* eslint-disable @typescript-eslint/explicit-function-return-type */
const Slider = require("../models/slider");
const Jimp = require("jimp");
// const client = require('../config/redis')

/**
 * render edit page
 */
exports.editSlider = async (req, res) => {
  res.render("admin/slider/index", { title: "السلايدر" });
};
exports.editSliderWeb = async (req, res) => {
  res.render("admin/slider/web", { title: "السلايدر" });
};
exports.editSlider2 = async (req, res) => {
  res.render("admin/slider/two", { title: "السلايدر" });
};

/**
 * fetching slider json
 */
exports.fetchSlider = async (req, res) => {
  const slider = await Slider.find({}).limit(5);
  return res.json({ slider });
};
/**
 * get slider 2
 */
exports.fetchSlider2 = async (req, res) => {
  const slider = await Slider.find({})
    .skip(5)
    .limit(5);
  return res.json({ slider });
};
exports.fetchSliderWeb = async (req, res) => {
  const slider = await Slider.find({})
    .skip(10)
    .limit(5);
  return res.json({ slider });
};
exports.fetchSliderWeb2 = async (req, res) => {
  const slider = await Slider.find({})
    .skip(15)
    .limit(5);
  return res.json({ slider });
};

/**
 * upload and resize slider image
 */
exports.uploadImage = async (req, res) => {
  const sliderImage = req.files.thumb;
  const sliderImageType = sliderImage.mimetype;
  const type = sliderImageType.split("/")[0];
  if (type != "image") {
    return res.json({ message: "type error" });
  }
  const name = Date.now() + sliderImage.name;
  const uploadPath = `${__dirname}/../public/uploads/slider/${name}`;
  await sliderImage.mv(uploadPath);
  Jimp.read(uploadPath, (err, img) => {
    if (err) res.json(err);
    img
      .resize(800, Jimp.AUTO)
      .write(`${__dirname}/../public/uploads/slider/resized/${name}`);
    return res.json({ message: "success", image: name });
  });
};
/**
 * upload for web
 */
exports.uploadImageWeb = async (req, res) => {
  const sliderImage = req.files.thumb;
  const sliderImageType = sliderImage.mimetype;
  const type = sliderImageType.split("/")[0];
  if (type != "image") {
    return res.json({ message: "type error" });
  }
  const name = Date.now() + sliderImage.name;
  const uploadPath = `${__dirname}/../public/uploads/slider/${name}`;
  const uploaded = await sliderImage.mv(uploadPath);
  Jimp.read(uploadPath, (err, img) => {
    if (err) res.json(err);
    img
      .resize(1440, Jimp.AUTO)
      .write(`${__dirname}/../public/uploads/slider/web/${name}`);
    return res.json({ message: "success", image: name });
  });
};

/**
 * updating slider
 */

exports.update = async (req, res) => {
  const newSlider = req.body.slider;
  const oldSlider = await Slider.findOne({ _id: newSlider._id });
  if (!oldSlider) {
    return res.json({ message: "slider not found" });
  }
  oldSlider.image = newSlider.image;
  oldSlider.refType = newSlider.refType;
  oldSlider.refId = newSlider.refId;

  const updatedSlider = await oldSlider.save();
  if (updatedSlider) {
    return res.json({ message: "success" });
  }
};
