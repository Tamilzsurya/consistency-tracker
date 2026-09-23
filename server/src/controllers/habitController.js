
const habitService = require('../services/habitService')

const createHabit = async (request, response, next) => {
    try {

        const {payload} = request

        const {userId} = payload
        const {name, category} = request.body

        const result = await habitService.createHabit(userId, name, category)

        response.status(201).json({
            message: 'Habit created successfully',
            result,
        })

    }
    catch(error) {
        next(error)
    }
}

const getAllHabits = async (request, response, next) => {

    try {

        const {payload} = request

        const {userId} = payload

        const habits = await habitService.getAllHabits(userId)

        response.status(200).json(
            {
                message: 'All habits fetched successfully',
                habits,
            }
        )
    }
    catch(error) {
        next(error)
    }
    

}

module.exports = {createHabit, getAllHabits}