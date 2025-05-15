import * as React from "react";
import { useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { Checkbox, ListItemText } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function DropDown({ setSelectedDecks, preSelectedDecks = [] }) {
  const theme = useTheme();
  const [names, setNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const [personName, setPersonName] = useState(preSelectedDecks);

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const response = await fetch("/api/flash/createdeck/all");
        if (!response.ok) throw new Error("Failed to fetch decks");
        const data = await response.json();
        setNames(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDecks();
  }, []);

  if (loading) return <p className="text-center text-lg">Loading decks...</p>;


  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="demo-multiple-chip-label">Deck</InputLabel>
        <Select
          multiple

          value={personName.map((p) => p._id)} // Use IDs instead
          onChange={(event) => {
            const selectedIds = event.target.value;
            const selectedDecks = names.filter((deck) =>
              selectedIds.includes(deck._id)
            );
            setPersonName(selectedDecks);
            setSelectedDecks(selectedIds);
          }}
          
          renderValue={(selectedIds) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selectedIds.map((id) => {
                const deck = names.find((d) => d._id === id);
                return deck ? <Chip key={id} label={deck.name} /> : null;
              })}
            </Box>
          )}
        >
          {names.map((name) => (
            <MenuItem key={name._id} value={name._id}>
              <Checkbox checked={personName.some((p) => p._id === name._id)} />
              <ListItemText primary={name.name} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}
