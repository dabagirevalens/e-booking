export default (err, req, res, next) => {
    
    err.statusCode = err.statusCode || 500;

    let error = { ...err}

    error.message = err.message;

    //Wrong Mongoose ObjectId Error

    if(err.name === 'CastError'){
        const message = `Resource not found. invalid : ${err.path}`;

        error = new Error(message, 400);
    }

    //Handling mongoose validation errors

    if(err.name === 'ValidationError') {
        const message = Object.values(err.errors).map(value => value.message);

        error = new Error(message, 400);
    }

    console.log(error);

    res.status(err.statusCode).json({
        success: false,
        error,
        message: error.message,
        stack : error.stack
    })
}