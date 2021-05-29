const User = require('../Database/user');

var jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.signupUser = async (req, res) => {
	try {
		//check if user exists
		const user = await User.findOne({ email: req.body.email });
		if (user) {
			return res.json({ message: 'User Already exists' });
		}
		//encrypt password and save new user
		const newUser = new User(req.body);
		const salt = await bcrypt.genSalt(10);
		newUser.password = await bcrypt.hash(newUser.password, salt);
		await newUser.save();
		//generate token
		const token = jwt.sign({ userId: newUser._id }, 'secret', {
			expiresIn: '24h',
		});

		res.json({
			response: {
				token,
				user: newUser.firstName,
			},
		});
	} catch (error) {
		res.status(401).json({ error: error.message });
	}
};

exports.loginUser = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });

		if (!user) {
			throw new Error('User does not exist, Signup to enter');
		}

		//decrypt password and validate
		const isPasswordValid = await bcrypt.compare(password, user.password);
		if (!isPasswordValid) {
			throw new Error('Email and password does not match');
		}
		//generate token
		const token = jwt.sign({ userId: user._id }, 'secret', {
			expiresIn: '24h',
		});

		res.json({
			message: 'Authentication successful',
			response: { token: token, user: user.firstName },
		});
	} catch (error) {
		res.status(401).json({ error: error.message });
	}
};
