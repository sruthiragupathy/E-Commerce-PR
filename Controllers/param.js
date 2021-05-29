const Cart = require('../Database/cart');
const User = require('../Database/user');
const Product = require('../Database/product');
const Wishlist = require('../Database/wishlist');
const Address = require('../Database/address');
var jwt = require('jsonwebtoken');

const isAuthorized = (req, res, next) => {
	const token = req.headers.authorization;
	try {
		const decoded = jwt.verify(token, 'secret');
		req.user = { userId: decoded.userId };
		next();
	} catch (error) {
		res
			.status(401)
			.json({ message: 'Unauthorised access, please add the token' });
	}
};

const getUserById = async (req, res, next) => {
	try {
		const user = await User.findById(req.user.userId);
		if (!user) {
			throw Error('No such user found');
		}
		req.user = user;
		next();
	} catch (error) {
		return res.status(400).json({ success: true, error: error.message });
	}
};

const getCartById = async (req, res, next) => {
	try {
		const cart = await Cart.findById(req.user.userId);
		if (!cart) {
			throw Error('No such cart found');
		}
		req.cart = cart;
		next();
	} catch (error) {
		return res.status(400).json({ success: true, error: error.message });
	}
};

const getWishlistById = async (req, res, next) => {
	try {
		const wishlist = await Wishlist.findById(req.user.userId);
		if (!wishlist) {
			throw Error('No such wishlist found');
		}
		req.wishlist = wishlist;
		next();
	} catch (error) {
		return res.status(400).json({ success: true, error: error.message });
	}
};

const getProductById = async (req, res, next, id) => {
	try {
		const product = await Product.findById(id);
		if (!product) {
			throw Error('No such product found');
		}
		req.product = product;
		next();
	} catch (error) {
		return res.status(400).json({ success: true, error: error.message });
	}
};

const getAddressById = async (req, res, next) => {
	try {
		const address = await Address.findById(req.user.userId);
		req.address = address;
		next();
	} catch (error) {
		return res.status(400).json({ success: true, error: error.message });
	}
};

module.exports = {
	isAuthorized,
	getUserById,
	getCartById,
	getAddressById,
	getWishlistById,
	getProductById,
};
