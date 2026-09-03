const transporter = require('../config/mail')

const sendVerificationEmail = async (email, otp) => {

    await transporter.sendMail(
        {
            from: process.env.EMAIL_USER,

            to: email,

            subject:
            'Verify your Consistency Tracker account',

            html: `
            <h2>Verify your email</h2>

            <p>Your verification code is:</p>

            <h1>${otp}</h1>

            <p>This code expires in 10 minutes.</p>
            `,
        }
    )
}

module.exports = sendVerificationEmail