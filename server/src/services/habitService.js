
const userModel = require('../models/userModel')
const habitModel = require('../models/habitModel')
const AppError = require('../utils/appError')

const createHabit = async (userId, name, category) => {
    
    // check if the user is already exists in db
    const user = await userModel.getUserById(userId)
    if(!user){
        throw new AppError('User not found, please register first', 404)
    }


    // create habit
    const habitId = await habitModel.createHabit(userId, name, category)

    return habitId
}

module.exports = {createHabit}