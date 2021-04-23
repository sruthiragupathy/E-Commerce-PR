const express = require("express");
const { getAddress, addAddress, updateAddress, deleteAddress } = require("../Controllers/address");
const router = express.Router();
const {getUserById, getAddressById} = require("../Controllers/param");

router.param("userId", getUserById);
router.param("userId", getAddressById);

router.get("/:userId/address", getAddress);
router.post("/:userId/address", addAddress);
router.post("/:userId/address/:addressId", updateAddress);
router.delete("/:userId/address/:addressId", deleteAddress);

module.exports = router;
