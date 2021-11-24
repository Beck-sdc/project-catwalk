const router = require('express').Router();
const controller = require('../controllers/products.js')

router.get('/', controller.getAll);
router.get('/:product_id', controller.getOne);
router.get('/:product_id/styles', controller.getProductStyles);
// router.get('/:product_id/related', controller.getRelatedProductIds);

module.exports = router;