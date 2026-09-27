const express = require('express')
const router = express.Router()

// validators
const {habitEntryValidator} = require('../validators/habitEntryValidator')

// middleware
const authMiddleware = require('../middleware/authMiddleware')

// controllers
const {createOrUpdateHabitEntry} = require('../controllers/habitEntryController')

// create or update habit entry route
router.post('/', habitEntryValidator, authMiddleware, createOrUpdateHabitEntry) 

module.exports = router