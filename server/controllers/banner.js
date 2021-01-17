/* eslint-disable @typescript-eslint/explicit-function-return-type */
const Slider = require("../models/banners");

const Jimp = require("jimp");
// const client = require('../config/redis')

/**
 * render edit page
 */
exports.editSlider = async (req, res) => {
  res.render("admin/banners/index", { title: "البنرات" });
};
exports.editSliderWeb = async (req, res) => {
  res.render("admin/banners/web", { title: "البنرات" });
};

/**
 * fetching slider json
 */
exports.fetchSlider = async (req, res) => {
  const slider = await Slider.find().limit(4);
  return res.json({ slider });
};
exports.fetchSliderWeb = async (req, res) => {
  const slider = await Slider.find()
    .skip(4)
    .limit(4);
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
exports.uploadImagWeb = async (req, res) => {
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
      .resize(1440, Jimp.AUTO)
      .write(`${__dirname}/../public/uploads/slider/resized/${name}`);
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
// const transporter = require("../config/mailer");
// const ejs = require("ejs");
// const path = require("path");

exports.dev = async (req, res) => {
  const newBanners = [
    {
      refId: {
        title: {
          ar: "منتج تجريبى متعدد القطع و الالوان",
          en: "Test Product with variables and colors"
        },
        _id: "5db0cb8a96daa410a215d495"
      },
      refType: "product",
      image: "15607535324541.jpg"
    },
    {
      refId: {
        title: {
          ar: "منتج تجريبى متعدد القطع و الالوان",
          en: "Test Product with variables and colors"
        },
        _id: "5db0cb8a96daa410a215d495"
      },
      refType: "product",
      image: "15607535324541.jpg"
    },
    {
      refId: {
        title: {
          ar: "منتج تجريبى متعدد القطع و الالوان",
          en: "Test Product with variables and colors"
        },
        _id: "5db0cb8a96daa410a215d495"
      },
      refType: "product",
      image: "15607535324541.jpg"
    },
    {
      refId: {
        title: {
          ar: "منتج تجريبى متعدد القطع و الالوان",
          en: "Test Product with variables and colors"
        },
        _id: "5db0cb8a96daa410a215d495"
      },
      refType: "product",
      image: "15607535324541.jpg"
    }
  ];
  const banners = await Slider.create(newBanners);
  return res.json(banners);
  // try {
  //   const data = await ejs.renderFile(
  //     path.join(__dirname, "../views/emails/new_order.ejs")
  //   );
  //   const info = await transporter.sendMail({
  //     from: '"new order" <orders@webaystore.com>', // sender address
  //     to: "pcissp@yahoo.com", // list of receivers
  //     subject: "Hello ✔", // Subject line
  //     text: "Hello world?", // plain text body
  //     html: data // html body
  //   });

  //   res.send("ok");
  // } catch (err) {
  //   res.json(err);
  // }
};
