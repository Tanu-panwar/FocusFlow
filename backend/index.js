
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cardRoutes = require("./routes/card-route.js");
const deckRoutes = require("./routes/deck-route.js");
const app = express();

dotenv.config();
require("./reminder");

app.use(
  cors({
    origin: "http://localhost:5173",
    // origin:"https://focusflowfrontend.onrender.com",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
);
app.options("*", cors()); // <-- allow preflight for all routes


app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

// Routes
const authRoutes = require("./routes/auth");
app.use("/", authRoutes);

const taskRoutes = require("./routes/TaskRoute.js");
app.use('/api', taskRoutes);

//add sticky notes
const noteRouter = require("./routes/noteRoutes.js")
app.use("/api/note", noteRouter)

//habit
app.use('/api/habits', require('./routes/habit'));

//text summary
app.use('/api/summarize', require('./routes/textSummary'));

//flashcard
app.use("/api/flash/createcard", cardRoutes)
app.use("/api/flash/createDeck", deckRoutes)


app.use((req, res, next) => {
  console.log(res.getHeaders()); // This will print the headers
  next();
});

// error handling
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Serer Error"

  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  })
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`)
);
