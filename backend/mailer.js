
const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,     // your Gmail address
    pass: process.env.EMAIL_PASS,     // your App Password
  },
});

module.exports = transporter;
