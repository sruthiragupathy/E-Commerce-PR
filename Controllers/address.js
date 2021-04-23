const _ = require('lodash');   
exports.getAddress = async (req, res) => {
    let {address} = req
    try {
        res.json({success:true, response: address})
    }
    catch {
        res.json({ success: false, response: error.message})
    }
}

exports.addAddress = async (req, res) => {
    let {address} = req;
    let addAddress = req.body;
    try {
        address = _.extend(address,{addresses:_.concat(address.addresses,{...addAddress})})
        address = await address.save()
        res.json({success: true, response: address})
    }
    catch(error) {
        res.json({success: false, respons: error.message});
    }
}

exports.updateAddress = async (req, res) => {
    let {address} = req;
    const {addressId} = req.params;
    let addressFromBody = req.body;
    let updateAddress = address.addresses.id(addressId)
    updateAddress = _.extend(updateAddress,{...addressFromBody})
    address.addresses = _.extend(address.addresses,{updateAddress});
    try {
        address = await address.save()
        res.json({success: true, response: address})
    }
    catch (error) {
        res.json({success: false, response: error.message})
    }
 }

 exports.deleteAddress = async (req, res) => {
     let {address} = req;
    const {addressId} = req.params;
    try {
        await address.addresses.id(addressId).remove()
        address = await address.save()
        res.json({success: true, response: address})
    }
    catch(error) {
        res.json({ success: false, response: error.message})
    }
}
    