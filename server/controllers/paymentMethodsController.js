var paymentMethodsModel = require('../models/paymentMethodsModel.js');

/**
 * paymentMethodsController.js
 *
 * @description :: Server-side logic for managing paymentMethodss.
 */
module.exports = {

    /**
     * paymentMethodsController.list()
     */
    list: function (req, res) {
        paymentMethodsModel.find(function (err, paymentMethodss) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting paymentMethods.',
                    error: err
                });
            }
            return res.json(paymentMethodss);
        });
    },

 
    /**
     * paymentMethodsController.show()
     */
    show: function (req, res) {
        var id = req.params.id;
        paymentMethodsModel.findOne({_id: id}, function (err, paymentMethods) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting paymentMethods.',
                    error: err
                });
            }
            if (!paymentMethods) {
                return res.status(404).json({
                    message: 'No such paymentMethods'
                });
            }
            return res.json(paymentMethods);
        });
    },

    /**
     * paymentMethodsController.create()
     */
    create: function (req, res) {
        var paymentMethods = new paymentMethodsModel({
			nameAr : req.body.nameAr,
			nameEn : req.body.nameEn,
			cities : req.body.cities

        });

        paymentMethods.save(function (err, paymentMethods) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when creating paymentMethods',
                    error: err
                });
            }
            return res.status(201).json(paymentMethods);
        });
    },

    /**
     * paymentMethodsController.update()
     */
    update: function (req, res) {
        var id = req.params.id;
        paymentMethodsModel.findOne({_id: id}, function (err, paymentMethods) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting paymentMethods',
                    error: err
                });
            }
            if (!paymentMethods) {
                return res.status(404).json({
                    message: 'No such paymentMethods'
                });
            }

            paymentMethods.nameAr = req.body.nameAr ? req.body.nameAr : paymentMethods.nameAr;
			paymentMethods.nameEn = req.body.nameEn ? req.body.nameEn : paymentMethods.nameEn;
			paymentMethods.cities = req.body.cities ? req.body.cities : paymentMethods.cities;
			
            paymentMethods.save(function (err, paymentMethods) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating paymentMethods.',
                        error: err
                    });
                }

                return res.status(203).json(paymentMethods);
            });
        });
    },

    renderUpdate: async(req,res)=>{
        try{
            const payment = await paymentMethodsModel.findById(req.params.id).populate("cities");
            const title = payment.nameAr;
            res.render("admin/payments/edit",{title,payment:JSON.stringify(payment)})
        }catch(err){
            res.status(404).json(err)
        }
        
    },

    /**
     * paymentMethodsController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;
        paymentMethodsModel.findByIdAndRemove(id, function (err, paymentMethods) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the paymentMethods.',
                    error: err
                });
            }
            return res.status(204).json();
        });
    }
};
