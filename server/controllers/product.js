/* eslint-disable @typescript-eslint/explicit-function-return-type */
const Product = require("../models/product");
const Jimp = require("jimp");
const { paginate } = require("../config/helpers");

exports.fetchAllProducts = async (req, res) => {
  const products = await Product.find({}).select({
    title: 1
  });
  res.json({ products });
};

exports.getAllNames = async (req, res) => {
  const products = await Product.find({}).select({ title: 1 });
  res.json({ products });
};

/**
 * paginate products
 */
exports.paginateProduct = async (req, res) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  res.json(
    await paginate(Product, {}, page, limit, { created_at: -1 }, [], {
      title: 1,
      price: 1,
      brand: 1,
      images: 1,
      hasDiscount: 1,
      discountPrice: 1,
      discountEnd: 1
    })
  );
};
exports.search = async (req, res) => {
  const limit = req.query.limit || 20;
  const page = req.query.page || 1;
  let query = req.query.query || "";
  if (query.length > 0) {
    query = query.split(" ").join("|");
  }
  try {
    return res.json(
      await paginate(
        Product,
        {
          $or: [
            { "title.ar": { $regex: query, $options: "i" } },
            { "title.en": { $regex: query, $options: "i" } }
          ]
        },
        page,
        limit,
        { created_at: -1 },
        [],
        {
          title: 1,
          price: 1,
          "pieces.inStock": 1,
          images: 1,
          brand: 1,
          hasDiscount: 1,
          discountPrice: 1,
          discountEnd: 1,
          inStock: 1,
          sold: 1
        }
      )
    );
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};
exports.paginateProductForAdmin = async (req, res) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  let query = req.query.query || "";
  if (query.length > 0) {
    query = query.split(" ").join("|");
  }
  try {
    return res.json(
      await paginate(
        Product,
        { "title.ar": { $regex: query, $options: "i" } },
        page,
        limit,
        { created_at: -1 },
        [],
        {
          title: 1,
          price: 1,
          "pieces.inStock": 1,
          images: 1,
          hasDiscount: 1,
          discountPrice: 1,
          discountEnd: 1,
          inStock: 1,
          sold: 1
        }
      )
    );
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};

/**
 * get products of specific category
 */
exports.paginateProductOfCategory = async (req, res) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const _id = req.query.id || 1;
  const { sort } = req.query;
  let paginateSorting = { created_at: 1 };
  switch (sort) {
    case "latest":
      paginateSorting = { created_at: -1 };
      break;
    case "oldest":
      paginateSorting = { created_at: 1 };
      break;
    case "high":
      paginateSorting = { price: -1 };
      break;
    case "low":
      paginateSorting = { price: 1 };
      break;
    case "top":
      paginateSorting = { sold: -1 };
      break;
    default:
      paginateSorting = { created_at: -1 };
      break;
  }
  let filter = {};
  // eslint-disable-next-line no-unused-expressions
  req.query.offer == 1
    ? (filter = { categories: { $elemMatch: { _id } }, isOffer: true })
    : (filter = { categories: { $elemMatch: { _id } } });
  if (req.query.id == "all") {
    filter = { isOffer: true };
  }
  res.json(await paginate(Product, filter, page, limit, paginateSorting, []));
};

/**
 * @create product
 * @api /admin/product/create
 */
exports.create = async (req, res) => {
  const newProduct = req.body.product;
  try {
    const createdProduct = await Product.create(newProduct);
    if (createdProduct) {
      return res
        .status(200)
        .json({ message: "created", product: createdProduct });
    }
  } catch (err) {
    return res.status(500).send(err);
  }
};
exports.edit = async (req, res) => {
  const newProduct = req.body.product;
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      newProduct._id,
      newProduct
    );
    if (updatedProduct) {
      return res
        .status(200)
        .json({ message: "updated", product: updatedProduct });
    }
  } catch (err) {
    return res.status(411).json({ err });
  }
};

/**
 * @param req Request
 * @param res Response
 * @return response
 * @post /admin/product/upload-images
 */
