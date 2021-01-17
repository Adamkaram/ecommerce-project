const User = require("../models/user");
const bcrypt = require("bcryptjs");
const paginate = require("../config/helpers").paginate;

/**
 * paginate throw moderator
 */
exports.paginate = async (req, res) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  res.json(
    await paginate(
      User,
      { "role.id": 1 }, //filter
      page,
      limit,
      { created_at: -1 }, //sort
      ["controlledCategories"], // populate
      {} // select fields
    )
  );
};
/**
 * create moderator
 */
exports.create = async (req, res) => {
  try {
    let newUser = {
      email: req.body.email,
      password: req.body.password,
      phone: req.body.phone,
      name: req.body.name,
      username: req.body.username,
      role: [{ id: 1 }],
      rules: req.body.rules,
      controlledCategories: req.body.controlledCategories
    };
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(req.body.password, salt);
    newUser.password = hash;
    await User.create(newUser);
    return res.status(201).json({ message: "done" });
  } catch (error) {
    return res.status(500).json({ error });
  }
};

/**
 * update moderator
 */

exports.edit = async (req, res) => {
  let newModel = req.body.newModel;
  try {
    const newPassword = newModel.password;
    if (newPassword != null) {
      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(newPassword, salt);
      newModel.password = hash;
    }
    if (newPassword == null) {
      const oldUser = await User.findById(newModel._id);
      newModel.password = oldUser.password;
    }
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
/**
 * delete moderator by id
 */

exports.remove = async (req, res) => {
  const { id } = req.params;
  try {
    const model = await User.findOneAndDelete(id);
    return res.status(200).json({ model });
  } catch (error) {
    return res.status(500).json({ message: "not found" });
  }
};

/**
 * renders
 */
exports.renderAdminIndex = (req, res) => {
  const title = "الكل";
  res.render("admin/moderator/index", { title });
};
exports.renderAdminCreate = (req, res) => {
  const title = "انشاء ";
  res.render("admin/moderator/create", { title });
};
exports.renderAdminEdit = async (req, res) => {
  const title = "تعديل ";
  const model = await User.findById(req.params.id).populate(
    "controlledCategories"
  );
  res.render("admin/moderator/edit", {
    title,
    model: JSON.stringify(model)
  });
};
