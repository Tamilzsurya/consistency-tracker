
const authService = require('../services/authService')

const register = async (request, response, next) => {
    try {
        const {userName, email, password} = request.body
        
        const userId = await authService.register(userName, email, password)

        response.status(200).json({
            message: 'User created successfully. Please log in.',
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
        
        const otpId = await authService.loginUser(email, password)

        response.status(200).json({
            message: 'User logged in successfully.',
            otpId,
        })
    }
    catch(error) {
        next(error)
    }
}                                

module.exports = {register, loginUser}