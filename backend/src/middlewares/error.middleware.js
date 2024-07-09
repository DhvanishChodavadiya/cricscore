const error = (err,req,res,next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "server error";
    return res.status(err.statusCode)
    .json({
        success: false,
        message:err.message
    })
}

export default error;