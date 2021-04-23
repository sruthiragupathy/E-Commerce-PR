const Cart = require("../Database/cart");
const User = require("../Database/user")
const Product = require("../Database/product");
const Wishlist = require("../Database/wishlist");
const Address = require("../Database/address");


exports.getUserById = async (req,res,next,id) => {
    try{
    const user = await User.findById(id);
    if(!user){
        throw Error("No such user found");
    }
    req.user = user;
    next();
    }
    catch(error) {
        return res.status(400).json({success: true, error: error.message})
    }
}

exports.getCartById = async (req,res,next,id) => {
    try{
    const cart = await Cart.findById(id);
    if(!cart){
        throw Error("No such cart found");
    }
    req.cart = cart;
    next();
    }
    catch(error) {
        return res.status(400).json({success: true, error: error.message})
    }
}


exports.getWishlistById = async (req,res,next,id) => {
    try{
    const wishlist = await Wishlist.findById(id);
    console.log({wishlist});
    if(!wishlist){
        throw Error("No such wishlist found");
    }
    req.wishlist = wishlist;
    next();
    }
    catch(error) {
        return res.status(400).json({success: true, error: error.message})
    }
}


exports.getProductById = async (req,res,next,id) => {
    try{
    const product = await Product.findById(id);
    if(!product){
        throw Error("No such product found");
    }
    req.product = product;
    next();
    }
    catch(error) {
        return res.status(400).json({success: true, error: error.message})
    }
}

exports.getAddressById = async (req, res, next, id) => {
    try {
        const address = await Address.findById(id)
        req.address = address;
        next();
    }
    catch(error) {
            return res.status(400).json({success: true, error: error.message})
        }
}