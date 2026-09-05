
const errorMiddleware = ( error, req, res, next ) => {

  console.error(error)

  res.status(error.statusCode || 500).json({
    message: error.message || 'Something went wrong on our end. Please try again later.',
  })
}

module.exports = errorMiddleware