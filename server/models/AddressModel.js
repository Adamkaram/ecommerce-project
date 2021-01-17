const mongoose = require("mongoose");

const { Schema } = mongoose;

const AddressSchema = new Schema({
  city: {
    type: Schema.Types.ObjectId,
    ref: "city"
  },
  street: String,
  details: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "user"
  },
  phone: String
});

module.exports = mongoose.model("Address", AddressSchema);
