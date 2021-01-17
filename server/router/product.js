const express = require("express");

const router = express.Router();
const ProductController = require("../controllers/product");
//fetching all products /app/products/all

/**
 * create new product
 */
router.get("/", ProductController.renderAdminIndex);
router.get("/create", ProductController.createPage);
router.get("/paginate", ProductController.paginateProductForAdmin);
router.get("/edit/:id", ProductController.renderAdminEdit);
router.get("/fetch-all", ProductController.fetchAllProducts);

router.post("/create", ProductController.create);
router.post("/edit", ProductController.edit);
router.post("/upload-images", ProductController.uploadImages);
router.get("/dev", ProductController.updateDev);
router.get("/all-names", ProductController.getAllNames);

module.exports = router;
