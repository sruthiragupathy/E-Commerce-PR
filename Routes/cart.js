const express = require('express');
const {
	getCartItems,
	addCartItems,
	deleteCartItems,
	updateQuantityOfCartItems,
} = require('../Controllers/cart');

const {
	getCartById,
	findProductById,
	isAuthorized,
} = require('../Controllers/param');
const router = express.Router();

router.param('productId', findProductById);

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
