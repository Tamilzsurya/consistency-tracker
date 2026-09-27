
const habitEntryValidator = (request, response, next) => {

    const {id, habitId, isCompleted, entryDate} = request.body;


    

    // check if any field is empty
    if(id === undefined || habitId === undefined || isCompleted === undefined || entryDate === undefined){
        return response.status(400).json({message: 'All fields are required'})
    }
    

    next();
}

module.exports = {habitEntryValidator}