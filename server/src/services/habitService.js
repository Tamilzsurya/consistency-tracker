
const userModel = require('../models/userModel')
const habitModel = require('../models/habitModel')
const habitEntriesModel =  require('../models/habitEntryModel')
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

const getAllHabits = async (userId) => {

    const habits = await habitModel.getAllHabits(userId)
    const habitEntries = await habitEntriesModel.getHabitEntries(1)

    const formatedHabitsList = Promise.all(habits.map( async habit => {
        const habitEntries = await habitEntriesModel.getHabitEntries(habit.id)
        const formatedHabitEntries = habitEntries.map(eachHabitEntry => (
            {
                habitEntryId: eachHabitEntry.id,
                habitId: eachHabitEntry.habit_id,
                isCompleted: eachHabitEntry.is_completed,
                habitEntryDate:  eachHabitEntry.entry_date 
            }
        ))

        return {...habit, habitEntries: formatedHabitEntries}

    } )
    )
    return formatedHabitsList
}

module.exports = {createHabit, getAllHabits}