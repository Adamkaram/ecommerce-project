const express = require('express');
const router = express.Router();
const constantController = require('../controllers/constantController.js');

/**
 * admin routes
 */
router.get("/", constantController.renderAdminIndex);
router.get("/create", constantController.renderCreatePage);

router.get("/edit/:id", constantController.renderAdminEdit);


/*
 * GET
 */
router.get('/paginate', constantController.paginate);

/*
 * GET
 */
router.get('/:id', constantController.show);

/*
 * POST
 */
router.post('/', constantController.create);

/*
 * PUT
 */
router.put('/:id', constantController.edit);

/*
 * DELETE
 */
router.delete('/:id', constantController.remove);

module.exports = router;
