

export const getAllHabits = async (formData) => {

    const {jwt_token} = formData;

    const url = `${process.env.REACT_APP_SERVER_URL}/api/habits`
    console.log(url)
    const options = {
       method: 'GET',

       headers: {
            Authorization: `Bearer ${jwt_token}`,
            'Content-type': 'application/json'
       }, 

    }

    let response;


    // Make the fetch request and handle network errors and any fetch-related issues
    try{
        response = await fetch(url, options)
    }catch(error){
        throw new Error( 'Unable to connect to the server. Please try again later.' )
    }

    console.log(response)


    let data;
  // if the json response cannot be parsed, throw an error
    try {
        data = await response.json()
    }catch (error) {
        throw new Error( 'json parse error' )
    }

    
        // if the response is successful (status code 200-299), return the data
    if(response.ok){
        return data
    }




      // if the response indicates a client error (status code 400-499), throw an error with the message from the server or a default message
    if(response.status >= 400 && response.status < 500){
        throw new Error(
            data.message || "Unable to get the user details. Please try again later."
        )
    }



    // if the response indicates a server error (status code 500-599), throw an error with the message from the server or a default message
    if(response.status >= 500){
        throw new Error(
            data.message || "Something went wrong on our end. Please try again later."
        )
    }


    throw new Error('Something went wrong on our end. Please try again later.')

}