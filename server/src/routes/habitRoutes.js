const express = require('express');
const router = express.Router();


// validators
const { habitValidator } = require('../validators/habitValidator')

// middleware
const authMiddleware = require('../middleware/authMiddleware')

// controllers
const {createHabit, getAllHabits, deleteHabit, updateHabit} = require('../controllers/habitController')






// routes
router.post('/', habitValidator, authMiddleware, createHabit)
router.get('/', authMiddleware, getAllHabits)
router.delete('/:habitId', authMiddleware, deleteHabit)
router.put('/:habitId', authMiddleware, updateHabit)


module.exports = router

