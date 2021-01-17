const express = require("express");
const router = express.Router();
const cardController = require("./controllers/card");

router.get("/category", cardController.showCategories);
router.get("/category/create", cardController.showCategoriesCreate);
router.get("/category/edit/:id", cardController.showCategoriesEdit);
router.put("/category/edit/:id", cardController.editCategory);

router.get("/card", cardController.showCards);
router.get("/card/create", cardController.showCardCreate);
router.get("/card/edit/:id", cardController.showCardEdit);
router.put("/card/edit/:id", cardController.editCard);

router.post("/category/create", cardController.createCategory);
router.post("/card/create", cardController.createCard);
router.delete("/category/delete", cardController.deleteCategory);

module.exports = router;
