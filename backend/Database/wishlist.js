const mongoose = require("mongoose");
const { Schema } = mongoose;

const childSchema = new Schema({ 
    product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
    }
});

const wishlistSchema = new Schema ({
    _id: {
    type: Schema.Types.ObjectId,
    ref: "User"
    },
    wishlistItems: [childSchema]
    
}, {timestamps: true})


module.exports = mongoose.model("Wishlist", wishlistSchema);
