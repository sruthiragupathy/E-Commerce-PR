const Cart = require("../Database/cart");
const _ = require('lodash');

exports.getCartItems = async (req,res) => {
    let {cart} = req
    try {
        cart = await cart.populate('cartItems.product').execPopulate()
        res.json({success:true, response: cart})
    }
    catch(error) {
        res.json({success: false, response: error.message})
    }
}

exports.addCartItems = async (req,res) => {
    let {product} = req;
    let {cart} = req;
    try {
        if(!cart.cartItems.id(product._id)){
            cart = _.extend(cart, {cartItems: _.concat(cart.cartItems,{_id:product._id, product: product._id, quantity: 1})})
            cart = await cart.save()
            cart = await cart.populate('cartItems.product').execPopulate()
            res.json({success:true, response: cart})
        }
        else {
            res.json({success:true, response: "already exists in cart"})
        }
    }
    catch(error) {
        res.json({success: false, response: error.message});
    }
}

exports.updateQuantityOfCartItems = async (req, res) => {
    let cart = req.cart;
    const { productId } = req.params;
    const {quantity} = req.body;
    let updateCartItem = cart.cartItems.id(productId)
    updateCartItem = _.extend(updateCartItem,{quantity: quantity})
    cart.cartItems = _.extend(cart.cartItems,{updateCartItem});
    try {
    //   cart = await cart.save((err, cart) => {
    //       res.json({success: true, response: cart})
    //   })
        await cart.save()
        cart = await cart.populate('cartItems.product').execPopulate()
        res.json({success:true, response: cart})
    }
    catch(error) {
        res.json({success: false, response: error.message})
    }
}

exports.deleteCartItems = async (req, res) => {
    let {product} = req;
    let {cart} = req;
    try{
        await cart.cartItems.id(product._id).remove()
        await cart.save()
        cart = await cart.populate('cartItems.product').execPopulate()
        res.json({success:true, response: cart})
    }
    catch(error) {
        res.json({ success: false, message: error.message })
    }
}