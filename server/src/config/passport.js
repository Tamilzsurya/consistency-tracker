const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const authService = require('../services/authService');


passport.use( new GoogleStrategy( 
    // argument 1 credential object
    {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL
    }, 
    // arugument 2 callback
    async ( accessToken, refreshToken, profile, done ) => {
        
        try {
            const googleUser = {
                    googleId: profile.id,
                    email: profile.emails?.[0]?.value,
                    fullName: profile.displayName,
                    profilePicture: profile.photos?.[0]?.value,
                    emailVerified: profile._json?.email_verified === true,
                }
            
            const user = await authService.googleLogin(googleUser);

            return done(null, user);
            
        }catch(error){
            
            return done(error, null)
        }
        
    }
 ) )

module.exports = passport