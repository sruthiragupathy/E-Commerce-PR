const Address = require('../Database/address');
const Cart = require('../Database/cart');
const User = require('../Database/user');
const Wishlist = require('../Database/wishlist');
var jwt = require('jsonwebtoken');

//controllers
exports.findUserById = async (req, res, next, id) => {
	await User.findById(id).exec((err, user) => {
		if (err) {
			return res.status(404).json({
				success: false,
				message: 'User Not found',
			});
		}
		req.user = user;
	});
};

exports.getUsersFromDatabase = async (req, res) => {
	try {
		const users = await User.find({});
		res.json({ users: users, success: true });
	} catch (error) {
		res.json({ succes: false, error });
	}
};
exports.signupHandler = async (req, res) => {
	const user = new User(req.body);
	try {
		const token = jwt.sign({ userId: user._id }, 'secret');
		const savedUser = await user.save();
		const userCart = new Cart({
			_id: savedUser._id,
		});
		const savedCart = await userCart.save();
		const userWishlist = new Wishlist({
			_id: savedUser._id,
		});
		const savedWishlist = await userWishlist.save();
		const userAddress = new Address({
			_id: savedUser._id,
		});
		const savedUserAddress = await userAddress.save();
		await Cart.findOne({ _id: savedCart._id })
			.populate('_id')
			.exec(function (err, usercart) {
				console.log('The author is %s', usercart);
			});

		await Wishlist.findOne({ _id: savedWishlist._id })
			.populate('_id')
			.exec(function (err, userWishlist) {
				console.log('The author is %s', userWishlist);
			});

		await Address.findOne({ _id: savedUserAddress._id })
			.populate('_id')
			.exec(function (err, userAddress) {
				console.log('The author is %s', userAddress);
			});

		res.json({
			token,
			user: savedUser,
			userCart: userCart,
			userWishlist: userWishlist,
			userAddress: userAddress,
		});
	} catch (error) {
		res.json({ success: false, error: error.message });
	}
};
exports.loginHandler = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			throw new Error('User does not exist, Signup to enter');
		}
		if (password !== user.password) {
			throw new Error('Email and password does not match');
		}
		const token = jwt.sign({ userId: user._id }, 'secret');
		user.password = undefined;
		user.__v = undefined;
		user.createdAt = undefined;
		user.updatedAt = undefined;
		res.json({
			message: 'Authentication successful',
			response: { token: token, user },
		});
	} catch (error) {
		res.status(401).json({ error: error.message });
	}
};
