const express = require('express')
const router = express.Router()

const {
    register,
    loginUser,
    // logoutUser,
    verifyOtp
} = require('../controllers/authController')

const { authRegisterValidator, authLoginValidator, authVerifyOtpValidator } = require('../validators/authValidator')

router.post('/register', authRegisterValidator, register)
router.post('/login', authLoginValidator, loginUser)
// router.post('/logout', logoutUser)
router.post('/verify-otp', authVerifyOtpValidator , verifyOtp)


module.exports = router