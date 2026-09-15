const passport = require('../config/passport')

const googleOauthCallbackMiddleware = async (request, response, next) => {

        passport.authenticate(
            "google",
            {
                session: false,
            },

            (error, user, info) => {

                // Service / Passport error
                if (error) {

                    const errorCode =
                        error.code || "GOOGLE_LOGIN_FAILED";

                    return response.redirect(
                        `${process.env.CLIENT_URL}/login?error=${encodeURIComponent(errorCode)}`
                    );
                }


                
                // Passport did not return user
                if (!user) {

                    return response.redirect(
                        `${process.env.CLIENT_URL}/login?error=GOOGLE_AUTH_FAILED`
                    );
                }


                // Authentication successful
                request.user = user;

                return next();
            }
        )(request, response, next);
    }

module.exports = {googleOauthCallbackMiddleware}