exports.uploadImages = async (req, res) => {
  const productImages = req.files.images;
  // console.log(productImages)
  const images = [];
  if (productImages.length > 1) {
    await Promise.all(
      productImages.map(async (item, i) => {
        const productImageType = item.mimetype;
        const type = productImageType.split("/")[0];
        if (type != "image") {
          return res.json({ message: "type error" });
        }
        const name = Date.now() + item.name;
        const uploadPath = `${__dirname}/../public/uploads/products/${name}`;
        await item.mv(uploadPath);
        try {
          const img = await Jimp.read(uploadPath);
          const newResizedPhone = await img.resize(200, Jimp.AUTO);
          await newResizedPhone.write(
            `${__dirname}/../public/uploads/products/resized/${name}`
          );
          const newResizedWeb = await img.resize(800, Jimp.AUTO);
          await newResizedWeb.write(
            `${__dirname}/../public/uploads/products/web/${name}`
          );
          images.push(name);
        } catch (error) {
          console.log(error);
        }
      })
    );
  } else {
    const productImageType = productImages.mimetype;
    const type = productImageType.split("/")[0];
    if (type != "image") {
      return res.json({ message: "type error" });
    }
    const name = Date.now() + productImages.name;
    const uploadPath = `${__dirname}/../public/uploads/products/${name}`;
    await productImages.mv(uploadPath);

    Jimp.read(uploadPath, (err, img) => {
      if (err) res.json(err);
      img
        .resize(200, Jimp.AUTO)
        .write(`${__dirname}/../public/uploads/products/resized/${name}`);
    });
    Jimp.read(uploadPath, (err, img) => {
      if (err) res.json(err);
      img
        .resize(800, Jimp.AUTO)
        .write(`${__dirname}/../public/uploads/products/web/${name}`);
    });
    images.push(name);
  }
  return res.json({ message: "done", images });
};

/**
 * @get /api/products/latest?limit
 * @param req
 * @param res
 * @return product Product
 */
exports.getLatestProducts = async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 20;
  try {
    const products = await Product.find({})
      .select({
        title: 1,
        price: 1,
        brand: 1,
        images: 1,
        hasDiscount: 1,
        discountPrice: 1,
        discountEnd: 1,
        isOffer: 1
      })
      .sort({ created_at: -1 })
      .limit(limit);
    return res.status(200).json({ message: "done", products });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.getUnder499 = async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 20;
  try {
    const products = await Product.find({ price: { $lt: 500 } })
      .select({
        title: 1,
        price: 1,
        brand: 1,
        images: 1,
        hasDiscount: 1,
        discountPrice: 1,
        discountEnd: 1,
        isOffer: 1
      })
      .sort({ created_at: -1 })
      .limit(limit);
    return res.status(200).json({ message: "done", products });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.getUnder999 = async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 20;
  try {
    const products = await Product.find({ price: { $lt: 1000, $gt: 499 } })
      .select({
        title: 1,
        price: 1,
        brand: 1,
        images: 1,
        hasDiscount: 1,
        discountPrice: 1,
        discountEnd: 1,
        isOffer: 1
      })
      .sort({ created_at: -1 })
      .limit(limit);
    return res.status(200).json({ message: "done", products });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getBestSeller = async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 20;
  try {
    const products = await Product.find({})
      .select({
        title: 1,
        price: 1,
        brand: 1,
        images: 1,
        hasDiscount: 1,
        discountPrice: 1,
        discountEnd: 1,
        sold: 1,
        isOffer: 1
      })
      .sort({ sold: -1 })
      .limit(limit);
    return res.status(200).json({ message: "done", products });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
exports.getBestSeller2 = async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 20;
  try {
    const products = await Product.find({})
      .select({
        title: 1,
        price: 1,
        brand: 1,
        images: 1,
        hasDiscount: 1,
        discountPrice: 1,
        discountEnd: 1,
        sold: 1,
        isOffer: 1
      })
      .sort({ sold: -1 })
      .skip(20)
      .limit(limit);
    return res.status(200).json({ message: "done", products });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id).select({
      tableOfSpecs: 0,
      tableOfAttrs: 0,
      tableOfPieces: 0,
      attributes: 0,
      reviews: 0
    });
    return res.json({ product });
  } catch (error) {
    return res.status(500).json({ message: "not found" });
  }
};

exports.updateDev = async (req, res) => {
  // const Category = require('../models/category');
  // const category = await Category.findById("5d533acf25de213eef5bed42");
  // await Product.updateMany(({}),{$push:{categories:category}})
  res.send("ok");
};

/**
 * @get admin/product/create
 * @param req Request
 * @param res Response
 * @return response
 */
exports.createPage = (req, res) => {
  const title = "انشاء منتج";
  res.render("admin/product/create", { title });
};
exports.renderAdminIndex = (req, res) => {
  const title = "كافة المنتجات";
  res.render("admin/product/index", { title });
};
exports.renderAdminEdit = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);
  const title = product.title.ar;
  res.render("admin/product/edit", { title, product: JSON.stringify(product) });
};
