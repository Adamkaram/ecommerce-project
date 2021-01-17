const Order = require("../../../models/order");
const CartItem = require("../../../models/cartItemModel");
const Product = require("../../../models/product");
const Coupon = require("../../../models/coupon");

exports.create = async (req, res) => {
  const { user } = req;
  const {
    items,
    shippingAddress,
    totalCost,
    paymentMethod,
    isCoupon,
    coupon,
    totalAfterCoupon
  } = req.body;
  const finalPrice = isCoupon ? totalAfterCoupon : totalCost;
  try {
    const order = await Order.create({
      items,
      shippingAddress,
      paymentMethod,
      isCoupon,
      totalCost: finalPrice,
      user: user._id,
      coupon
    });
    let ids = [];
    for (let i = 0; i < items.length; i++) {
      ids.push(items[i]._id);
    }
    let cartItems = await CartItem.find({ _id: ids });
    await Promise.all(
      cartItems.map(async item => {
        item.inCart = false;
        item.save();
        const product = await Product.findById(item.product._id);
        if (item.pieceIndex) {
          product.pieces[item.pieceIndex].inStock -= item.count;
          product.sold += 1;
          product.save();
        } else {
          if (item.product_type === 1) {
            product.inStock -= item.count;
            product.sold += 1;
            product.save();
          }
        }
      })
    );
    if (isCoupon) {
      const usedCoupon = await Coupon.findOne({
        code: {
          $regex: coupon,
          $options: "i"
        }
      });
      if (usedCoupon.uses) {
        usedCoupon.users.push(user._id);
        usedCoupon.uses += 1;
        usedCoupon.save();
      } else {
        usedCoupon.users.push(user._id);
        usedCoupon.uses = 1;
        usedCoupon.save();
      }
      // console.log('coupon after', usedCoupon)
    }
    return res.status(201).json({ message: "created" });
  } catch (error) {
    return res.status(500).json({ message: "error" });
  }
};

exports.fetchUserOrders = async (req, res) => {
  const { user } = req;
  const orders = await Order.find({ user: user._id })
    .populate("items", {
      "product.title": 1,
      "product.category": 1,
      "product.pieces.attributes": 1,
      product_type: 1,
      count: 1,
      pieceIndex: 1,
      cost: 1
    })
    .populate({
      path: "shippingAddress",
      populate: { path: "city", model: "city" }
    })
    .populate("paymentMethod")
    .sort({ created_at: -1 });
  return res.json({ orders });
};

exports.paginate = async (req, res) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const orderPagination = async (page, limit) => {
    const skip = (page - 1) * limit;
    let data = await Order.find({})
      .select({})
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .sort({ created_at: -1 });

    const count = await Order.find({}).countDocuments();
    const pages = Math.ceil(count / limit) == 0 ? 1 : Math.ceil(count / limit);

    return {
      data,
      pages,
      totalItems: count,
      lastPage: pages,
      nextPage: parseInt(page) + 1
    };
  };
  return res.json(await orderPagination(page, limit));
};
/**
 * admin routes
 */
exports.renderAdminIndex = (req, res) => {
  res.render("moderator/orders/index", { title: "كافة الطلبات" });
};
exports.showOrder = async (req, res) => {
  const { id } = req.params;
  const order = await Order.findById(id)
    .populate("items", {
      "product.title": 1,
      "product.category": 1,
      "product._id": 1,
      "product.pieces.attributes": 1,
      product_type: 1,
      count: 1,
      pieceIndex: 1,
      cost: 1
    })
    .populate({
      path: "shippingAddress",
      populate: { path: "city", model: "city" }
    })
    .populate("paymentMethod")
    .populate("user");
  res.render("moderator/orders/show", {
    title: "تحكم بالطلب",
    id: order.id,
    order: JSON.stringify(order)
  });
};

exports.update = async (req, res) => {
  const { id, status } = req.body;
  const order = await Order.findById(id);
  order.status = status;
  order.save();
  return res.json({ message: "done" });
};
