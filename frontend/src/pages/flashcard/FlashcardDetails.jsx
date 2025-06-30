
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BsArrowLeft } from "react-icons/bs";
import axios from 'axios';
import baseURL from "../../environment";

const FlashcardDetails = () => {
  const { deckid, id } = useParams();
  const [flashcard, setFlashcard] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFlashcard = async () => {
      try {
        const response = await axios.get(`${baseURL}/api/flash/createcard/deck/${deckid}/card/${id}`,{
          withCredentials:true,
        });

      setFlashcard(response.data);
      } catch (error) {
        console.error("Server error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFlashcard();
  }, [deckid, id]);

  if (loading) return <p className="text-center text-lg">Loading...</p>;
  if (!flashcard) return <p className="text-center text-lg">Flashcard not found</p>;

  return (
    <div>
      <div className="flex items-start gap-5 mb-10">
        <div>
          <Link to={`/flashcard/dashboard/${deckid}`}>
            <i className="text-xl text-red-600">
              <BsArrowLeft />
            </i>
          </Link>
        </div>
      </div>

      <div className="p-6 border rounded-lg shadow-lg mx-auto">
        <h2 className="text-2xl font-bold text-blue-600">{flashcard.term}</h2>
        <p className="text-lg text-gray-700 mt-2">{flashcard.defination}</p>
      </div>
    </div>
  );
};

export default FlashcardDetails;
