
const express =require("express");
const { userVerification } =require("../middleware.js");
const { createCard  , getFlashcardDetails } =require("../Controllers/card.controller.js");
const router = express.Router()

// router.get("/create",protectFlash,createCard)
router.post("/create",userVerification,createCard)
router.get("/deck/:deckid/card/:id",userVerification, getFlashcardDetails);

module.exports=router