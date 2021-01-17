const Product = require("../../../models/product");
const Jimp = require("jimp");
const paginate = require("../../../config/helpers").paginate;

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
exports.paginateProductForAdmin = async (req, res) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  res.json(
    await paginate(Product, {}, page, limit, { created_at: -1 }, [], {
      title: 1,
      price: 1,
      "pieces.inStock": 1,
      images: 1,
      hasDiscount: 1,
      discountPrice: 1,
      discountEnd: 1,
      inStock: 1,
      sold: 1
    })
  );
};

/**
 * get products of specific category
 */
exports.paginateProductOfCategory = async (req, res) => {
  const limit = req.query.limit || 10;
  const page = req.query.page || 1;
  const _id = req.query.id || 1;
  const sort = req.query.sort;
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
  let newProduct = req.body.product;
  // const createdProduct = Product.create(newProduct,(err,product)=>{
  //   if(err) throw err;
  //   return res.status(200).json({message:'done',product})
  // });
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
  let newProduct = req.body.product;
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
  let productImages = req.files.images;
  // console.log(productImages)
  let images = [];
  if (productImages.length > 1) {
    await Promise.all(
      productImages.map(async (item, i) => {
        let productImageType = item.mimetype;
        let type = productImageType.split("/")[0];
        if (type != "image") {
          return res.json({ message: "type error" });
        }
        let name = Date.now() + item.name;
        let uploadPath = __dirname + "/../public/uploads/products/" + name;
        const uploaded = await item.mv(uploadPath);
        try {
          let img = await Jimp.read(uploadPath);
          let newResized = await img.resize(200, 300);
          await newResized.write(
            __dirname + "/../public/uploads/products/resized/" + name
          );
          images.push(name);
        } catch (error) {}
      })
    );
  } else {
    let productImageType = productImages.mimetype;
    let type = productImageType.split("/")[0];
    if (type != "image") {
      return res.json({ message: "type error" });
    }
    let name = Date.now() + productImages.name;
    let uploadPath = __dirname + "/../public/uploads/products/" + name;
    const uploaded = await productImages.mv(uploadPath);

    Jimp.read(uploadPath, (err, img) => {
      if (err) res.json(err);
      img
        .resize(200, 300)
        .write(__dirname + "/../public/uploads/products/resized/" + name);
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
  const limit = parseInt(req.query.limit) || 20;
  try {
    const products = await Product.find({})
      .select({
        title: 1,
        price: 1,
        brand: 1,
        images: 1,
        hasDiscount: 1,
        discountPrice: 1,
        discountEnd: 1
      })
      .sort({ created_at: -1 })
      .limit(limit);
    return res.status(200).json({ message: "done", products });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

exports.getBestSeller = async (req, res) => {
  const limit = parseInt(req.query.limit) || 20;
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
        sold: 1
      })
      .sort({ sold: -1 })
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
  res.render("moderator/product/create", { title });
};
exports.renderAdminIndex = (req, res) => {
  const title = "كافة المنتجات";
  res.render("moderator/product/index", { title });
};
exports.renderAdminEdit = async (req, res) => {
  const id = req.params.id;
  const product = await Product.findById(id);
  const title = product.title.ar;
  res.render("moderator/product/edit", {
    title,
    product: JSON.stringify(product)
  });
};
