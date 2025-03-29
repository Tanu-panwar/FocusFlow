
const express = require('express');
const router = express.Router();

const { textSummary }=require("../Controllers/textSummary.js");
const { userVerification } =require("../middleware.js");

router.post("/",textSummary);

module.exports = router;