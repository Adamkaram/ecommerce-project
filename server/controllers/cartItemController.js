const cartItemModel = require("../models/cartItemModel.js");
const Product = require("../models/product");
const jwt = require("jsonwebtoken");
const secret = require("../config/constants").secret;
const User = require("../models/user");

/**
 * cartItemController.js
 *
 * @description :: Server-side logic for managing cartItems.
 */
module.exports = {
  /**
   * cartItemController.list()
   */
  list: async (req, res) => {
    const user = req.user;
    try {
      const items = await cartItemModel.find({ user: user._id, inCart: true });
      return res.status(203).json({ items });
    } catch (err) {
      return res.status(500).json({
        message: "Error when getting cartItem.",
        error: err
      });
    }
  },

  /**
   * cartItemController.show()
   */
  show: function(req, res) {
    var id = req.params.id;
    cartItemModel.findOne({ _id: id }, function(err, cartItem) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting cartItem.",
          error: err
        });
      }
      if (!cartItem) {
        return res.status(404).json({
          message: "No such cartItem"
        });
      }
      return res.json(cartItem);
    });
  },

  /**
   * cartItemController.create()
   */

  create: async (req, res) => {
    const user = req.user;

    // console.log(user);
    const userFromDB = User.findById(user._id);
    if (userFromDB.deactivated) {
      return res.status(413).json({ message: "user deactivated" });
    }
    try {
      const oldItem = await cartItemModel.findOne({
        user: user._id,
        "product._id": req.body.product._id,
        pieceIndex: req.body.pieceIndex,
        inCart: true
      });
      if (oldItem != null) {
        if (req.body.productType === 1) {
          const product = await Product.findById(req.body.product._id);
          if (req.body.pieceIndex != null) {
            if (
              oldItem.count + 1 >
              product.pieces[req.body.pieceIndex].inStock
            ) {
              return res.status(420).json({ message: "Not in stock" });
            }
          } else {
            if (oldItem.count + 1 > product.inStock) {
              return res.status(420).json({ message: "Not in stock" });
            }
          }
        }
        oldItem.count += 1;
        oldItem.save();
        return res.status(201).json(oldItem);
      }
    } catch (err) {
      return res.status(500).json({
        message: "Error when find item in cart",
        error: err
      });
    }

    try {
      const cartItem = await cartItemModel.create({
        product: req.body.product, //required
        count: 1,
        product_type: req.body.productType, //required
        pieceIndex: req.body.pieceIndex, //required
        cost: req.body.cost, //required
        user: user._id,
        inCart: true
      });
      return res.status(201).json(cartItem);
    } catch (err) {
      return res.status(500).json({
        message: "Error when find item in cart",
        error: err
      });
    }
  },

  /**
   * cartItemController.update()
   */
  update: async (req, res) => {
    const id = req.body.id;
    const action = req.body.action;
    try {
      const item = await cartItemModel.findById(id);
      const count = item.count;
      if (action == "increase") {
        item.count += 1;
        item.save();
        return res.status(201).json({ message: "success" });
      }
      if (action == "decrease") {
        if (count === 1) {
          item.delete();
          return res.status(201).json({ message: "success" });
        } else {
          item.count -= 1;
          item.save();
          return res.status(201).json({ message: "success" });
        }
      }
      if (action == "delete") {
        item.delete();
        return res.status(201).json({ message: "success" });
      }
    } catch (err) {
      return res.status(500).json({ message: "failed" });
    }
  },
  /**
   * cartItemController.remove()
   */
  remove: function(req, res) {
    var id = req.params.id;
    cartItemModel.findByIdAndRemove(id, function(err, cartItem) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the cartItem.",
          error: err
        });
      }
      return res.status(204).json();
    });
  }
};
