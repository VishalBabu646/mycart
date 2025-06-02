const connectDatabase = require('../config/database');
const dotenv = require('dotenv');
const path = require('path');
const product = require('../models/productModel');
const products = require('../data/products.json');


dotenv.config({path: path.join(__dirname,"..","backend","config","config.env")});
connectDatabase();


(async() => {
    try{
        await product.deleteMany();
        console.log('Products Deleted!');
        await product.insertMany(products);
        console.log('All Product added!');
    }
    catch(error){
        console.log(error);
    }
    process.exit();
})();

