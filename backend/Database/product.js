const { Decimal128 } = require("bson");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema ({
    image : {
        type: String,
        trim: true,
        required: "image is required"
    },
    brandName : {
        type: String,
        trim: true,
        required: "brandName is required"
    }, 
    description : {
        type: String,
        trim: true,
        required: "description is required"
    },
    price : {
        type: String,
        trim: true,
        required: "price is required"
    },
    isnew : {
        type: Boolean,
    },
    sale : {
        type: Boolean
    },
    outOfStock : {
        type: Boolean
    },
    discountByPercentage : {
        type: Number
    },
    rating : {
        type: Number
    },
    count : {
        type: Number
    },
    seller : {
        type: String
    },
    type : {
        type : String
    }

})

module.exports = mongoose.model( "Product", productSchema );