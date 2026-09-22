const jwt = require('jsonwebtoken')


const { verifyJwt } = require('../utils/signAndVerifyJwt')



const authMiddleware = (request, response, next) => {

    const authHeader =  request.headers.authorization

    if(authHeader === undefined){
        return response.status(401).json(
            {
                message : 'Verification token is required. Please Sign in again and continue.' 
            }
        )
    }

    const token = authHeader.split(' ')[1]
    if(token === undefined){
        return response.status(401).json(
            {
                message: 'Verification token is required. Please Sign in again and continue.'
            }
        )
    }


    try{

        const payload =  verifyJwt(token)
        
        request.payload = payload;

    }catch(error){

        if(error){
            return response.status(401).json(
                {
                    message: 'Invalid or expired token. Please Sign in again.'
                }
            )
        }

    }



    next()
}


module.exports = authMiddleware