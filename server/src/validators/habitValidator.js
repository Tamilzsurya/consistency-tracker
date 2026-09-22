const habitValidator = (request, response, next) => {
    
    const {name, category} = request.body;

    // check if all fields are filled
    if(!name?.trim() || !category?.trim()) {
        return response.status(400).json({
            message: 'All fields are required'
        })
    }

    next();
}


module.exports = {habitValidator}