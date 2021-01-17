var AddressModel = require("../models/AddressModel.js");

/**
 * AddressController.js
 *
 * @description :: Server-side logic for managing Addresss.
 */
module.exports = {
  /**
   * AddressController.list()
   */
  list: async (req, res) => {
    const adds = await AddressModel.find({ user: req.user._id }).populate(
      "city"
    );
    return res.json({ adds });
  },

  /**
   * AddressController.create()
   */
  create: function(req, res) {
    var Address = new AddressModel({
      city: req.body.city,
      street: req.body.street,
      details: req.body.details,
      user: req.user._id,
      phone: req.body.phone
    });
    Address.save(function(err, Address) {
      if (err) {
        return res.status(500).json({
          message: "Error when creating Address",
          error: err
        });
      }
      return res.status(201).json(Address);
    });
  },

  /**
   * AddressController.update()
   */
  update: function(req, res) {
    var id = req.params.id;
    AddressModel.findOne({ _id: id }, function(err, Address) {
      if (err) {
        return res.status(500).json({
          message: "Error when getting Address",
          error: err
        });
      }
      if (!Address) {
        return res.status(404).json({
          message: "No such Address"
        });
      }

      Address.city = req.body.city ? req.body.city : Address.city;
      Address.street = req.body.street ? req.body.street : Address.street;
      Address.details = req.body.details ? req.body.details : Address.details;
      Address.user = req.body.user ? req.body.user : Address.user;
      Address.phone = req.body.phone ? req.body.phone : Address.phone;

      Address.save(function(err, Address) {
        if (err) {
          return res.status(500).json({
            message: "Error when updating Address.",
            error: err
          });
        }

        return res.json(Address);
      });
    });
  },

  /**
   * AddressController.remove()
   */
  remove: function(req, res) {
    var id = req.params.id;
    AddressModel.findByIdAndRemove(id, function(err, Address) {
      if (err) {
        return res.status(500).json({
          message: "Error when deleting the Address.",
          error: err
        });
      }
      return res.status(204).json();
    });
  }
};
