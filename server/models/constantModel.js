var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var constantSchema = new Schema({
key : String,
value : String,
label : String
});

module.exports = mongoose.model('constant', constantSchema);
