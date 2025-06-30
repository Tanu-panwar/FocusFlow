
// page for creating flashcards
import axios from 'axios';
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CreateTerm from "../../components/CreateTerm";
import Button from "../../components/ui/button/Button";
import Toast from "../../components/ui/toast/Toast";
import { flashcardSchema } from "../../schema/validation";
import baseURL from '../../environment';

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
      const response = await axios.get(`${baseURL}/api/flash/createDeck/all`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true, 
      });
      setDecks(response.data); // assuming setDecks is a state hook
    } catch (err) {
      console.error("Error fetching decks:", err.message);
    }
  };

    fetchDecks();
  }, []);

  const [toast, setToast] = useState(false);


  const createCardHandler = async (data) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?._id;

  try {
    const { terms } = data;

    const deckIdList = selectedDecks.map(d =>
      typeof d === "object" ? d._id : d
    );

    const promises = terms.map(async (termData) => {
      const requestBody = {
        userId,
        deckName: deckIdList,
        term: termData.term,
        defination: termData.defination,
        isImage: termData.image || null,
      };

      console.log("Sending Data:", requestBody);

      const response = await axios.post(
        `${baseURL}/api/flash/createcard/create`,
        requestBody,
        { withCredentials: true }
      );

      return response.data;
    });

    const results = await Promise.all(promises);
    console.log("All Cards Created:", results);
  } catch (error) {
    console.error("Error creating cards:", error.response?.data?.message || error.message);
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