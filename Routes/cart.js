const express = require('express');
const {
	getCartItems,
	addCartItems,
	deleteCartItems,
	updateQuantityOfCartItems,
} = require('../Controllers/cart');
const router = express.Router();
const {
	getCartById,
	getProductById,
	isAuthorized,
} = require('../Controllers/param');

router.param('productId', getProductById);

router.get('/cart', isAuthorized, getCartById, getCartItems);
router.post('/cart/:productId', isAuthorized, getCartById, addCartItems);
router.put(
	'/cart/:productId',
	isAuthorized,
	getCartById,
	updateQuantityOfCartItems,
);
router.delete('/cart/:productId', isAuthorized, getCartById, deleteCartItems);

module.exports = router;
