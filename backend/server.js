require("dotenv").config()

const express = require("express");
const app = express()
const cors = require("cors");
const bodyParser = require("body-parser");
const  productRoutes  = require("./Routes/products")
const userRoutes = require("./Routes/user");
const cartRoutes = require("./Routes/cart");
const wishlistRoutes = require("./Routes/wishlist");
const addressRoutes = require("./Routes/address")


const connectMongoDb = require("./Database/connectMongoDb");
const address = require("./Database/address");
// const femaleProducts = require("./Database/database");
// const Product = require("./Database/Product");

const PORT = process.env.PORT || 3000

const bool = true;

connectMongoDb();
// console.log(femaleProducts);
// const populateData = async ( femaleProducts ) => {
//     try {
//     await Product.insertMany(femaleProducts);
//     }
//     catch (error) {
//         console.log(error)
//     }
// }

//Middlewares
app.use(bodyParser.json()) // handle json data
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());


//Routes
// app.use("/", (req, res) => res.send("Hello"))
app.use("/api", productRoutes);
app.use("/api", userRoutes);
app.use("/api", cartRoutes);
app.use("/api", wishlistRoutes);
app.use("/api", addressRoutes);


app.listen(PORT, () => {
    console.log("Server running at port" + PORT)
})