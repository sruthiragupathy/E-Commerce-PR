const _ = require('lodash');
exports.getAddress = async (req, res) => {
	const { address } = req;
	try {
		res.json({ response: address });
	} catch {
		res.status(401).json({ response: error.message });
	}
};

exports.addAddress = async (req, res) => {
	const { address } = req;
	const addAddress = req.body;
	try {
		const updatedAddress = _.extend(address, {
			addresses: _.concat(address.addresses, { ...addAddress }),
		});
		await updatedAddress.save();
		res.json({ response: updatedAddress });
	} catch (error) {
		res.status(401).json({ response: error.message });
	}
};

exports.updateAddress = async (req, res) => {
	const { address } = req;
	const { addressId } = req.params;
	const addressFromBody = req.body;
	let updateAddress = address.addresses.id(addressId);
	updateAddress = _.extend(updateAddress, { ...addressFromBody });
	address.addresses = _.extend(address.addresses, { updateAddress });
	try {
		await address.save();
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
		res.json({ response: address });
	} catch (error) {
		res.status(401).json({ response: error.message });
	}
};
