

const { transporter } = require("./mailer.js");
const { Verification_Email_Template, Welcome_Email_Template } = require("./emailTemplate.js");

module.exports.sendVerificationEamil = async (email, otp) => {
    try {
        const response = await transporter.sendMail({
            from: '"Suhana Chaudhary" <suhanachaudhary212@gmail.com>',

            to: email,
            subject: "Verify your Email",
            text: "Verify your Email",
            html: Verification_Email_Template.replace("{verificationCode}", otp)
        })
        console.log('Email send Successfully', response)
    } catch (error) {
        console.log('Email error', error)
    }
}

module.exports.senWelcomeEmail = async (email, username) => {
    try {
        const response = await transporter.sendMail({
            from: '"Suhana Chaudhary" <suhanachaudhary212@gmail.com>',

            to: email,
            subject: "Welcome Email",
            text: "Welcome Email",
            html: Welcome_Email_Template.replace("{name}", username)
        })
        console.log('Email send Successfully', response)
    } catch (error) {
        console.log('Email error', error)
    }
}
