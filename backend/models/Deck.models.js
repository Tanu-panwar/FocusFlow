
const mongoose =require("mongoose");

const deckSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    }
}, { timestamps: true });

const Deck = mongoose.model("Deck", deckSchema);

module.exports=Deck;
