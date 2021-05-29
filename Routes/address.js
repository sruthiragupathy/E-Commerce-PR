const express = require('express');
const {
	getAddress,
	addAddress,
	updateAddress,
	deleteAddress,
} = require('../Controllers/address');
const router = express.Router();
const {
	getUserById,
	getAddressById,
	isAuthorized,
} = require('../Controllers/param');

router.get('/address', isAuthorized, getAddressById, getAddress);
router.post('/address', isAuthorized, getAddressById, addAddress);
router.post('/address/:addressId', isAuthorized, getAddressById, updateAddress);
router.delete(
	'/address/:addressId',
	isAuthorized,
	getAddressById,
	deleteAddress,
);

module.exports = router;
