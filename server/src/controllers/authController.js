
const authService = require('../services/authService')

const register = async (request, response, next) => {
    try {
        const {userName, email, password} = request.body
        
        const userId = await authService.register(userName, email, password)

        response.status(201).json({
            message: 'User created successfully. Please Sign in.',
            userId,
        })
    }
    catch(error) {
        next(error)
    }
}

const loginUser = async (request, response, next) => {
    try {
        const {email, password} = request.body
        
        const verificationToken = await authService.loginUser(email, password)

        response.status(200).json({
            message: 'OTP sent to your email. Please verify.',
            verificationToken,
        })
    }
    catch(error) {
        next(error)
    }
}     

const verifyOtp = async (request, response, next) => {
    try {
        const verificationToken = request.headers['authorization'].split(' ')[1]
        const {otp} = request.body

        const jwtToken = await authService.verifyOtp(otp, verificationToken)

        response.status(200).json({
            message: 'Sign in successful.',
            jwtToken,
        })
    }catch(error) {
        next(error)
    }
}

const resendOtp = async (request, response, next) => {
    
    try{

        const verificationToken  = request.headers['authorization'].split(' ')[1]
        const result = await authService.resendOtp(verificationToken)

        response.status(200).json(
            {
                message: "Otp successfully send to your email."
            }
        )

    }catch(error){
        next(error)
    }

}

module.exports = {register, loginUser, verifyOtp, resendOtp}