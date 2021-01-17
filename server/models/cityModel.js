const mongoose = require("mongoose");

const { Schema } = mongoose;

const citySchema = new Schema({
  nameAr: String,
  nameEn: String,
  shipPrice: Number
});

module.exports = mongoose.model("city", citySchema);
