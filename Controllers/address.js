const { extend } = require('lodash');
const { concat } = require('lodash');

const getAddress = async (req, res) => {
	const { address } = req;
	try {
		res.json({ response: address.addresses });
	} catch {
		res.status(401).json({ response: error.message });
	}
};

const addAddress = async (req, res) => {
	const { address } = req;
	const { addAddress } = req.body;
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

const updateAddress = async (req, res) => {
	const { address } = req;
	const { addressId } = req.params;
	const { addressFromBody } = req.body;
	let updateAddress = address.addresses.id(addressId);
	updateAddress = extend(updateAddress, { ...addressFromBody });
	address.addresses = extend(address.addresses, { updateAddress });
	try {
		await address.save();
		res.json({ success: true, response: address });
	} catch (error) {
		res.json({ success: false, response: error.message });
	}
};

const deleteAddress = async (req, res) => {
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

module.exports = {
	getAddress,
	addAddress,
	updateAddress,
	deleteAddress,
};
