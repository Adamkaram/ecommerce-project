var express = require('express');
var router = express.Router();
var paymentMethodsController = require('../controllers/paymentMethodsController.js');

/*
 * GET
 */
router.get('/index', paymentMethodsController.list);
router.get('/', (req,res)=>{
	title="وسائل الدفع";
	res.render("admin/payments/index",{title})
});


/*
 * GET
 */
router.get('/:id', paymentMethodsController.show);

/*
 * POST
 */
router.post('/', paymentMethodsController.create);

/*
 * PUT
 */
router.put('/:id', paymentMethodsController.update);
router.get('/edit/:id', paymentMethodsController.renderUpdate);

/*
 * DELETE
 */
router.delete('/:id', paymentMethodsController.remove);

module.exports = router;
