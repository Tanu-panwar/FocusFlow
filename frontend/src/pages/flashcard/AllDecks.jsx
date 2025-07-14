
import { Add as AddIcon, ArrowForward as ArrowForwardIcon, Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";
import {
  CardContent,
  IconButton,
  Card as MuiCard,
  Tooltip,
  Typography,
} from "@mui/material";
import axios from 'axios';

import baseURL from "../../environment"

import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const AllDecks = () => {
  const [decks, setDecks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingDeck, setEditingDeck] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/flash/createDeck/all`, {
          withCredentials: true
        });

        const data = response.data;
        console.log(data);
        setDecks(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDecks();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this deck?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${baseURL}/api/flash/createDeck/${id}`, {
        withCredentials: true,
      });
      setDecks(decks.filter(deck => deck._id !== id));
    } catch (err) {
      console.log("Error deleting deck:", err.response?.data || err.message);
    }
  };

  const handleEdit = (deck) => {
    const newName = prompt("Enter new name for the deck:", deck.name);
    if (!newName || newName.trim() === "") return;

    // const newDescription = prompt("Enter new description for the deck:", deck.description || "");
    // if (newDescription === null) return; // Allow empty description

    axios
      .put(
        `${baseURL}/api/flash/createDeck/${deck._id}`,
        { name: newName },
        { withCredentials: true }
      )
      .then((response) => {
        // Update state after successful edit
        setDecks((prevDecks) =>
          prevDecks.map((d) =>
            d._id === deck._id ? { ...d, name: newName } : d
          )
        );
      })
      .catch((err) => {
        console.log("Error updating deck:", err.response?.data || err.message);
      });
  };
  if (loading) return <p className="text-center text-lg">Loading decks...</p>;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6">
      {decks.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <p className="text-black text-xl sm:text-2xl">You don't have any decks</p>
          <NavLink
            role="link"
            to={"/flashcard/deck"}
            data-testid="navigation"
            className="px-6 py-2 bg-red-500 rounded-md text-lg sm:text-xl font-semibold text-white hover:bg-red-700 transition-all"
          >
            Create Decks
          </NavLink>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {decks.map((deck) => (
            <MuiCard
              key={deck._id}
              sx={{
                width: "100%",
                height: "auto",
                minHeight: 180,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                padding: 2,
                boxShadow: 4,
                borderRadius: 4,
              }}
            >
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {deck.name}
                </Typography>

                <div className="flex justify-end flex-wrap gap-2 mt-4">
                  <Tooltip title="Edit Deck">
                    <IconButton onClick={() => handleEdit(deck)} color="primary">
                      <EditIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Delete Deck">
                    <IconButton onClick={() => handleDelete(deck._id)} color="error">
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Add to Deck">
                    <IconButton
                      onClick={() =>
                        navigate("/flashcard/card", {
                          state: { selectedDeckId: deck._id, deck },
                        })
                      }
                      color="primary"
                    >
                      <AddIcon />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="View Deck">
                    <NavLink to={`/flashcard/dashboard/${deck._id}`}>
                      <IconButton color="default">
                        <ArrowForwardIcon />
                      </IconButton>
                    </NavLink>
                  </Tooltip>
                </div>
              </CardContent>
            </MuiCard>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllDecks;
