
// page for creating flashcards
import axios from 'axios';
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CreateTerm from "../../components/CreateTerm";
import Button from "../../components/ui/button/Button";
import Toast from "../../components/ui/toast/Toast";
import { flashcardSchema } from "../../schema/validation";

const CreateFlashcard = () => {
  const location = useLocation();
  const [decks, setDecks] = useState([]);
  
  let [selectedDecks, setSelectedDecks] = useState(
    location.state?.selectedDeckId ? [location.state.deck] : []
  );

  useEffect(() => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  const fetchDecks = async () => {
    try {
      const response = await axios.get(`https://focusflowbackend.onrender.com/api/flash/createDeck/all`);
      setDecks(response.data); // assuming setDecks is a state hook
    } catch (err) {
      console.error("Error fetching decks:", err.message);
    }
  };

  fetchDecks();
}, []);

  const [toast, setToast] = useState(false);

  const createCardHandler = async (data) => {
    const user = JSON.parse(localStorage.getItem('user')); // or use context
    const userId = user?._id;

    try {
      const { terms } = data;
      // Loop through each term and send a request
      if(typeof selectedDecks[0]=="object")
          selectedDecks = [selectedDecks[0]._id]
      const promises = terms.map(async (termData) => {
        const requestBody = {
          userId: userId,
          deckName: selectedDecks,
          term: termData.term,
          defination: termData.defination,
          isImage: termData.image || null,
        };

        console.log("Sending Data:", requestBody);

        const response =await axios.post("https://focusflowbackend.onrender.com/api/flash/createcard/create",requestBody, {
          withCredentials: true
        });

        if (!response.ok) {
          const result = await response.json();
          throw new Error(result.message || "Something went wrong!");
        }

        return response.json();
      });
      const results = await Promise.all(promises);
      console.log("All Cards Created:", results);
    } catch (error) {
      console.error("Error creating cards:", error.message);
    }
  };

  return (
    <>
      {/* select Group  */}
      {/* <DropDown setSelectedDecks={setSelectedDecks} preSelectedDecks={selectedDecks} /> */}
      <select onChange={(e) => handleDeckChange(e.target.value)}>
      {decks.map((deck) => (
        <option key={deck._id} value={deck._id}>
          {deck.deckName}
        </option>
      ))}
    </select>

      <Formik
        initialValues={{
          terms: [
            {
              id: Date.now(),
              deckname: "",
              term: "",
              defination: "",
              image: null,
            },
          ],
        }}
        // validating and dispatching the form data to redux state on onSubmit
        validationSchema={flashcardSchema}
        onSubmit={(values, action) => {
          action.resetForm();

          createCardHandler(values);
          // send the values to the route to add the card into db

          setToast(true);

          // After 2 seconds, set the toast variable to false to hide the toast message
          setTimeout(() => {
            setToast(false);
          }, 2000);
        }}
        validateOnMount
      >
        {({ values, isValid, setFieldValue, isSubmitting, dirty }) => (
          <Form autoComplete="false">
            <section className="mb-10 flex flex-col gap-10">
              {/* toast component for letting the user know that their flashcard is created */}
              {toast && (
                <Toast
                  fn={() => setToast(false)}
                  toastClass={!toast ? "-translate-y-96" : "translate-y-0"}
                />
              )}

              {/* Create Term component */}
              <CreateTerm setFieldValue={setFieldValue} values={values} />
            </section>

            <div className="mx-auto text-center">
              {/* button for submiting the flashcard */}
              <Button
                data-testid="submit-form"
                disabled={!(isValid && dirty)}
                type="submit"
                btnclass={`font-semibold rounded-md text-white text-xl px-14 py-4 ${
                  !isValid ? "bg-red-200" : "bg-[#f23064]"
                }`}
                text={"Create Flashcard"}
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default CreateFlashcard;