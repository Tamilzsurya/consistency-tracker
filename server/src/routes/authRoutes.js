const express = require('express')
const router = express.Router()

const {
    register,
    loginUser,
    // logoutUser,
} = require('../controllers/authController')

const { authRegisterValidator, authLoginValidator } = require('../validators/authValidator')

router.post('/register', authRegisterValidator, register)
router.post('/login', authLoginValidator, loginUser)
// router.post('/logout', logoutUser)


module.exports = router