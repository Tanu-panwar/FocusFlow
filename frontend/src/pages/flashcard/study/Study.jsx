
import React, { useEffect, useState } from "react";
import axios from "axios";
import baseURL from "../../../environment";
import { useLocation } from "react-router-dom";

function Study() {
  const [cards, setCards] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const deckId = localStorage.getItem("deckId");
        console.log("Deck ID from storage:", deckId);
        const user =JSON.parse(localStorage.getItem("user"));
        console.log("study card user:",user);
        const userId = user?._id;
        if (!deckId || !userId) {
          console.error("Missing deckId or userId");
          return;
        }
        const res = await axios.get(`${baseURL}/api/flash/createcard/all`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          withCredentials: true,
        });
        setCards(res.data.cards || []);
      } catch (err) {
        console.error("Error fetching flashcards:", err.message);
      }
    };
    fetchCards();
  }, []);

  return (
    <div className="p-5 min-h-screen bg-zinc-800 text-white">
      <h2 className="text-3xl mb-4 text-center text-[#f23064] font-bold">Study Cards</h2>

      {cards.length === 0 ? (
        <p className="text-center text-gray-300">No cards found.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {cards.map((card, index) => (
            <div key={card._id || index} className="bg-zinc-700 p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-[#f23064] mb-2">{card.term}</h3>
              <p className="text-gray-200">{card.defination}</p>
              {card.isImage && (
                <img
                  src={card.isImage}
                  alt="Card Illustration"
                  className="mt-3 rounded max-h-48 object-cover"
                />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Study;
