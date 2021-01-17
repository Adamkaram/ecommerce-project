const mongoose = require("mongoose");
mongoose.set("useCreateIndex", true);
const Schema = mongoose.Schema;

const userSchema = Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    index: true,
    unique: true
  },
  email: {
    type: String,
    index: true,
    email: true,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true,
    unique: true
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  points: {
    type: Number,
    default: 25
  },
  favoriteCategory: {
    type: Schema.Types.ObjectId,
    ref: "Cat"
  },
  role: [
    {
      id: {
        type: Number,
        default: 0
      }
    }
  ],
  controlledCategories: [
    {
      type: Schema.Types.ObjectId,
      ref: "Cat"
    }
  ],
  addresses: [
    {
      type: Schema.Types.ObjectId,
      ref: "Address"
    }
  ],
  rules: [
    {
      type: String
    }
  ],
  favorites: [
    {
      type: Schema.Types.ObjectId,
      ref: "Product"
    }
  ],
  credits: {
    type: Number,
    default: 0
  },
  deactivated: {
    type: Schema.Types.Boolean,
    default: false
  }
});
userSchema.methods.toJSON = function() {
  let obj = this.toObject();
  delete obj.password;
  return obj;
};
module.exports = mongoose.model("user", userSchema);
