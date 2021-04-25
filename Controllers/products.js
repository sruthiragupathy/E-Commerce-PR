const femaleProducts  = require("../Database/database");
const faker = require("faker");
const Product = require("../Database/product");
faker.seed(123);

exports.findProductById = (req, res, next, id) => {
    Product.findById(id).exec((err, product) => {
        if(err) {
            res.status(400).json({
                message: "product not found"
            })
        }
        req.product = product;
        next()
    }) 
}
exports.getProducts = async (req,res) => {
    try{
        const products = await Product.find({});
        res.json({products: products, success: true})
    }
    catch(error) {
        res.json({ succes:false, error })
    }
}

exports.getProductById = async(req, res) => {
    const {product} = req;
    try {
        res.json({response: product, success: true})
    }
    catch(error) {
        res.json({ succes:false, error })
    }
}

exports.deleteProducts = async (req, res) => {    
    const { productId } = req.params;
    try{
        const deleteResponse = await Product.remove({ _id:productId });
        res.json({ message:"Product deleted successfullyyyy "})
    }
   catch(err) {
    res.status(400).json({
        error:"Failed to delete product"
    })

   }
}