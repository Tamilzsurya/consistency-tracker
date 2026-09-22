
// services
const sendVerificationEmail = require('../services/emailService')

// models
const otpModel = require('../models/otpModel')
const userModel = require('../models/userModel')

// utils
const AppError = require('../utils/appError')
const hashAndComPassword = require('../utils/hashAndComPassword')
const generateOtp = require('../utils/generateOtp')
const expireDateTime = require('../utils/expireDateTime')
const signAndVerifyJwt = require('../utils/signAndVerifyJwt')
const { AUTH_ERROR_CODES } = require('../constants/messages')

// register user
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
            throw new AppError("This email is registered with Google. Please login with Google.", 401)
        }

        // compare password
        const isPasswordMatch = await hashAndComPassword.comparePassword(password, existingUser.password_hash)
        if(!isPasswordMatch){
            throw new AppError('Invalid email or password', 401)
        }

       

        //generate otp
        const otp = generateOtp()

        

        // store otp in db
        const userId = existingUser.id;
        const otpHash = await hashAndComPassword.hashedPassword(otp)
        const  expireTime  = expireDateTime.expireDateTime();
        const otpId = await otpModel.createOtp(userId, otpHash, expireTime)

        // create verification jwt
        const tokenExpiresIn = process.env.VERIFY_TOKEN_EXPIRES_IN
        const payload = {userId, otpId}
        const verificationToken = await signAndVerifyJwt.signJwt(payload, tokenExpiresIn)


        // send  to user email
        try{
            await sendVerificationEmail(email, otp);
        }catch(error){
            throw new AppError("We are truble to send the otp. Please try again later.", 500)
        }
        

        return verificationToken;    
}

// verify otp
const verifyOtp = async (otp, userId) => {


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

// resend otp
const resendOtp = async (userId) => {

   


    const { email } = await userModel.getUserById(userId);

    //generate otp
    const otp = generateOtp()

    

    // store otp in db
    const otpHash = await hashAndComPassword.hashedPassword(otp)
    const  expireTime  = expireDateTime.expireDateTime();

    await otpModel.updateOtp(userId, otpHash, expireTime)


    // resend the otp to user email
    try{
        await sendVerificationEmail(email, otp);
    }catch(error){
        throw new AppError("We are truble to send the otp. Please try again later.", 500)
    }

}

const googleLogin = async (googleUser) => {

    const {
        googleId,
        email,
        fullName,
        profilePicture,
        emailVerified,
    } = googleUser

    // 1. Validate Google profile
        // check if googleId and email are present if not throw error
        if (!googleId || !email) {
            throw new AppError(
                "Unable to get required information from Google.",
                400,
                AUTH_ERROR_CODES.GOOGLE_LOGIN_FAILED
            );
        }

        // check if email is verified if not throw error
        if (!emailVerified) {
            throw new AppError(
                "Your Google email address is not verified.",
                400,
                AUTH_ERROR_CODES.GOOGLE_EMAIL_NOT_VERIFIED
            );
        }




    // 2. Check google_id first
    // if googleId is present in db then return user
    const existingGoogleUser = await userModel.getUserByGoogleId(googleId);

    if (existingGoogleUser) {
        return existingGoogleUser;
    }



    // 3. Google ID does not exist.
    //    Check email.
    const existingEmailUser = await userModel.getUserByEmail(email);


    // 4. Email does not exist
    //    Create Google account
    if (!existingEmailUser) {

        const newUser =
            await userModel.createGoogleUser( googleUser );

        return newUser;
    }



    // 5. Email exists
    //    Existing LOCAL account
    if (existingEmailUser.provider === "local") {

        const linkedUser = await userModel.linkGoogleAccount({
                userId: existingEmailUser.id,
                googleId,
                profilePicture,
            });

        return linkedUser;
    }

    // 6. Existing account is another provider
    if (existingEmailUser.provider === "google") {

        /*
         * Normally this case means the account
         * should already have google_id.
         *
         * If google_id didn't match above,
         * something is inconsistent.
         */

        throw new AppError(
            "This Google account is not linked correctly.",
            409,
            AUTH_ERROR_CODES.GOOGLE_ACCOUNT_CONFLICT
        );
    }


    if (existingEmailUser.provider === "apple") {

        /*
         * Future behavior:
         *
         * Apple account exists with same email.
         *
         * Do not automatically change provider.
         *
         * Later you can implement an explicit
         * account-linking flow.
         */

        throw new AppError(
            "This email is already registered with Apple. Please login with Apple.",
            409,
            AUTH_ERROR_CODES.GOOGLE_ACCOUNT_CONFLICT_WITH_APPLE
        );
    }


    throw new AppError(
        "Unable to complete Google login.",
        500
    );

    
}


module.exports = {register, loginUser, verifyOtp, resendOtp, googleLogin}