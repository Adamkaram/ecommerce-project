var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var delayedOrderSchema = new Schema({
  product: {
    type: Schema.Types.ObjectId,
    ref: "Product",
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  pieceIndex: Number,
  status: Number,
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("delayedOrder", delayedOrderSchema);
