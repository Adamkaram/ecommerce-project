const ReturnModel = require("../models/returnModel.js");
const paginate = require("../config/helpers").paginate;
const orderStatus = require("../config/orderStatus");
const Order = require("../models/order");

/**
 * paginate throw ReturnModel
 */
exports.paginate = async (req, res) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  res.json(
    await paginate(
      ReturnModel,
      {}, //filter
      page,
      limit,
      { created_at: -1 }, //sort
      [], // populate
      {} // select fields
    )
  );
};
exports.getUserReturns = async (req, res) => {
  try {
    const returns = await ReturnModel.find({ user: req.user._id }).populate(
      "order"
    );
    return res.status(200).json({ returns });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
exports.getUserReturnsAccepted = async (req, res) => {
  try {
    const returns = await ReturnModel.find({
      user: req.user._id,
      status: orderStatus.returned
    }).populate("order");
    return res.status(200).json({ returns });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
exports.showOrder = async (req, res) => {
  const { id } = req.params;
  const order = await ReturnModel.findById(id)
    .populate("order")

    .populate({
      path: "order",
      populate: { path: "items", model: "cartItem" }
    })
    .populate({
      path: "order",
      populate: { path: "user", model: "user" }
    })
    .populate({
      path: "order",
      populate: { path: "paymentMethod", model: "paymentMethods" }
    })
    .populate({
      path: "order",
      populate: { path: "shippingAddress", model: "Address" }
    })
    .populate({
      path: "order",
      populate: {
        path: "shippingAddress",
        populate: { path: "city", model: "city" }
      }
    });
  res.render("admin/return/show", {
    title: "تحكم بالطلب",
    id: order.id,
    order: JSON.stringify(order)
  });
};

/**
 * create ReturnModel
 */
exports.create = async (req, res) => {
  const { order, reason } = req.body;
  const user = req.user._id;
  if (!order || !reason || !user) {
    return res.status(500).json({ message: "complete data" });
  }
  const newModel = {
    order,
    reason,
    user,
    status: orderStatus.reviewForReturn
  };
  try {
    const createdModel = await ReturnModel.create(newModel);
    await Order.findByIdAndUpdate(order, {
      $set: { status: orderStatus.reviewForReturn }
    });
    if (createdModel) {
      return res.status(200).json({ message: "created", model: createdModel });
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};

/**
 * update ReturnModel
 */

exports.edit = async (req, res) => {
  const { id, status } = req.body;
  try {
    const returnOrder = await ReturnModel.findById(id);
    returnOrder.status = status;
    returnOrder.save();
    await Order.findByIdAndUpdate(returnOrder.order._id, { $set: { status } });
    return res.json({ message: "done" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

/**
 * find ReturnModel by id
 */

exports.show = async (req, res) => {
  const { id } = req.params;
  try {
    const model = await ReturnModel.findById(id);
    return res.json({ model });
  } catch (error) {
    return res.status(500).json({ message: "not found" });
  }
};
/**
 * delete ReturnModel by id
 */

exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    const model = await ReturnModel.findOneAndDelete(id);
    return res.status(200).json({ message: "deleted" });
  } catch (error) {
    return res.status(500).json({ message: "not found" });
  }
};

exports.renderCreatePage = (req, res) => {
  const title = "انشاء ";
  res.render("admin/return/create", { title });
};
exports.renderAdminIndex = (req, res) => {
  const title = "الكل";
  res.render("admin/return/index", { title });
};
exports.renderAdminEdit = async (req, res) => {
  const id = req.params.id;
  const oldModel = await ReturnModel.findById(id);
  const title = "تعديل";
  res.render("admin/return/edit", {
    title,
    oldModel: JSON.stringify(oldModel)
  });
};
