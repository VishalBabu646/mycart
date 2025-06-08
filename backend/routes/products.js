const express = require('express');
const { getProducts, getNewProduct, getsingleProduct, updateProduct, deleteProduct } = require('../controllers/productController');
const { isAuthenticatedUser, authoriseRole } = require('../middlewares/authenticate');
const router = express.Router();

router.route('/products').get(getProducts);
router.route('/product/new').post(isAuthenticatedUser,authoriseRole('admin'),getNewProduct)
router.route('/productsingle/:id').get(isAuthenticatedUser,authoriseRole('admin'),getsingleProduct).put(isAuthenticatedUser,authoriseRole('admin'),updateProduct).delete(isAuthenticatedUser,authoriseRole('admin'),deleteProduct);

module.exports = router;