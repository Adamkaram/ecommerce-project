const delayedOrderModel = require("../../../models/delayedOrderModel.js");
const paginate = require("../../../config/helpers").paginate;
/**
 * delayedOrderController.js
 *
 * @description :: Server-side logic for managing delayedOrders.
 */
module.exports = {
  paginate: async (req, res) => {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    res.json(
      await paginate(
        delayedOrderModel,
        {},
        page,
        limit,
        { created_at: -1 },
        ["product", "user"],
        {}
      )
    );
  },
  /**
   * delayedOrderController.list()
   */
  list: async (req, res) => {
    try {
      const userOrders = await delayedOrderModel
        .find({ user: req.user._id })
        .populate("product", {
          title: 1,
          "pieces.attributes": 1
        })
        .sort({ status: -1 });
      return res.status(203).json({ delayedOrders: userOrders });
    } catch (err) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting delayedOrder.",
          error: err
        });
      }
    }
  },

  /**
   * delayedOrderController.show()
   */
  show: function(req, res) {
    var id = req.params.id;
    delayedOrderModel.findOne(
      {
        _id: id
      },
      function(err, delayedOrder) {
        if (err) {
          return res.status(500).json({
            message: "Error when getting delayedOrder.",
            error: err
          });
        }
        if (!delayedOrder) {
          return res.status(404).json({
            message: "No such delayedOrder"
          });
        }
        return res.json(delayedOrder);
      }
    );
  },

  /**
   * delayedOrderController.create()
   */
  create: function(req, res) {
    var delayedOrder = new delayedOrderModel({
      product: req.body.product,
      user: req.user._id,
      status: 1,
      pieceIndex: req.body.pieceIndex
    });

    delayedOrder.save(function(err, delayedOrder) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating delayedOrder",
          error: err
        });
      }
      return res.status(201).json(delayedOrder);
    });
  },

  /**
   * delayedOrderController.update()
   */
  update: async (req, res) => {
    try {
      const order = await delayedOrderModel.findByIdAndUpdate(req.body.id, {
        $set: { status: 2 }
      });
      return res.status(203).json({ message: "updated" });
    } catch (error) {}
  },

  /**
   * delayedOrderController.remove()
   */
  remove: function(req, res) {
    var id = req.params.id;
    delayedOrderModel.findByIdAndRemove(id, function(err, delayedOrder) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the delayedOrder.",
          error: err
        });
      }
      return res.status(204).json();
    });
  },

  /**
   * admin render
   */
  renderAdminIndex: (req, res) => {
    const title = "الطلبات المؤجلة";
    res.render("moderator/delayed/index", { title });
  },
  renderAdminShow: (req, res) => {
    const title = "الطلبات المؤجلة";
    res.render("moderator/delayed/show", { title });
  }
};
