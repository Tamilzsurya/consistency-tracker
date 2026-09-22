const express = require('express');
const router = express.Router();


// validators
const { habitValidator } = require('../validators/habitValidator')

// middleware
const authMiddleware = require('../middleware/authMiddleware')

// controllers
const {createHabit, getAllHabits} = require('../controllers/habitController')






// routes
router.post('/', habitValidator, authMiddleware, createHabit)
router.get('/', authMiddleware, getAllHabits)


module.exports = router

