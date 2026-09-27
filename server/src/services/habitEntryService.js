
const habitEntryModel = require('../models/habitEntryModel')


const createOrUpdateHabitEntry = async (userId, id, habitId, isCompleted, entryDate) => {

    const habitEntry = await habitEntryModel.getHabitEntry(id, habitId);

    // if habit entry is not exists then create new habit entry
    if(!habitEntry){
        const newHabitEntry = await habitEntryModel.createHabitEntry(userId, id, habitId, isCompleted, entryDate)
        return newHabitEntry
    }


    const updatedHabitEntry = await habitEntryModel.updateHabitEntry(id, habitId, isCompleted, entryDate)
    return updatedHabitEntry



    
}

module.exports = {createOrUpdateHabitEntry}
 