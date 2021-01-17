const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardCategorySchema = new Schema({
	name:{
		ar:String,
		en:String
	},
	image:String,
	created_at: {
    type: Date,
    default: Date.now
  },
});

module.exports = mongoose.model("CardCategory",cardCategorySchema);