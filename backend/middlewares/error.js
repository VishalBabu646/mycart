const ErrorHandler = require('../utils/errorHandler');


module.exports = (err,req,res,next) => {

    if( process.env.NODE_ENV == 'development') {
        const statusCode = err.statusCode || 500;
        res.status(statusCode).json({
            success : false,
            message : err.message,
            stack : err.stack,
            error : err
        })
    }
    if(process.env.NODE_ENV == 'production') {
        let message = err.message;
        let error = new Error(message);
        if(err.name =="ValidationError"){
            message = Object.values(err.errors).map(value => value.message);
            error = new Error(message)
        }

        if(err.name == "CastError"){
            message = `Resource not found: given ${err.path}`
            error = new Error(message);
        }
        const statusCode = err.statusCode || 500;
        res.status(statusCode).json({
            success : false,
            message : error.message || 'Internal Server Error',
        })
    }
}