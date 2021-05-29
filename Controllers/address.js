const { extend } = require('lodash');
const { concat } = require('lodash');
exports.getAddress = async (req, res) => {
	const { address } = req;
	try {
		res.json({ response: address.addresses });
	} catch {
		res.status(401).json({ response: error.message });
	}
};

exports.addAddress = async (req, res) => {
	const { address } = req;
	const addAddress = req.body;
	try {
		const updatedAddress = extend(address, {
			addresses: concat(address.addresses, addAddress),
		});
		await updatedAddress.save();
		res.json({ response: updatedAddress.addresses });
	} catch (error) {
		res.status(401).json({ response: error.message });
	}
};

exports.updateAddress = async (req, res) => {
	const { address } = req;
	const { addressId } = req.params;
	const addressFromBody = req.body;

	try {
		let updateAddress = address.addresses.id(addressId);
		updateAddress = extend(updateAddress, addressFromBody);
		address.addresses = extend(address.addresses, updateAddress);
		await address.save();
		address._id = undefined;
		res.json({ response: address });
	} catch (error) {
		res.status(401).json({ response: error.message });
	}
};

exports.deleteAddress = async (req, res) => {
	const { address } = req;
	const { addressId } = req.params;
	try {
		await address.addresses.id(addressId).remove();
		await address.save();
		res.json({ response: address.addresses });
	} catch (error) {
		res.status(401).json({ response: error.message });
	}
};
