/**
 * Custom pagination for product with count of products
 * @param Model
 * @param page
 * @param limit
 * @param sort
 * @param populate
 */
exports.paginateCategory = async (Model, page, limit, sort, populate) => {
  const Product = require("../models/product");
  const count = await Model.countDocuments();
  const pages = Math.ceil(count / limit);
  const skip = (page - 1) * limit;
  const productCount = async item => {
    const number = await Product.find().countDocuments();
    return number;
  };
  let data = await Model.find()
    .populate(populate)
    .limit(parseInt(limit))
    .skip(parseInt(skip))
    .sort(sort);
  let data2 = await Promise.all(
    data.map(async item => {
      item.set(
        "productCount",
        await Product.find({
          categories:  item._id 
        }).countDocuments(),
        { strict: false }
      );
      return item;
    })
  );
  return {
    data: data2,
    pages,
    totalItems: count,
    lastPage: pages,
    nextPage: parseInt(page) + 1
  };
};

exports.paginate = async (
  Model,
  filter,
  page,
  limit,
  sort,
  populate,
  selected
) => {
  const skip = (page - 1) * limit;
  const select = selected || {};
  let data = await Model.find(filter)
    .select(select)
    .populate(populate)
    .limit(parseInt(limit))
    .skip(parseInt(skip))
    .sort(sort);

  const count = await Model.find(filter).countDocuments();
  const pages = Math.ceil(count / limit) == 0 ? 1 : Math.ceil(count / limit);

  return {
    data,
    pages,
    totalItems: count,
    lastPage: pages,
    nextPage: parseInt(page) + 1
  };
};
