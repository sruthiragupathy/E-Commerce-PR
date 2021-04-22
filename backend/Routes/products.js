const express = require("express");
const { getProducts, deleteProducts, findProductById } = require("../Controllers/products");
const router = express.Router();

router.get("/products", getProducts);
// router.param("productId", findProductById)
router.delete("/products/:productId", deleteProducts);

module.exports = router;