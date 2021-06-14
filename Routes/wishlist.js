const express = require('express');
const {
	getWishlistItems,
	addWishlistItems,
	deleteWishlistItems,
} = require('../Controllers/wishlist');
const { getWishlistById, isAuthorized } = require('../Controllers/param');
const router = express.Router();

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
