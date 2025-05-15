const express =require("express");
const { userVerification } =require("../middleware.js");
const { createDeck, getAllDecks , getOneDeck, updateDeck, deleteDeck } =require("../Controllers/deck.controller.js");
const router = express.Router()

// router.get("/create",protectFlash,createDeck)
router.post("/create",userVerification,createDeck)
router.get("/all",userVerification,getAllDecks)

router.delete("/:id",userVerification,deleteDeck)
router.put("/:id", userVerification, updateDeck);
router.get("/one/:id",userVerification,getOneDeck)

module.exports=router