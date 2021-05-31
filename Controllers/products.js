const Product = require('../Database/product');

const getProducts = async (req, res) => {
	try {
		const products = await Product.find({});
		res.json({ products: products, success: true });
	} catch (error) {
		res.json({ succes: false, error });
	}
};

const getProductById = async (req, res) => {
	const { product } = req;
	try {
		res.json({ response: product, success: true });
	} catch (error) {
		res.json({ succes: false, error });
	}
};

const deleteProducts = async (req, res) => {
	const { productId } = req.params;
	try {
		await Product.remove({ _id: productId });
		res.json({ message: 'Product deleted successfully' });
	} catch (err) {
		res.status(400).json({
			error: 'Failed to delete product',
		});
	}
};

module.exports = {
	getProducts,
	getProductById,
	deleteProducts,
};
