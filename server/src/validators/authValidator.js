const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/


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

module.exports ={ authRegisterValidator, authLoginValidator }