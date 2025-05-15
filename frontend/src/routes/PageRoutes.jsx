import { lazy } from "react";
import AllDecks from "../pages/flashcard/AllDecks";
import DeckDetails from "../pages/flashcard/DeckDetails";
import Study from "../pages/flashcard/study/Study";
const NotFound = lazy(() => import("../pages/errors/NotFound"));
const CreateFlashcard = lazy(() => import("../pages/Home/CreateFlashcard"));
const CreateDeck = lazy(() => import("../pages/Home/CreateDeck"));
const FlashcardDetails = lazy(() => import("../pages/flashcard/FlashcardDetails"));

const PageRoutes = [
  {
    path: "/flashcard",
    element: <Study />,
  },
  {
    path: "/flashcard/card",
    element: <CreateFlashcard />,
  },
  {
    path: "/flashcard/deck",
    element: <CreateDeck />,
  },
  {
    path: "/flashcard/dashboard",
    element: <AllDecks />,
  },
  {
    path: "/flashcard/dashboard/:id",
    element: <DeckDetails />,
  },
  {
    path: "/flashcard/dashboard/:deckid/card/:id",
    element: <FlashcardDetails />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default PageRoutes;
