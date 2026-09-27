
const habitEntryService = require('../services/habitEntryService')

const createOrUpdateHabitEntry = async (request, response, next) => {

    try{
        const {payload} = request;

        const {userId} = payload
        const {id, habitId, isCompleted, entryDate} = request.body;

        const result = await habitEntryService.createOrUpdateHabitEntry(userId, id, habitId, isCompleted, entryDate)

        response.status(201).json({
            message: 'Habit entry created or updated successfully',
            result,
        })

    }catch(error){
        next(error)
    }
}

module.exports = {createOrUpdateHabitEntry}