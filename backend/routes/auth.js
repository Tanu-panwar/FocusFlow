
const { Signup, Login, Logout } = require('../Controllers/AuthController')
const { userVerification }=require("../middleware")
const router = require('express').Router()


// const transporter = require("../mailer");

// router.get("/test-email", async (req, res) => {
//   try {
//     await transporter.sendMail({
//       from: process.env.EMAIL_USER,
//       to: "suhanachaudhary212@gmail.com",
//       subject: "Test Email",
//       text: "This is a test email.",
//     });
//     res.send("✅ Email sent");
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("❌ Failed to send email");
//   }
// });


//home page route
router.get('/',userVerification,(req, res) => {
    res.json({ status: true, user: req.user.username });
});    

router.post('/signup', Signup);
router.post('/login', Login);
router.post('/logout', Logout);

module.exports = router
