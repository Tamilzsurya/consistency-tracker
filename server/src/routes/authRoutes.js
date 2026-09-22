const express = require('express')
const router = express.Router()

const passport = require('../config/passport')

// controllers
const {
    register,
    loginUser,
    // logoutUser,
    verifyOtp,
    resendOtp,
    googleCallback,

} = require('../controllers/authController')

// validators as a middleware
const { authRegisterValidator, authLoginValidator, authVerifyOtpValidator, authResendOtpValidator } = require('../validators/authValidator')

// google oauth callback middleware
const { googleOauthCallbackMiddleware } = require('../middleware/googleOauthCallbackMiddleware')
const  authMiddleware  = require('../middleware/authMiddleware')


router.post('/register', authRegisterValidator, register)
router.post('/login', authLoginValidator, loginUser)
// router.post('/logout', logoutUser)
router.post('/verify-otp', authVerifyOtpValidator, authMiddleware, verifyOtp)
router.post('/resend-otp', authResendOtpValidator, authMiddleware, resendOtp)

// google oauth route
router.get('/google', 

    passport.authenticate(
        'google',
        {
            scope: ['email', 'profile'],
            session: false
        }
    )

)


// google oauth callback
router.get(
    "/google/callback",

    googleOauthCallbackMiddleware,

    googleCallback
);

module.exports = router