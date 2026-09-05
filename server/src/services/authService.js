
// services
const sendVerificationEmail = require('../services/emailService')

// models
const otpModel = require('../models/otpModel')
const userModel = require('../models/userModel')

// utils
const AppError = require('../utils/AppError')
const hashAndComPassword = require('../utils/hashAndComPassword')
const generateOtp = require('../utils/generateOtp')
const expireDateTime = require('../utils/expireDateTime')
const signAndVerifyJwt = require('../utils/signAndVerifyJwt')


const register = async (userName, email, password) =>{
   
    // check if user already exists
    const existingUser =  await userModel.getUserByEmail(email)
    if(existingUser){
        
        throw new AppError('If this email is already registered, please log in.', 409)
    }

    
    // create hashed password
    const hashedPassword = await hashAndComPassword.hashedPassword(password)
    // create user
    const userId = await userModel.createUser(userName, email, hashedPassword)

                             
    return userId
}


//login user
const loginUser = async (email, password) => {

        //check if user exists
        const existingUser = await userModel.getUserByEmail(email)
        if(!existingUser){
            throw new AppError('Invalid email or password', 401)
        }

        
        // check if user is registered with google
        if(existingUser.provider === 'google'){
            throw new AppError('Please log in with Google', 401)
        }

        // compare password
        const isPasswordMatch = await hashAndComPassword.comparePassword(password, existingUser.password_hash)
        if(!isPasswordMatch){
            throw new AppError('Invalid email or password', 401)
        }

       

        //generate otp
        const otp = await generateOtp()

        // send  to user email
        await sendVerificationEmail(email, otp);

        // store otp in db
        const userId = existingUser.id;
        const otpHash = await hashAndComPassword.hashedPassword(otp)
        const { expireTime } = expireDateTime;
        const otpId = await otpModel.createOtp(userId, otpHash, expireTime)

        // create verification jwt
        const tokenExpiresIn = process.env.VERIFY_TOKEN_EXPIRES_IN
        const payload = {userId, otpId}
        const verificationToken = await signAndVerifyJwt.signJwt(payload, tokenExpiresIn)
        

        return verificationToken;
        
}


module.exports = {register, loginUser}