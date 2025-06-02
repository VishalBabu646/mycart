const express = require('express');
const { getProducts, getNewProduct, getsingleProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const router = express.Router();

router.route('/products').get(getProducts);
router.route('/product/new').post(getNewProduct)
router.route('/productsingle/:id').get(getsingleProduct).put(updateProduct).delete(deleteProduct);

module.exports = router;