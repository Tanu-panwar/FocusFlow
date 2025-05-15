
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Typography,
} from "@mui/material";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function DeckDetails() {
  const { id } = useParams();
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeckDetails = async () => {
      try {
        const response = await axios.get(`https://focusflowbackend.onrender.com/api/flash/createdeck/one/${id}`,{
          withCredentials: true,
        });
        setDeck(response.data.deck);
        setCards(response.data.cards);
      } catch (error) {
        console.error("Server error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDeckDetails();
  }, [id]);

  if (loading)
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress />
      </Box>
    );
  if (!deck)
    return (
      <Typography variant="h6" textAlign="center">
        Deck not found
      </Typography>
    );

  return (
    <Box sx={{ maxWidth: "100%", margin: "auto", mt: 4 }}>
      {/* Deck Card */}
      <Card
        sx={{
          borderBottom: "2px solid skyblue",
          borderRadius: "30px 30px 0px 0px",
          mb: 3,
        }}
      >
        <CardContent>
          <Typography variant="h4" fontWeight="bold">
            {deck.name}
          </Typography>
          <Typography variant="body2" sx={{ color: "grey" }}>
            {deck.description}
          </Typography>
        </CardContent>
      </Card>

      {/* Cards in Deck */}

      {cards.length == 0 ? (
        <>
          {" "}
          <div className="flex flex-col items-center justify-center gap-4 text-center mx-auto">
            <p className="text-black text-2xl">You don't have any flashcards</p>
            <button
              onClick={() =>
                navigate("/flashcard/card", { state: { selectedDeckId: deck._id, deck } })
              }
              name="Create Flashcard"
              className={
                "px-6 py-2 bg-red-500 rounded-md text-xl font-semibold text-white hover:bg-red-700 transition-all"
              }
            >
              Create Flashcard
            </button>
          </div>
        </>
      ) : (
        <>
          <Typography variant="h5" fontWeight="bold" mb={2}>
            Cards in this deck:
          </Typography>
          {cards.map((card) => (
            <Card
              key={card._id}
              sx={{ mb: 2, borderLeft: "4px solid skyblue" }}
            >
              <CardContent>
                <Typography variant="h6" fontWeight="bold">
                  {card.term}
                </Typography>
                <Typography variant="body1">{card.defination}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  onClick={() =>
                    navigate(`card/${card._id}`, { relative: "path" })
                  }
                  sx={{
                    backgroundColor: "skyblue",
                    color: "white",
                    "&:hover": {
                      backgroundColor: "lightblue",
                      content: '"Inside Card Details"',
                    },
                  }}
                >
                  View Details
                </Button>
              </CardActions>
            </Card>
          ))}
          <div className="fixed bottom-0 left-1 h-[80px] w-full flex justify-center items-center backdrop-blur-md bg-white/30 p-4">
            {" "}
            <>
              {" "}
              <div className="flex flex-col items-center justify-center gap-4 text-center mx-auto">
                <button
                  onClick={() =>
                    navigate("/flashcard/card", {
                      state: { selectedDeckId: deck._id, deck },
                    })
                  }
                  name="Create Flashcard"
                  className={
                    "px-6 py-2 bg-sky-400 hover:bg-sky-700 rounded-md text-xl font-semibold text-white  transition-all"
                  }
                >
                  Add Flashcard
                </button>
              </div>
            </>
            <>
              {" "}
              <div className="flex flex-col items-center justify-center gap-4 text-center mx-auto">
                <button
                  onClick={() =>
                   {navigate("/flashcard")}
                  }
                  name="Study Flashcard"
                  className={
                    "px-6 py-2 bg-sky-400 hover:bg-sky-700 rounded-md text-xl font-semibold text-white  transition-all"
                  }
                >
                  Study Cards
                </button>
              </div>
            </>
          </div>
        </>
      )}
    </Box>
  );
}

export default DeckDetails;
