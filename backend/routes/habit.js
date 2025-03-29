const express = require('express');
const habitController = require('../Controllers/habbit_controller')
const { userVerification } =require("../middleware.js");
const router = express.Router();

const { home }=require("../Controllers/home_controller.js");

router.get("/", userVerification, home);
router.post('/create', userVerification, habitController.createHabit);
router.get('/favorite-habit',userVerification, habitController.favoriteHabit);
router.get('/remove',userVerification, habitController.destroyHabit);
router.get('/status-update',userVerification, habitController.statusUpdate);

module.exports = router;