
const signAndVerifyJwt = require('../utils/signAndVerifyJwt')


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
       
        const {otp} = request.body;
        const {payload} = request;
        const {userId, otpId} = payload

        const jwtToken = await authService.verifyOtp(otp, userId)

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

        const {payload} = request;
        const {userId, otpId} = payload;

        const result = await authService.resendOtp(userId)

        response.status(200).json(
            {
                message: "Otp successfully send to your email."
            }
        )

    }catch(error){
        next(error)
    }

}


const googleCallback = async (request, response, next) => {
    
    try{

        const user = request.user;

        // generate jwt token
        const payload = { userId: user.id };
        const tokenExpiresIn = process.env.JWT_TOKEN_EXPIRES_IN;

        const jwtToken = await signAndVerifyJwt.signJwt(payload, tokenExpiresIn);

        // send the cookie to client
        response.cookie('jwt_token', jwtToken, { maxAge: 1000 * 60 * 60 * 24 * 7 })

        return response.redirect(`${process.env.CLIENT_URL}/`);

    }
    catch(error){
        next(error)
    }
    
};

module.exports = {register, loginUser, verifyOtp, resendOtp, googleCallback}