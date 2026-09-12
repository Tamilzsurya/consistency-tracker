const express = require('express')
const router = express.Router()

const {
    register,
    loginUser,
    // logoutUser,
    verifyOtp,
    resendOtp,

} = require('../controllers/authController')

const { authRegisterValidator, authLoginValidator, authVerifyOtpValidator, authResendOtpValidator } = require('../validators/authValidator')


router.post('/register', authRegisterValidator, register)
router.post('/login', authLoginValidator, loginUser)
// router.post('/logout', logoutUser)
router.post('/verify-otp', authVerifyOtpValidator , verifyOtp)
router.post('/resend-otp', authResendOtpValidator, resendOtp)


module.exports = router