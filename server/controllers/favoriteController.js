const User = require("../models/user");
const Schema = require("mongoose");
const Product = require("../models/product");

/**
 * add and remove product from favorites
 */
exports.addToFavorites = async (req, res) => {
  try {
    const { productId } = req.body;
    if (!productId) {
      return res.status(404).json({ message: "no product" });
    }
    const user = await User.findById(req.user._id);
    if (!user.favorites.includes(Schema.Types.ObjectId(productId))) {
      if (!user.favorites) {
        user.favorites = [];
      }
      await user.favorites.push(Schema.Types.ObjectId(productId));
      await user.save();
      return res.status(201).json({ message: "added", user });
    }
    await user.favorites.pull(Schema.Types.ObjectId(productId));
    await user.save();
    return res.status(201).json({ message: "removed", user });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
};

/**
 * get user favorites
 */
exports.getFavorites = async (req, res) => {
  const user = await User.findById(req.user._id);
  try {
    console.log(user.favorites);
    const products = await Product.find({
      _id: { $in: user.favorites }
    }).select({
      title: 1,
      images: 1
    });
    return res.status(200).json({ products });
  } catch (error) {
    return res.status(500).json(error);
  }
};
