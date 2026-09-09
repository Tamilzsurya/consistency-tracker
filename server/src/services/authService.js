
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
        try{
            await sendVerificationEmail(email, otp);
        }catch(error){
            throw new AppError("We are truble to send the otp. Please try again later.")
        }
        
        

        // store otp in db
        const userId = existingUser.id;
        const otpHash = await hashAndComPassword.hashedPassword(otp)
        const  expireTime  = expireDateTime.expireDateTime();
        const otpId = await otpModel.createOtp(userId, otpHash, expireTime)

        // create verification jwt
        const tokenExpiresIn = process.env.VERIFY_TOKEN_EXPIRES_IN
        const payload = {userId, otpId}
        const verificationToken = await signAndVerifyJwt.signJwt(payload, tokenExpiresIn)
        

        return verificationToken;
        
}

const verifyOtp = async (otp, verificationToken) => {
    let payload;

    try{
         payload = await signAndVerifyJwt.verifyJwt(verificationToken)  
    }catch(error){
        throw new AppError('Your session has expired. Please Sign in again.', 401)
    }

    const {userId, otpId} = payload;

    const user = await otpModel.getOtp(userId)
    

    // check if otp is present in db
    if(!user){
        throw new AppError('Invalid OTP', 401)
    }

    // check if otp is expired
    if(user.expires_at < new Date()){
        throw new AppError('OTP has expired. Please Resend OTP', 401)
    }


    // check if otp is valid
    const isOtpValid = await hashAndComPassword.comparePassword(otp, user.otp_hash)
    if(!isOtpValid){
        throw new AppError('Please enter a valid OTP', 401)
    }


    // delete otp from db
    await otpModel.deleteOtp(userId)

    // create and send the jwToken to the frontend
    const tokenExpiresIn = process.env.JWT_TOKEN_EXPIRES_IN
    const jwtPayload = {userId}

    const jwtToken = await signAndVerifyJwt.signJwt(jwtPayload, tokenExpiresIn)

    return jwtToken;
}


module.exports = {register, loginUser, verifyOtp}