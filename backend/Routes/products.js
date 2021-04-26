const express = require("express");
const { getProducts, deleteProducts, findProductById, getProductById } = require("../Controllers/products");
const router = express.Router();
router.param("productId", findProductById)


router.get("/products", getProducts);
router.get("/product/:productId", getProductById);
router.delete("/products/:productId", deleteProducts);

module.exports = router;