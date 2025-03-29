
require("dotenv").config();
const { HfInference } = require("@huggingface/inference");

const hf = new HfInference(process.env.HF_API_KEY); // Use environment variable

module.exports.textSummary = async (req, res) => {
  try {
    const { text } = req.body;
    
    console.log("Input Text:", text);

    const response = await hf.summarization({
      model: "facebook/bart-large-cnn",
      inputs: text,
    });

    console.log("API Response:", response);

    res.json({ summary: response.summary_text });
  } catch (error) {
    console.error("Error in Summarization:", error.message);
    res.status(500).json({ error: "Summarization failed", details: error.message });
  }
};
