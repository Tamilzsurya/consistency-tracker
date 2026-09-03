
const userModel = require('../models/userModel')
const hashAndComPassword = require('../utils/hashAndComPassword')
const generateOtp = require('../utils/generateOtp')
const sendVerificationEmail = require('../services/emailService')
const AppError = require('../utils/AppError')
const expireDateTime = require('../utils/expireDateTime')
const otpModel = require('../models/otpModel')

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

        // compare password
        const isPasswordMatch = await hashAndComPassword.comparePassword(password, existingUser.password_hash)
        if(!isPasswordMatch){
            throw new AppError('Invalid email or password', 401)
        }

        //generate otp
       const otp = await generateOtp()

        // send  to user email
        await sendVerificationEmail(email, otp);

        // check if the email is verified or not

        if(existingUser.verified_user == false){
            // store otp in db
            const userId = existingUser.id;
            const otpHash = await hashAndComPassword.hashedPassword(otp)
            const { expireTime } = expireDateTime;

            const otpId = await otpModel.createOtp(userId, otpHash, expireTime)

            return otpHash;
        }
        
        

        return "success";
}


module.exports = {register, loginUser}