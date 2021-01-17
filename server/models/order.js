const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const autoIncrement = require("mongoose-auto-increment");
autoIncrement.initialize(mongoose);
const orderStatus = require("../config/orderStatus");
const orderSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "user",
    required: true
  },
  status: {
    type: Number,
    default: orderStatus.review
  },
  items: [
    {
      type: Schema.Types.ObjectId,
      ref: "cartItem"
    }
  ],
  shippingAddress: {
    type: Schema.Types.ObjectId,
    ref: "Address"
  },
  arriveAt: {
    type: Date
  },
  shippingCost: {
    type: Number,
    default: 0
  },
  totalCost: {
    type: Number,
    required: true
  },
  id: {
    type: Number
  },
  paymentMethod: {
    type: Schema.Types.ObjectId,
    ref: "paymentMethods"
  },
  isCoupon: Boolean,
  coupon: String,
  created_at: {
    type: Date,
    default: Date.now
  }
});
orderSchema.plugin(autoIncrement.plugin, {
  model: "Order",
  field: "id",
  startAt: 19806,
  incrementBy: 1
});
module.exports = mongoose.model("Order", orderSchema);
