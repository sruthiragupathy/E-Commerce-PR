 const express = require("express");
const { getCartItems, addCartItems, deleteCartItems, updateQuantityOfCartItems } = require("../Controllers/cart");
 const router = express.Router();
 const {getUserById, getCartById, getProductById} = require("../Controllers/param");

router.param("userId", getUserById);
router.param("userId", getCartById);
router.param("productId", getProductById);

router.get("/:userId/cart", getCartItems);
router.post("/:userId/cart/:productId", addCartItems);
router.put("/:userId/cart/:productId", updateQuantityOfCartItems);
router.delete("/:userId/cart/:productId", deleteCartItems);

module.exports = router;
