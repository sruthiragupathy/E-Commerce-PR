const Address = require("../Database/address");
const Cart = require("../Database/cart");
const User = require("../Database/user");
const Wishlist = require("../Database/wishlist");


//Error constructors
class LoginError extends Error {
    constructor(message) {
      super(message);
      this.name = "LoginError";
    }
  }

class AuthError extends Error {
    constructor(message) {
      super(message);
      this.name = "AuthError";
    }
  }

//controllers
    exports.findUserById = async (req, res, next, id) => {
     await User.findById(id).exec(( err, user) => {
         if(err) {
             return res.status(404).json({
                 success:false, message: "User Not found"
             })
         }
         req.user = user;
     })
    }

    exports.getUsersFromDatabase = async (req, res) =>{
        try{
            const users = await User.find({});
            res.json({users: users, success: true})
        }
        catch(error) {
            res.json({ succes:false, error })
        }
    }
    exports.signupHandler = async (req, res) => {
        const user = new User(req.body);
        try{
            const savedUser = await user.save()
            const userCart = new Cart({
                _id: savedUser._id
            })
            const savedCart = await userCart.save();
            const userWishlist = new Wishlist({
                _id: savedUser._id
            })
            const savedWishlist = await userWishlist.save();
            const userAddress = new Address({
                _id: savedUser._id
            })
            const savedUserAddress = await userAddress.save();
            await Cart.findOne({ _id: savedCart._id })
            .populate('_id')
            .exec(function (err, usercart) {
            console.log('The author is %s', usercart);
            })

            await Wishlist.findOne({_id:savedWishlist._id})
            .populate('_id')
            .exec(function (err, userWishlist) {
                console.log('The author is %s', userWishlist);
                })

            await Address.findOne({_id: savedUserAddress._id})
            .populate('_id')
            .exec(function (err, userAddress) {
                console.log('The author is %s', userAddress);
                })
      
            res.json({success:true, user: savedUser, userCart: userCart, userWishlist: userWishlist, userAddress: userAddress })

        }
        catch(error) {
            res.json({success: false, 
                error: error.message
            })
        }
    }
    exports.loginHandler = async (req,res) => {
        const {email, password} = req.body;
        try {
            const user = await User.find({email: email})
            if(!user.length) {
                throw new Error("User does not exist, Signup to enter")
            }
            if( password !== user[0].password) {
                throw new Error("Email and password does not match");
            }
            res.json ({ success: true, message: "Authentication successful", response: user })
        }
        catch (error) {
            res.json({ success: false, error: error.message })
        }
    }
