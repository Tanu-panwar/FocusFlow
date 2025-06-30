

const Deck =require("../models/Deck.models.js");
const Card =require("../models/Cards.models.js");
const { deckSchema } =require("../schemas/deckSchema.js");
const mongoose =require("mongoose");

module.exports.createDeck = async (req, res, next) => {

    try {
      // Validate request body
      const parsedBody = deckSchema.parse(req.body);
      console.log(parsedBody)
    
      // Create new deck
      const newdeck = new Deck({
        ...parsedBody,
        userId: req.user._id,
      });
      await newdeck.save();
  
      return res.status(201).json({
        message: "deck created successfully",
        deck: newdeck,
      });
    } catch (error) {
      console.log("error from createdeck")
      console.log(error)
      next(error);
      return res.status(400).json({
        message: error.errors || "Invalid data",
      });
    }
  };


  module.exports.getAllDecks = async (req,res,next) => {
  try {
      const decks = await Deck.find({ userId: req.user._id }) // Populate user details
      console.log("req.user inside getAllDecks:", req.user);
     return res.status(200).json(decks);
  } catch (error) {
    next(error)
     return res.status(500).json({ error: "Failed to fetch decks" });
  }
};


module.exports.getOneDeck = async (req,res) => {
  try {
    const { id } = req.params;
    const objectId = new mongoose.Types.ObjectId(id);
    console.log(objectId);

    const deck = await Deck.findById(objectId);
    console.log(deck);
    if (!deck) {
        return res.status(404).json({ message: "Deck not found" });
    }
    // Find all cards that belong to this deck
    const cards = await Card.find({ deckName: objectId });
    console.log( cards)
    
    res.status(200).json({
        deck,
        cards,
    });
} catch (error) {
  console.log(error)
  
    res.status(500).json({ message: "Server Error", error });
}
};

module.exports.deleteDeck=async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id);

    if (!deck) {
      return res.status(404).json({ message: "Deck not found" });
    }

    console.log("Deck is:",deck);
    console.log("deck user:",deck.userId)
    console.log("request user:",req.user)
    if (!deck.userId || !req.user || deck.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    //await deck.remove();
    await Deck.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Deck deleted successfully" });

  } catch (err) {
    console.error("Delete error:", err);
    res.status(500).json({ message: "Server error" });
  }
}

module.exports.updateDeck = async (req, res) => {
  try {
    const deck = await Deck.findById(req.params.id);

    if (!deck) {
      return res.status(404).json({ message: "Deck not found" });
    }

    console.log("Deck is:",deck);
    console.log("deck user:",deck.userId)
    console.log("request user:",req.user)

    if (!deck.userId || !req.user || deck.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    deck.name = req.body.name || deck.name;
    await deck.save();

    res.status(200).json({ message: "Deck updated successfully", deck });
  } catch (err) {
    console.error("Update error:", err);
    res.status(500).json({ message: "Server error" });
  }
};
