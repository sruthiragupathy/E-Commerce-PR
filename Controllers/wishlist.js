const Wishlist = require('../Database/wishlist');
const _ = require('lodash');

exports.getWishlistItems = async (req, res) => {
	const { wishlist } = req;
	try {
		await wishlist.populate('wishlistItems.product').execPopulate();
		res.json({ response: wishlist });
	} catch (error) {
		res.status(401).json({ response: error.message });
	}
};

exports.addWishlistItems = async (req, res) => {
	const { productId } = req.params;
	const { wishlist } = req;
	try {
		if (!wishlist.wishlistItems.id(productId)) {
			const addProductToWishlist = _.extend(wishlist, {
				wishlistItems: _.concat(wishlist.wishlistItems, {
					_id: productId,
					product: productId,
				}),
			});
			await addProductToWishlist.save();
			await addProductToWishlist
				.populate('wishlistItems.product')
				.execPopulate();
			res.json({ response: wishlist });
		}
	} catch (error) {
		res.status(401).json({ response: error.message });
	}
};

exports.deleteWishlistItems = async (req, res) => {
	const { productId } = req.params;
	const { wishlist } = req;
	try {
		await wishlist.wishlistItems.id(productId).remove();
		await wishlist.save();
		await wishlist.populate('wishlistItems.product').execPopulate();
		res.json({ response: wishlist });
	} catch (error) {
		res.status(401).json({ response: error.message });
	}
};
