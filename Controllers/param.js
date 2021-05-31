const Cart = require('../Database/cart');
const Product = require('../Database/product');
const Wishlist = require('../Database/wishlist');
const Address = require('../Database/address');
var jwt = require('jsonwebtoken');

const isAuthorized = (req, res, next) => {
	const token = req.headers.authorization;
	try {
		const decoded = jwt.verify(token, process.env.SECRET_KEY);
		req.userId = decoded.userId;
		next();
	} catch (error) {
		res
			.status(401)
			.json({ message: 'Unauthorised access, please add the token' });
	}
};

const getCartById = async (req, res, next) => {
	try {
		const cart = await Cart.findById(req.userId);
		if (!cart) {
			const userCart = new Cart({
				_id: req.userId,
			});
			await userCart.save();
			return res.json({ response: userCart.cartItems });
		}
		req.cart = cart;
		next();
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

const getWishlistById = async (req, res, next) => {
	try {
		const wishlist = await Wishlist.findById(req.userId);
		if (!wishlist) {
			const userWishlist = new Wishlist({
				_id: req.userId,
			});
			await userWishlist.save();
			return res.json({ response: userWishlist.wishlistItems });
		}
		req.wishlist = wishlist;
		next();
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

const findProductById = async (req, res, next, id) => {
	await Product.findById(id).exec((err, product) => {
		if (err) {
			res.status(400).json({
				message: 'product not found',
			});
		}
		req.product = product;
		next();
	});
};

const getAddressById = async (req, res, next) => {
	try {
		const address = await Address.findById(req.userId);
		if (!address) {
			const userAddress = new Address({
				_id: req.userId,
			});
			await userAddress.save();
			return res.json({ response: userAddress.addresses });
		}
		req.address = address;
		next();
	} catch (error) {
		return res.status(400).json({ error: error.message });
	}
};

module.exports = {
	isAuthorized,
	getCartById,
	getAddressById,
	getWishlistById,
	findProductById,
};
