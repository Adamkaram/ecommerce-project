const mongoose = require('mongoose')
const Schema = mongoose.Schema

const categorySchema = Schema({
  name: {
    ar:{
      type:String,
      required:true
    },
    en:{
      type:String,
      required:true
    },
  },
  parentId: {
    type: Schema.Types.ObjectId,
    ref: 'Cat',
  },
  image: String,
  created_at: {
    type: Date,
    default: Date.now
  },


})

module.exports = mongoose.model('Cat', categorySchema)