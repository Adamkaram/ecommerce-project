const ConstantModel = require("../models/constantModel.js");
const paginate = require("../config/helpers").paginate;

/**
 * paginate throw ConstantModel
 */
exports.paginate = async (req, res) => {
  const limit = req.query.limit || 50;
  const page = req.query.page || 1;
  res.json(
    await paginate(
      ConstantModel,
      {}, //filter
      page,
      limit,
      { created_at: -1 }, //sort
      [], // populate
      {} // select fields
    )
  );
};
/**
 * create ConstantModel
 */
exports.create = async (req, res) => {
  let newModel = req.body.newModel;
  try {
    const createdModel = await ConstantModel.create(newModel);
    if (createdModel) {
      return res.status(200).json({ message: "created", model: createdModel });
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};

/**
 * update ConstantModel
 */

exports.edit = async (req, res) => {
  let newModel = req.body.newModel;
  try {
    const updatedModel = await ConstantModel.findByIdAndUpdate(
      newModel._id,
      newModel
    );
    if (updatedModel) {
      return res
        .status(200)
        .json({ message: "updated", newModel: updatedModel });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err });
  }
};

/**
 * find ConstantModel by id
 */

exports.show = async (req, res) => {
  const { id } = req.params;
  try {
    const model = await ConstantModel.findById(id);
    return res.json({ model });
  } catch (error) {
    return res.status(500).json({ message: "not found" });
  }
};
/**
 * delete ConstantModel by id
 */

exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    const model = await ConstantModel.findOneAndDelete(id);
    return res.status(200).json({ message: "deleted" });
  } catch (error) {
    return res.status(500).json({ message: "not found" });
  }
};

exports.renderCreatePage = (req, res) => {
  const title = "انشاء ";
  res.render("admin/constant/create", { title });
};
exports.renderAdminIndex = (req, res) => {
  const title = "الكل";
  res.render("admin/constant/index", { title });
};
exports.renderAdminEdit = async (req, res) => {
  const id = req.params.id;
  const oldModel = await ConstantModel.findById(id);
  const title = "تعديل";
  res.render("admin/constant/edit", {
    title,
    oldModel: JSON.stringify(oldModel)
  });
};
