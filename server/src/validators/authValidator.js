const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const otpRegex = /^[0-9]{6}$/


const authRegisterValidator = (request, response, next) => {

    const {userName, email, password, confirmPassword} = request.body

    // check if all fields are filled
    if(!userName?.trim() || !email?.trim() || !password?.trim() || !confirmPassword?.trim()) {
        return response.status(400).json({
            message: 'All fields are required'
        })
    }

    // check if email is valid
    if(!emailRegex.test(email)) {
        return response.status(400).json({
            message: 'Please enter a valid email address'
        })
    }

    // check if password is at least 8 characters long
    if(password.length < 8) {
        return response.status(400).json({
            message: 'Password must be at least 8 characters long'
        })
    }

    // check if password contains at least one letter
    if(!/[A-Za-z]/.test(password)) {
        return response.status(400).json({
            message: 'Password must contain at least one letter'
        })
    }

    // check if password contains at least one number
    if(!/[0-9]/.test(password)) {
        return response.status(400).json({
            message: 'Password must contain at least one number'
        })
    }

    // check if password and confirm password match
    if(password !== confirmPassword) {
        return response.status(400).json({
            message: 'Password and confirm password must match'
        })
    }


    next()
}

const authLoginValidator = (request, response, next) => {

    const {email, password} = request.body;

    // check if all fields are filled
    if(!email?.trim() || !password?.trim()) {
        return response.status(400).json({
            message: 'All fields are required'
        })
    }

    // check if email is valid or not
    if(!emailRegex.test(email)) {
        return response.status(400).json({
            message: 'Please enter a valid email address'
        })
    }

    // check if password is at least 8 characters long
    if(password.length < 8) {
        return response.status(400).json({
            message: 'Password must be at least 8 characters long'
        })
    }

    // check if password contains at least one letter
    if(!/[A-Za-z]/.test(password)) {
        return response.status(400).json({
            message: 'Password must contain at least one letter'
        })
    }

    // check if password contains at least one number
    if(!/[0-9]/.test(password)) {
        return response.status(400).json({
            message: 'Password must contain at least one number'
        })
    }

    next()
}

const authVerifyOtpValidator = (request, response, next) => {

    const {otp} = request.body;
    const authHeader = request.headers['authorization'];
    let verificationToken;


    // check if otp is filled
    if(!otp?.trim()) {
        return response.status(400).json({
            message: 'OTP is required'
        })
    }

    // check if otp is valid
    if(!otpRegex.test(otp)) {
        return response.status(400).json({
            message: 'Please enter a valid OTP'
        })
    }

    // check if verification token header is valid
    if(authHeader === undefined) {
        return response.status(400).json({
            message: 'Verification token is required'
        })
    }

    // check if verification token is valid
    verificationToken = authHeader.split(' ')[1]
    if(verificationToken === undefined) {
        return response.status(400).json({
            message: 'Verification token is required'
        })
    }

    next()
}

module.exports ={ authRegisterValidator, authLoginValidator, authVerifyOtpValidator }