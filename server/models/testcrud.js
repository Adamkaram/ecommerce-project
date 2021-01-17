const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestSchema = new Schema({
	title: {
   
      type: String,
     
	},
	price:{
		type:Number,
		required:true
	},

});

module.exports = mongoose.model("Test",TestSchema);