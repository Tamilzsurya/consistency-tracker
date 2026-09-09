const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

// Validate individual register field
export const validateInputField = ( id, value, formData ) => {

    // Check if the field is empty
    if (!value.trim()) {
        return 'This field is required'
    }

    // Validate email format
    if (id === 'email') {

        if (!emailRegex.test(value)) {
            return 'Please enter a valid email address'
        }
    }

    // Validate password strength
    if (id === 'password') {

        if (value.length < 8) {
            return 'Password must be at least 8 characters long'
        }

        if (!/[A-Za-z]/.test(value)) {
            return 'Password must contain at least one letter'
        }

        if (!/[0-9]/.test(value)) {
            return 'Password must contain at least one number'
        }
    }

    // Validate confirm password matches password
    if (id === 'confirmPassword') {

        if (value !== formData.password) {
            return 'Passwords do not match'
        }
    }


    return ''
}


// Validate register form
export const validateRegisterForm = (formData) => {

    const errors = {}

    // Validate userName
    const userNameError = validateInputField(
        'userName',
        formData.userName,
        formData
    )
    if (userNameError) {
        errors.userName = userNameError
    }

    // Validate email
    const emailError = validateInputField(
        'email',
        formData.email,
        formData
    )
    if (emailError) {
        errors.email = emailError
    }

    // Validate password
    const passwordError = validateInputField(
        'password',
        formData.password,
        formData
    )
    if (passwordError) {
        errors.password = passwordError
    }

    // Validate confirmPassword
    const confirmPasswordError = validateInputField(
        'confirmPassword',
        formData.confirmPassword,
        formData
    )
    if (confirmPasswordError) {
        errors.confirmPassword = confirmPasswordError
    }


    return errors
}

// Validate Login form
export const validateLoginForm = (formData) => {

    const errors = {}

    // Validate email
    const emailError = validateInputField(
        'email',
        formData.email,
        formData
    )
    if (emailError) {
        errors.email = emailError
    }

    // Validate password
    const passwordError = validateInputField(
        'password',
        formData.password,
        formData
    )
    if (passwordError) {
        errors.password = passwordError
    }

    return errors
}

export const validateOtpForm = ( formData ) => {

    let error = ''
    const otpRegex = /^[0-9]{6}$/
    const { otp, verificationToken } = formData

    if (otp.length !== 6 || !otpRegex.test(otp)) {
        error = 'Please enter a valid OTP'
        return error
    }

    if (!verificationToken) {
        error = 'Your session has expired. Please Sign in again.'
        return error
    }


    return error
}