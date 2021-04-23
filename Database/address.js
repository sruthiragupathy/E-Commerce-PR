const mongoose = require("mongoose");
const { Schema } = mongoose;

const childSchema = new Schema({
    name: {
        type: String
    },
    mobileNumber: {
        type: String
    },
    pinCode: {
        type: String
    },
    address: {
        type: String
    },
    town: {
        type: String
    },
    state: {
        type: String
    }
})

const addressSchema = new Schema({
    _id: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    addresses: [childSchema]
}, {timestamps: true})

module.exports = mongoose.model("Address", addressSchema);