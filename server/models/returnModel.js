var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var returnSchema = new Schema({
  order: {
    type: Schema.Types.ObjectId,
    ref: "Order"
  },
  status: { type: Number, required: true },
  reason: { type: String, required: true },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  }
});

module.exports = mongoose.model("return", returnSchema);
