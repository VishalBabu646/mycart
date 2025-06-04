const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name : {
        type: String,
        required: [true,"Please enter product name"],
        trim:true,
        maxLength: [100,"product name cannot be more than 100 characters"]
    },
    price : {
        type : Number,
        default: 0.0,
    },
    description: {
        type: String,
        required : [true,  "Please enter product description"]
    },
    ratings :{
        type:String,
        default: 0,
    },
    images:[
        {
            image:{
                type:String,
                required:true
            }   
        }
    ],
    category:{
        type:String,
        required: [true,"Please enter product Category"],
        enum:{
            values: [
                'Electronics',
                'Mobile Phones',
                'Laptops',
                'Accessories',
                'Headphones',
                'Foods',
                'Books',
                'Clothes/Shoes',
                'beauty/health',
                'Sports',
                'Outdoor',
                'Home'
            ],
            message : "Please select correct category"
        }
    },
    seller:{
        type: String,
        required:[true, "please enter product seller"]
    },
    stock :{
        type:Number,
        required:[true,"Please enetr product stock"],
        maxLength:[20,'Product stock cannot exceed 20']
    },
    numOfReviews:{
        type: Number,
        default:0
    },
    reviews:[{
        name:{
            type:String,
            required:true
        },
        rating:{
            type:String,
            required:true
        },
        comment:{
            type:String,
            required: true
        }
    }],
    user:{
        type: mongoose.Schema.Types.ObjectId
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})
module.exports = mongoose.model('Product',productSchema);

