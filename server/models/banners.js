const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const sliderSchema = new Schema({
  image: {
    type: String,
    required: true
  },
  refType: {
    type: String,
    default: "category",
    required: true
  },
  refId: {}
});

module.exports = mongoose.model("Banner", sliderSchema);
