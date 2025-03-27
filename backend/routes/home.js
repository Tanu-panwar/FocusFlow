
const { userVerification } = require("../middleware");

const router = require('express').Router();

router.post('/', userVerification, (req, res) => {
    res.json({ status: true, user: req.user.username });
});

module.exports = router;
