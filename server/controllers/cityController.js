var cityModel = require("../models/cityModel.js");
const paginate = require("../config/helpers").paginate;
/**
 * cityController.js
 *
 * @description :: Server-side logic for managing citys.
 */
module.exports = {
  /**
   * cityController.list()
   */
  list: async (req, res) => {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;

    res.json(await paginate(cityModel, {}, page, limit, {}, []));
  },

  /**
   * cityController.show()
   */
  show: function(req, res) {
    var id = req.params.id;
    cityModel.findOne({ _id: id }, function(err, city) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting city.",
          error: err
        });
      }
      if (!city) {
        return res.status(404).json({
          message: "No such city"
        });
      }
      return res.json(city);
    });
  },

  /**
   * cityController.create()
   */
  create: function(req, res) {
    var city = new cityModel({
      nameAr: req.body.nameAr,
      nameEn: req.body.nameEn,
      shipPrice: req.body.shipPrice
    });

    city.save(function(err, city) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating city",
          error: err
        });
      }
      return res.status(201).json(city);
    });
  },

  /**
   * cityController.update()
   */
  update: function(req, res) {
    var id = req.params.id;
    cityModel.findOne({ _id: id }, function(err, city) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting city",
          error: err
        });
      }
      if (!city) {
        return res.status(404).json({
          message: "No such city"
        });
      }

      city.nameAr = req.body.nameAr ? req.body.nameAr : city.nameAr;
      city.nameEn = req.body.nameEn ? req.body.nameEn : city.nameEn;
      city.shipPrice = req.body.nameEn ? req.body.shipPrice : city.shipPrice;

      city.save(function(err, city) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating city.",
            error: err
          });
        }

        return res.json(city);
      });
    });
  },

  /**
   * cityController.remove()
   */
  remove: function(req, res) {
    var id = req.params.id;
    cityModel.findByIdAndRemove(id, function(err, city) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the city.",
          error: err
        });
      }
      return res.status(204).json();
    });
  },
  renderCreate: function(req, res) {
    const title = "اضافة مدينة";
    res.render("admin/cities/create", { title });
  },
  renderIndex: function(req, res) {
    const title = "كافة المدن";
    res.render("admin/cities/index", { title });
  },
  renderEdit: async (req, res) => {
    const title = "تعديل المدينة";
    const city = await cityModel.findById(req.params.id);
    res.render("admin/cities/edit", { title, city: JSON.stringify(city) });
  }
};
