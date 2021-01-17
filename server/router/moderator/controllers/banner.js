const Slider = require("../../../models/banners");
const Test = require("../../../models/order");

const Jimp = require("jimp");
// const client = require('../config/redis')

/**
 * render edit page
 */
exports.editSlider = async (req, res) => {
  const slider = await Slider.find({});
  res.render("moderator/banners/index", { title: "البنرات" });
};

/**
 * fetching slider json
 */
exports.fetchSlider = async (req, res) => {
  // const sliderRedisKey = 'slider'
  // return client.get(sliderRedisKey,(err,sliders)=>{
  // if(sliders){
  // return res.json({slider:sliders})
  // }else{
  const slider = await Slider.find({});
  // client.setex(sliderRedisKey,3600,slider)
  return res.json({ slider });
  // })
  // }
};

/**
 * upload and resize slider image
 */
exports.uploadImage = async (req, res) => {
  let sliderImage = req.files.thumb;
  let sliderImageType = sliderImage.mimetype;
  let type = sliderImageType.split("/")[0];
  if (type != "image") {
    return res.json({ message: "type error" });
  }
  name = Date.now() + sliderImage.name;
  let uploadPath = __dirname + "/../public/uploads/slider/" + name;
  const uploaded = await sliderImage.mv(uploadPath);
  Jimp.read(uploadPath, (err, img) => {
    if (err) res.json(err);
    img
      .resize(800, 300)
      .write(__dirname + "/../public/uploads/slider/resized/" + name);
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
