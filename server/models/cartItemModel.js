const mongoose = require("mongoose");

const { Schema } = mongoose;

const cartItemSchema = new Schema({
  product: {},
  count: Number,
  product_type: Number,
  pieceIndex: Number,
  cost: Number,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  inCart: Boolean,
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("cartItem", cartItemSchema);
