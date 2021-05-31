const { extend, concat } = require('lodash');

const getCartItems = async (req, res) => {
	const { cart } = req;
	try {
		await cart.populate('cartItems.product').execPopulate();
		res.json({ response: cart.cartItems });
	} catch (error) {
		res.status(400).json({ response: error.message });
	}
};

const addCartItems = async (req, res) => {
	const { product } = req;
	const { cart } = req;
	try {
		if (!cart.cartItems.id(product._id)) {
			const newProduct = {
				_id: product._id,
				product: product._id,
				quantity: 1,
			};
			const updateCart = extend(cart, {
				cartItems: concat(cart.cartItems, newProduct),
			});
			await updateCart.save();
			await updateCart.populate('cartItems.product').execPopulate();
			res.json({ response: cart.cartItems });
		} else {
			res.json({ response: 'already exists in cart' });
		}
	} catch (error) {
		res.status(401).json({ response: error.message });
	}
};

const updateQuantityOfCartItems = async (req, res) => {
	const { cart } = req;
	const { productId } = req.params;
	const { quantity } = req.body;
	let updateCartItem = cart.cartItems.id(productId);
	updateCartItem = extend(updateCartItem, { quantity: quantity });
	cart.cartItems = extend(cart.cartItems, { updateCartItem });
	try {
		await cart.save();
		await cart.populate('cartItems.product').execPopulate();
		res.json({ response: cart.cartItems });
	} catch (error) {
		res.json({ success: false, response: error.message });
	}
};

const deleteCartItems = async (req, res) => {
	const { productId } = req.params;
	const { cart } = req;
	try {
		await cart.cartItems.id(productId).remove();
		await cart.save();
		await cart.populate('cartItems.product').execPopulate();
		res.json({ response: cart.cartItems });
	} catch (error) {
		res.status(401).json({ response: error.message });
	}
};

module.exports = {
	getCartItems,
	addCartItems,
	updateQuantityOfCartItems,
	deleteCartItems,
};
