
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

        

        const data = await response.json()

        if (response.ok) {
            return data
        }


        if ( response.status >= 400 && response.status < 500){

            throw new Error(
                data.message || 'Invalid registration details'
            )
        }


        if (response.status >= 500) {

            throw new Error(
               data.message || 'Something went wrong. Please try again later.'
            )
        }


        throw new Error('Registration failed')

    

}