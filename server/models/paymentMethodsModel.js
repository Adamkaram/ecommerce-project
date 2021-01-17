const mongoose = require("mongoose");

const { Schema } = mongoose;

const paymentMethodsSchema = new Schema({
  nameAr: { type: String, required: true },
  nameEn: { type: String, required: true },
  cities: [
    {
      type: Schema.Types.ObjectId,
      ref: "city"
    }
  ],
  type: { type: Number, required: true }
});

module.exports = mongoose.model("paymentMethods", paymentMethodsSchema);
