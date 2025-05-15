
const mongoose =require("mongoose");
const cardSchema = new mongoose.Schema(
  {
    term: {
      type: String,
      required: true,
    },
    defination: {
      type: String,
      required: true,
    },
    isImage: {
      type: String,
      default: null,
    },
    deckName: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Deck",
        required: true,
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    lastReviewed: {
      type: Date,
      default: Date.now,
    },
    reviewCount: {
      type: Number,
      default: 0,
    },
    nextReviewDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// 🔹 Pre-save hook to ensure "general" deck is always included
cardSchema.pre("save", async function (next) {
  if (!this.deckName || this.deckName.length === 0) {
    const generalDeck = await mongoose.model("Deck").findOne({ name: "general" });

    if (generalDeck) {
      this.deckName = [generalDeck._id]; // ✅ Set default deck ID
    } else {
      console.error("❌ General deck not found!");
    }
  }
  next();
});

const Card = mongoose.model("Card", cardSchema);

module.exports=Card;
