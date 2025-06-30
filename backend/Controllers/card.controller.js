
const Card =require("../models/Cards.models.js");

const { cardSchema }=require("../schemas/cardSchema.js");
const mongoose=require("mongoose");

module.exports.createCard = async (req, res,next) => {

    try {
      const parsedBody = cardSchema.parse(req.body);
      console.log("Parsed body:", parsedBody);      
  
      // Create new card
      const newCard = new Card({
        ...parsedBody,
        userId: req.user._id,
      })
      await newCard.save();
  
      return res.status(201).json({
        message: "Card created successfully",
        card: newCard,
      });
    } catch (error) {
      console.log("error from createCard")
      console.log(error)
      next(error);
      
      return res.status(400).json({
        message: error.errors || "Invalid data",
      });
    }
  };


  module.exports.getFlashcardDetails = async (req, res) => {
    try {
      console.log("User Object:", req.user);
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized - User not found in request" });
      }
      const { deckid, id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(deckid) || !mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ message: "Invalid ID format" });
      }
    console.log("Requested deckId:", deckid);
    console.log("Requested userId:", id);
  
      // Find the flashcard in the deck
      const flashcard = await Card.findOne({ userId: req.user._id, deckName: deckid });
  
      if (!flashcard) {
        return res.status(404).json({ message: "Flashcard not found" });
      }
      res.status(200).json(flashcard);
    } catch (error) {
      console.error("Error fetching flashcard:", error);
      res.status(500).json({ message: "Server error" });
    }
  };


  module.exports.getAllUserFlashcards = async (req, res) => {
  try {
    const userId = req.user._id;
    const cards = await Card.find({ userId });
    if (!cards.length) {
      return res.status(404).json({ message: "No cards found" });
    }
    res.status(200).json({ cards });
  } catch (err) {
    console.error("Error fetching all user cards:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};