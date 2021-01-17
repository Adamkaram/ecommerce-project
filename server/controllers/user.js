const User = require("../models/user");
const paginate = require("../config/helpers").paginate;

/**
 * paginate throw User
 */
exports.paginate = async (req, res) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const query = req.query.query || "";
  try {
    res.json(
      await paginate(
        User,
        { "role.id": 0, name: { $regex: query, $options: "i" } }, //filter
        page,
        limit,
        { created_at: -1 }, //sort
        [], // populate
        {} // select fields
      )
    );
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

/**
 * update User
 */

exports.edit = async (req, res) => {
  let newModel = req.body.newModel;
  try {
    const updatedModel = await User.findByIdAndUpdate(newModel._id, newModel);
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

exports.changeName = async (req, res) => {
  const name = req.body.name;
  try {
    await User.findByIdAndUpdate(req.user._id, { $set: { name } });
    return res.status(200).json({ message: "updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
const bcrypt = require("bcryptjs");

exports.changePass = async (req, res) => {
  const password = req.body.password;
  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    await User.findByIdAndUpdate(req.user._id, { $set: { password: hash } });
    return res.status(200).json({ message: "updated" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};
/**
 * find User by id
 */

exports.show = async (req, res) => {
  const { id } = req.params;
  try {
    const model = await User.findById(id);
    return res.json({ model });
  } catch (error) {
    return res.status(500).json({ message: "not found" });
  }
};
/**
 * delete User by id
 */

exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    const model = await User.findOneAndDelete(id);
    return res.status(200).json({ message: "deleted" });
  } catch (error) {
    return res.status(500).json({ message: "not found" });
  }
};

exports.renderAdminIndex = (req, res) => {
  const title = "الكل";
  res.render("admin/user/index", { title });
};
exports.renderAdminEdit = async (req, res) => {
  const id = req.params.id;
  const oldModel = await User.findById(id);
  const title = "تعديل";
  res.render("admin/user/edit", {
    title,
    oldModel: JSON.stringify(oldModel)
  });
};
