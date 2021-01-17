var express = require('express');
var router = express.Router();
var cartItemController = require('../controllers/cartItemController.js');

/*
 * GET
 */
router.get('/', cartItemController.list);

/*
 * GET
 */
router.get('/:id', cartItemController.show);

/*
 * POST
 */
router.post('/', cartItemController.create);

/*
 * PUT
 */
router.put('/:id', cartItemController.update);

/*
 * DELETE
 */
router.delete('/:id', cartItemController.remove);

module.exports = router;
