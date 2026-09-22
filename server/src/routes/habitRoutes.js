const express = require('express');
const router = express.Router();


// validators
const { habitValidator } = require('../validators/habitValidator')

// middleware
const authMiddleware = require('../middleware/authMiddleware')

const {createHabit} = require('../controllers/habitController')






// routes
router.post('/', habitValidator, authMiddleware, createHabit)


module.exports = router

