const express = require("express");
const { getWishlistItems, addWishlistItems, deleteWishlistItems } = require("../Controllers/wishlist");
 const router = express.Router();
 const {getUserById, getWishlistById, getProductById} = require("../Controllers/param");

 router.param("userId", getUserById);
 router.param("userId", getWishlistById);
 router.param("productId", getProductById);

router.get("/:userId/wishlist", getWishlistItems);
router.post("/:userId/wishlist/:productId", addWishlistItems);
router.delete("/:userId/wishlist/:productId", deleteWishlistItems);



module.exports = router;
