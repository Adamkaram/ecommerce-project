const express = require('express')

const router = express.Router()
const CatController = require('../controllers/category')
router.post('/create',CatController.createCategory)

router.get('/edit/:_id',CatController.showEditPage)
router.put('/update',CatController.updateCategory)
router.delete('/delete',CatController.deleteCategory)
router.post('/upload-image',CatController.uploadImage)
router.get('/',CatController.dashboardIndex)
router.get('/add',CatController.renderAddPage)

module.exports = router