
const { Signup, Login, Logout } = require('../Controllers/AuthController')
const { userVerification }=require("../middleware")
const router = require('express').Router()

//home page route
router.post('/',userVerification,(req, res) => {
    res.json({ status: true, user: req.user.username });
});    

router.post('/signup', Signup);
router.post('/login', Login);
router.post('/logout', Logout);

module.exports = router
