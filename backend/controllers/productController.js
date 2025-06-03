const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const APIFeatures = require('../utils/apiFeatures');

exports.getProducts = async(req,res,next) => {
    const resPerPage = 3;
    const apiFeatures = new APIFeatures(Product.find(),req.query).search().filter().paginate(resPerPage);
    const product = await apiFeatures.query;
    res.status(200).json(
    {
        "success" : true,
        "count" : product.length,
        product
    }
)}


//Create Product {{base-url}}/api/v1/products/new
exports.getNewProduct = async (req,res,next) => {
    console.log("getNewProduct is called")
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product:product
    })
}

//Get Single Product {{base_url}}/api/v1/productsingle/68389f52b0ce3da1fc27d96d
exports.getsingleProduct = async(req,res,next) => {
    const productSingle = await Product.findById(req.params.id);

    if(!productSingle){
        return res.status(404).json({
            "success" : "false",
            "message" : "Product Not Found!"
        })
    }
    res.status(201).json({
        "success" : true,
        productSingle
    });
}

//Update Product {{base_url}}/api/v1/productsingle/68389f52b0ce3da1fc27d96d
exports.updateProduct = async(req,res,next) => {
    // console.log('Hello from Upadet product!')
    let product = await Product.findById(req.params.id);
    if(!product){
            return res.status(404).json({
                "success" : false,
                "message" : "Product Not Found!"
            }
        )
    }
    
    product = await Product.findByIdAndUpdate(req.params.id,req.body,{
        new: true,
        runValidators : true
    })

    res.status(200).json({
        "success" : true,
        product
    })
}

exports.deleteProduct = catchAsyncError(async(req,res,next) => {
    const product = await Product.findById(req.params.id);
    if(!product){
        return next(new ErrorHandler('Product not found',400));
    }

   await Product.findByIdAndDelete(req.params.id)

    res.status(200).json({
        "success" : true,
        "message" : "Product deleted Successfully"
    })
});