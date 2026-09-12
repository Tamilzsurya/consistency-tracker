
export const registerUser = async (formData) => {

        const url = 'http://localhost:3001/api/auth/register'
        const options = {
            method: 'POST',

            headers: {
                'Content-Type': 'application/json'
            },

            body: JSON.stringify(formData)
        }

        let response;

        // Make the fetch request and handle network errors and any fetch-related issues
        try {
            response = await fetch(url, options)
        }catch (error) {
            throw new Error( 'Unable to connect to the server. Please try again later.')
        }

        

        let data;
        // if the json response cannot be parsed, throw an error
        try {
            data = await response.json()
        }catch (error) {
            throw new Error( 'Something went wrong on our end. Please try again later.' )
        }

        // if the response is successful (status code 200-299), return the data
        if (response.ok) {
            return data
        }

        // if the response indicates a client error (status code 400-499), throw an error with the message from the server or a default message
        if ( response.status >= 400 && response.status < 500){

            throw new Error(
                data.message || 'Invalid registration details'
            )
        }

        // if the response indicates a server error (status code 500-599), throw an error with the message from the server or a default message
        if (response.status >= 500) {

            throw new Error(
               data.message || 'Something went wrong on our end. Please try again later.'
            )
        }


        throw new Error('Registration failed')

    
}

export const loginUser = async (formData) => {

    // create request data
    const url = 'http://localhost:3001/api/auth/login'
    const options = {
        method: 'POST',

        headers: {
            'Content-Type': 'application/json'
        },


        body: JSON.stringify(formData)
    }

    let response;

    // Make the fetch request and handle network errors and any fetch-related issues
    try {
        response = await fetch(url, options)
    }catch (error) {
        throw new Error( 'Unable to connect to the server. Please try again later.')
    }

    let data;
    // if the json response cannot be parsed, throw an error
    try {
        data = await response.json()
    }catch (error) {
        throw new Error( 'Something went wrong on our end. Please try again later.' )
    }

    // if the response is successful (status code 200-299), return the data
    if (response.ok) {
        return data
    }

    // if the response indicates a client error (status code 400-499), throw an error with the message from the server or a default message
    if ( response.status >= 400 && response.status < 500){

        throw new Error(
            data.message || 'Invalid login details'
        )
    }

    // if the response indicates a server error (status code 500-599), throw an error with the message from the server or a default message
    if (response.status >= 500) {

        throw new Error(
           data.message || 'Something went wrong on our end. Please try again later.'
        )
    }


    throw new Error('Login failed')
        
}


export const verifyOtp = async (formData) => {

    const {otp, verificationToken} = formData

    // create request data
    const url = 'http://localhost:3001/api/auth/verify-otp'
    const options = {
        method: 'POST',

        headers: {
            Authorization: `Bearer ${verificationToken}`,
            'Content-Type': 'application/json'
        },


        body: JSON.stringify({otp})
    
    }

    let response;

    // Make the fetch request and handle network errors and any fetch-related issues
    try {
        response = await fetch(url, options)
    }catch (error) {
        throw new Error( 'Unable to connect to the server. Please try again later.')
    }

    let data;
    // if the json response cannot be parsed, throw an error
    try {
        data = await response.json()
    }catch (error) {
        throw new Error( 'Something went wrong on our end. Please try again later.' )
    }

    

    // if the response is successful (status code 200-299), return the data
    if (response.ok) {
        return data
    }

     // if the response indicates a client error (status code 400-499), throw an error with the message from the server or a default message
    if(response.status >= 400 && response.status < 500){
        throw new Error(
            data.message || "Invalid OTP verify details"
        )
    }

    // if the response indicates a server error (status code 500-599), throw an error with the message from the server or a default message
    if(response.status >= 500){
        throw new Error(
            data.message || "Something went wrong on our end. Please try again later."
        )
    }


    throw new Error("Otp verification failed.")
    
}

export const resendOtp = async (formData) =>{

    const {verificationToken} = formData

    const url = "http://localhost:3001/api/auth/resend-otp"
    const options = {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${verificationToken}`,
            "Content-Type" : "application/json"
            
        }
    }


     // Make the fetch request and handle network errors and any fetch-related issues
    let response;

    try{
        response = await fetch(url, options)
    }catch(error){
        throw new Error('Unable to connect to the server. Please try again later.')
    }


    // if the json response cannot be parsed, throw an error
    let data;
    try{
        data = await response.json()
    }catch(error){
        throw new Error( 'Something went wrong on our end. Please try again later.' )
    }



    // if the response is successful (status code 200-299), return the data
    if (response.ok) {
        return data
    }

     // if the response indicates a client error (status code 400-499), throw an error with the message from the server or a default message
    if(response.status >= 400 && response.status < 500){
        throw new Error(
            data.message || "Invalid OTP verify details"
        )
    }

    // if the response indicates a server error (status code 500-599), throw an error with the message from the server or a default message
    if(response.status >= 500){
        throw new Error(
            data.message || "Something went wrong on our end. Please try again later."
        )
    }


    throw new Error("Resend Otp failed.")

}