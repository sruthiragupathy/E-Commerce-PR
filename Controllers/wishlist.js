const Wishlist = require("../Database/wishlist");
const _ = require('lodash');

exports.getWishlistItems = async (req,res) => {
    let {wishlist} = req
    console.log({wishlist});
    try {
        wishlist = await wishlist.populate('wishlistItems.product').execPopulate()
        res.json({success:true, response: wishlist})
    }
    catch(error) {
        res.json({success: false, response: error.message})
    }
}

exports.addWishlistItems = async (req,res) => {
    const {product} = req;
    let {wishlist} = req;
    try {
        if(!wishlist.wishlistItems.id(product._id)){
            wishlist = _.extend(wishlist, {wishlistItems: _.concat(wishlist.wishlistItems,{_id:product._id, product: product._id})})
            wishlist = await wishlist.save()
            wishlist = await wishlist.populate('wishlistItems.product').execPopulate()
            res.json({success:true, response: wishlist})
            }
    }
    catch(error) {
        res.json({success: false, response: error.message});
    }
}

exports.deleteWishlistItems = async (req, res) => {
    const {product} = req;
    let {wishlist} = req;
    try{
        await wishlist.wishlistItems.id(product._id).remove()
        await wishlist.save()
        wishlist = await wishlist.populate('wishlistItems.product').execPopulate()
        res.json({success:true, response: wishlist})
    }
    catch(error) {
        res.json({ success: false, response: error.message })
    }
}