const Coupon = require("../models/coupon");
const paginate = require("../config/helpers").paginate;
exports.create = async (req, res) => {
  const newCoupon = req.body.newCoupon;
  try {
    const createdCoupon = await Coupon.create(newCoupon);
    return res.status(201).json({
      message: "success"
    });
  } catch (err) {
    return res.status(500).send(err);
  }
};

exports.paginate = async (req, res) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  res.json(
    await paginate(
      Coupon,
      {},
      page,
      limit,
      {
        created_at: -1
      },
      []
    )
  );
};
exports.update = async (req, res) => {
  try {
    await Coupon.findByIdAndUpdate(req.params.id, req.body.model);
    return res.status(201).json({ message: "done" });
  } catch (error) {}
};
exports.delete = async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    await coupon.delete();
    return res.status(204).json({ message: "done" });
  } catch (error) {}
};
exports.handle = async (req, res) => {
  const ids = req.body.ids;
  const total = req.body.total;
  const user = req.user._id;
  const code = req.body.code;
  try {
    const coupon = await Coupon.findOne({
      code: {
        $regex: code,
        $options: "i"
      }
    });
    // check the minimum total
    if (total < coupon.min) {
      return res.status(410).json({
        message: "total"
      });
    }
    //check if user already used
    if (coupon.users) {
      if (coupon.users.includes(user)) {
        return res.status(411).json({
          message: "already used"
        });
      }
    }
    //check if exist category or product
    function findCommonElement(array1, array2) {
      for (let i = 0; i < array1.length; i++) {
        for (let j = 0; j < array2.length; j++) {
          if (array1[i] == array2[j]) {
            return true;
          }
        }
      }
      return false;
    }
    let arrayOfProductIds = [];
    if (coupon.product.length > 0) {
      for (let i = 0; i < coupon.product.length; i++) {
        arrayOfProductIds.push(coupon.product[i]._id);
      }
    }
    const intersectionProducts = findCommonElement(ids, arrayOfProductIds);
    const intersectionCategories = findCommonElement(ids, coupon.category);
    if (!intersectionCategories && !intersectionProducts) {
      return res.status(412).json({
        message: "not include valid"
      });
    }
    return res.status(200).json({
      discount: coupon.discount
    });
  } catch (error) {
    return res.status(404).json(error);
  }
};

//renders
exports.renderAdminCreate = (req, res) => {
  const title = "انشاء كوبون";
  res.render("admin/coupons/create", {
    title
  });
};
exports.renderAdminIndex = (req, res) => {
  const title = "كافة الكوبونات";
  res.render("admin/coupons/index", {
    title
  });
};
exports.renderEditAdmin = async (req, res) => {
  const title = "تعديل كوبون";
  const coupon = await Coupon.findById(req.params.id).populate("category");
  res.render("admin/coupons/edit", {
    title,
    coupon: JSON.stringify(coupon)
  });
};
