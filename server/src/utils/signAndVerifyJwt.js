const jwt = require('jsonwebtoken')

const signJwt = (payload, tokenExpiresIn) => jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: tokenExpiresIn})




const verifyJwt = (token) => 
    jwt.verify(token, process.env.JWT_SECRET, (error, payload) => {
        if(error) throw error
        return payload
    }

    )



module.exports = {signJwt, verifyJwt}