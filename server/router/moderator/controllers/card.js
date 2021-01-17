const CardCategory = require("../../../models/cardCategory");
const Card = require("../../../models/card");

const paginate = require("../../../config/helpers").paginate;

exports.showCategories = (req, res) => {
  title = "اقسام البطاقات";
  res.render("moderator/cards/categories/index", { title });
};
exports.showCategoriesCreate = (req, res) => {
  title = "اضافة قسم للبطاقات";
  res.render("moderator/cards/categories/create", { title });
};
exports.showCategoriesEdit = async (req, res) => {
  title = "تعديل ";
  const { id } = req.params;
  const category = await CardCategory.findById(id);
  res.render("moderator/cards/categories/edit", {
    title,
    category: JSON.stringify(category)
  });
  // res.json(category);
};
exports.showCardEdit = async (req, res) => {
  title = "تعديل ";
  const { id } = req.params;
  const category = await Card.findById(id);
  res.render("moderator/cards/cards/edit", {
    title,
    card: JSON.stringify(category)
  });
  // res.json(category);
};

exports.showCards = (req, res) => {
  title = "اقسام البطاقات";
  res.render("moderator/cards/cards/index", { title });
};
exports.showCardCreate = (req, res) => {
  title = "اضافة قسم للبطاقات";
  res.render("moderator/cards/cards/create", { title });
};

exports.createCategory = async (req, res) => {
  if (!req.body.name.ar || !req.body.name.en) {
    return res.json({ message: "الاسم مطلوب" });
  }
  const requestedName = await CardCategory.findOne({ name: req.body.name });
  if (requestedName) {
    return res.json({ message: "الاسم موجود بالفعل" });
  }
  const newCategory = {
    name: req.body.name,
    parentId: null,
    image: req.body.image
  };
  const createdCategory = await CardCategory.create(newCategory);
  if (createdCategory) {
    return res.json({ message: "success", category: createdCategory });
  }
};
exports.editCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const category = await CardCategory.findById(id);
    const { name, image } = req.body;
    if (!name.ar || !name.en || !image) {
      return res.status(500).json({ message: "من فضلك املئ كل الباينات" });
    }
    category.name = name;
    category.image = image;
    await category.save();
    return res.status(200).json({ message: "done" });
  } catch (error) {
    return res.status(404);
  }
};
exports.editCard = async (req, res) => {
  const id = req.params.id;
  try {
    await Card.findByIdAndUpdate(id, req.body.card);
    return res.status(200).json({ message: "success" });
  } catch (error) {
    return res.status(500).json(error);
  }
};

exports.createCard = async (req, res) => {
  if (
    !req.body.title.ar ||
    !req.body.title.ar ||
    !req.body.price ||
    !req.body.category
  ) {
    return res.json({ message: "برجاء ملئ كافة البيانات" });
  }
  const newCategory = {
    title: req.body.title,
    price: req.body.price,
    category: req.body.category,
    image: req.body.image
  };
  const createdCard = await Card.create(newCategory);
  if (createdCard) {
    return res.json({ message: "success" });
  }
};

exports.updateCategory = (req, res) => {
  name = req.body.name;
  if (!name) {
    return res.json({ error: "name required" });
  }
  CardCategory.findById(req.body.id)
    .then(cat => {
      if (!cat) {
        return res.json({ error: "wrong category" });
      }
      cat.name = req.body.name;
      cat.image = req.body.image;
      cat.parentId = req.body.parentId;
      cat.save().then(newCat => {
        res.json({ message: "success", category: newCat });
      });
    })
    .catch(err => {
      return res.json({ message: "cant find category", error: err });
    });
};

exports.deleteCategory = async (req, res) => {
  const categoryToDelete = await CardCategory.findById(req.body.id);
  if (!categoryToDelete) {
    return res.json({ message: "category not found" });
  }
  categoryToDelete.delete();
  return res.json({ message: "deleted" });
};
/**
 *Paginate category
 */
exports.paginateCategories = async (req, res) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;

  res.json(
    await paginate(CardCategory, {}, page, limit, { created_at: -1 }, [])
  );
};
exports.paginateCards = async (req, res) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;

  res.json(
    await paginate(Card, {}, page, limit, { created_at: -1 }, ["category"])
  );
};

exports.getCardsByCategory = async (req, res) => {
  const id = req.query.id;
  const cards = await Card.find({ category: id })
    .populate("category")
    .sort({ created_at: -1 });
  res.json({ cards });
};
