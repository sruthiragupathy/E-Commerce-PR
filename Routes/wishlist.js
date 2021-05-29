const express = require('express');
const {
	getWishlistItems,
	addWishlistItems,
	deleteWishlistItems,
} = require('../Controllers/wishlist');
const router = express.Router();
const {
	getUserById,
	getWishlistById,
	getProductById,
	isAuthorized,
} = require('../Controllers/param');

router.get('/wishlist', isAuthorized, getWishlistById, getWishlistItems);
router.post(
	'/wishlist/:productId',
	isAuthorized,
	getWishlistById,
	addWishlistItems,
);
router.delete(
	'/wishlist/:productId',
	isAuthorized,
	getWishlistById,
	deleteWishlistItems,
);

module.exports = router;
