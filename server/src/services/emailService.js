// const transporter = require('../config/mail')

// resend email api key
// const { Resend } = require('resend');
// const resend = new Resend(process.env.RESEND_API_KEY);

// brevo email api key
const { BrevoClient } = require('@getbrevo/brevo');
const brevo = new BrevoClient({
    apiKey: process.env.BREVO_API_KEY,
});

const sendVerificationEmail = async (email, otp) => {

    // send email using resend
    // const { data, error } = await resend.emails.send({

    //     from: 'Consistency Tracker <onboarding@resend.dev>',

    //     to: [email],

    //     subject: 'Verify your Consistency Tracker account',

    //     html: `
    //         <h2>Verify your email</h2>

    //         <p>Your verification code is:</p>

    //         <h1>${otp}</h1>

    //         <p>This code expires in 10 minutes.</p>
    //     `,
    // });

    // if (error) {
    //     console.error('Resend email error:', error);

    //     throw new Error('Failed to send verification email');
    // }

    // console.log('Verification email sent:', data.id);



    // send email using brevo
     const result = await brevo.transactionalEmails.sendTransacEmail({
            sender: {
                name: 'Consistency Tracker',
                email: process.env.BREVO_EMAIL_FROM,
            },

            to: [
                {
                    email: email,
                },
            ],

            subject: 'Verify your Consistency Tracker account',

            htmlContent: `
                <div>
                    <h2>Verify your email</h2>

                    <p>Your Consistency Tracker verification code is:</p>

                    <h1>${otp}</h1>

                    <p>This code expires in 10 minutes.</p>

                    <p>
                        If you did not create this account,
                        you can ignore this email.
                    </p>
                </div>
            `,
        });


}

module.exports = sendVerificationEmail