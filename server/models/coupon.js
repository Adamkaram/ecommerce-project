var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var couponSchema = new Schema({
  product: [
    {
			title:{
				ar: String,
				en: String
			},
			_id: Schema.Types.ObjectId,
    }
  ],
  category: [
    {
      type: Schema.Types.ObjectId,
      ref: "Cat",
    }
  ],
  users: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
  min: Number,
  code: {
    type: String,
		required: true,
		index: true
  },
  discount: {
    type: Number,
    required: true,
  },
  uses: {
    type: Number,
    default: 0
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Coupon", couponSchema);
