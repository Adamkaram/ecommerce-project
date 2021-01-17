var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var validatePhoneSchema = new Schema({
  code: {
    type: Schema.Types.String,
    required: true,
    index: true
  },
  phone: {
    type: Schema.Types.Number,
    required: true,
    index: true,
    unique: true
  }
});

module.exports = mongoose.model("validatePhone", validatePhoneSchema);
