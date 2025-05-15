
const Card =require("../models/Cards.models.js");

const { cardSchema }=require("../schemas/cardSchema.js");

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