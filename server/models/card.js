const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardCategorySchema = new Schema({
  title: {
    ar: {
      type: String,
      required: true
    },
    en: {
      type: String,
      required: true
    }
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "CardCategory",
    required: true
  },
  image: String,
  price: {
    type: Number,
    required: true
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Card", cardCategorySchema);
