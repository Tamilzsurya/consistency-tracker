
const { request, response } = require('express')
const habitService = require('../services/habitService')

// Create:  Create a new habit
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

// Update: Update a habit
const updateHabit = async (request, response, next) => {
    try{

        const {habitId} = request.params;
        const {name, category} = request.body;


        const result = await habitService.updateHabit(habitId, name, category)

        return response.status(200).json({
            message: "Habit updated successfully!",
            result
        })

    }catch(error){
        next(error)
    }
}

// Read: Get all habits
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

// Delete: Delete a habit
const deleteHabit = async (request, response, next) => {
    try{

        const {habitId} = request.params;

        const result = await habitService.deleteHabit(habitId)

        return response.status(200).json({
            message: "success",
            result
        })

    }catch(error){
        next(error)
    }
}

module.exports = {createHabit, getAllHabits, deleteHabit, updateHabit}