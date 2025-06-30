
import axios from 'axios';
import { Form, Formik } from "formik";
import React, { useState } from "react";
import CreateGroup from "../../components/CreateGroup";
import Button from "../../components/ui/button/Button";
import Toast from "../../components/ui/toast/Toast";
import { DeckSchema } from "../../schema/DeckSchema";
import baseURL from '../../environment';
import { useNavigate } from 'react-router-dom';

const CreateDeck = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState(false);

  // 🔐 Create deck handler with auth token
  const createDeckHandler = async (data) => {
    const user = JSON.parse(localStorage.getItem('user')); // or use context
    const userId = user?._id;

    try {
      const requestBody = {
        name: data.name,
        description: data.description,
        userId: userId,
      };

      console.log("Sending Data:", requestBody);

      const response = await axios.post(`${baseURL}/api/flash/createDeck/create`,requestBody, {
        withCredentials: true 
      });

      const result = response.data;

      if (!result || !result.deck || !result.deck._id) {
        throw new Error("Deck creation failed or invalid response.");
      }
      localStorage.setItem("deckId", result.deck._id);
      console.log("Deck created:", result);
      
    } catch (error) {
      console.error("Error creating deck:", error.message);
    }
  };

  return (
    <Formik
      initialValues={{
        id: "",
        name: "",
        description: "",
      }}
      validationSchema={DeckSchema}
      onSubmit={(values, action) => {
        values.id = Date.now();
        action.resetForm();

        createDeckHandler(values);

        setToast(true);
        setTimeout(() => setToast(false), 4000);
      }}
      validateOnMount
    >
      {({ values, isValid, setFieldValue, dirty }) => (
        <Form autoComplete="false">
          <section className="mb-10 flex flex-col gap-10">
            {toast && (
              <Toast
                fn={() => setToast(false)}
                toastClass={!toast ? "-translate-y-96" : "translate-y-0"}
                data={"deck"}
              />
            )}

            <CreateGroup values={values} setFieldValue={setFieldValue} />
          </section>

          <div className="mx-auto text-center">
            <Button
              data-testid="submit-form"
              disabled={!(isValid && dirty)}
              type="submit"
              btnclass={`font-semibold rounded-md text-white text-xl px-14 py-4 ${
                !isValid ? "bg-red-200" : "bg-[#f23064]"
              }`}
              text={"Create Deck"}
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default CreateDeck;















// import { Form, Formik } from "formik";
// import React, { useEffect, useState } from "react";
// import CreateGroup from "../../components/CreateGroup";
// import Button from "../../components/ui/button/Button";
// import Toast from "../../components/ui/toast/Toast";
// import { DeckSchema } from "../../schema/DeckSchema";

// const CreateDeck = () => {
//   const [toast, setToast] = useState(false);
//   const [userId, setUserId] = useState("");

//   // Fetch the logged-in user's ID
//   const getUserInfo = async () => {
//     try {
//       const res = await fetch("http://localhost:3000/login", {
//         method: "GET",
//         credentials: "include", // Needed to send session cookie
//       });

//       if (!res.ok) throw new Error("Failed to fetch user info");

//       const data = await res.json();
//       setUserId(data.userId); // or data._id / data.id depending on your API
//       console.log("Logged-in user:", data.userId);
//     } catch (error) {
//       console.error("Error fetching user:", error.message);
//     }
//   };

//   useEffect(() => {
//     getUserInfo();
//   }, []);

//   // Function to send deck data
//   const createDeckHandler = async (data) => {
//     try {
//       const requestBody = {
//         name: data.name,
//         description: data.description,
//         userId, // Dynamic from DB
//       };

//       console.log("Sending Data:", requestBody);

//       const response = await fetch("http://localhost:3000/api/flash/createDeck/create", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",
//         body: JSON.stringify(requestBody),
//       });

//       if (!response.ok) {
//         const errorResult = await response.json();
//         throw new Error(errorResult.message || "Something went wrong!");
//       }

//       const result = await response.json();
//       console.log("Deck Created:", result);
//       return result;

//     } catch (error) {
//       console.error("Error creating deck:", error.message);
//       return null;
//     }
//   };

//   return (
//     <Formik
//       initialValues={{
//         id: "",
//         name: "",
//         description: "",
//       }}
//       validationSchema={DeckSchema}
//       onSubmit={async (values, action) => {
//         values.id = Date.now();
//         action.resetForm();

//         const result = await createDeckHandler(values);
//         if (result) {
//           setToast(true);
//           setTimeout(() => {
//             setToast(false);
//           }, 4000);
//         }
//       }}
//       validateOnMount
//     >
//       {({ values, isValid, setFieldValue, isSubmitting, dirty }) => (
//         <Form autoComplete="off">
//           <section className="mb-10 flex flex-col gap-10">
//             {toast && (
//               <Toast
//                 fn={() => setToast(false)}
//                 toastClass={!toast ? "-translate-y-96" : "translate-y-0"}
//                 data={"deck"}
//               />
//             )}
//             <CreateGroup values={values} setFieldValue={setFieldValue} />
//           </section>

//           <div className="mx-auto text-center">
//           <Button
//               data-testid="submit-form"
//               disabled={!(isValid && dirty)}
//               type="submit"
//               btnclass={`font-semibold rounded-md text-white text-xl px-14 py-4 ${
//                 !isValid ? "bg-red-200" : "bg-[#f23064]"
//               }`}
//               text={"Create Deck"}
//             />
//           </div>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default CreateDeck;




// // page for creating flashcards

// import { Form, Formik } from "formik";
// import React, { useState } from "react";
// import CreateGroup from "../../components/CreateGroup";
// import Button from "../../components/ui/button/Button";
// import Toast from "../../components/ui/toast/Toast";
// import { DeckSchema } from "../../schema/DeckSchema";

// const CreateDeck = () => {
//   const [toast, setToast] = useState(false);
// //   send create deck
// const createDeckHandler = async (data) => {
//   console.log(data)
//   try {
//         const requestBody = {
//          name : data.name,
//          description : data.description ,
//          userId : "67e4289532cd6538e2b05954"
//         };

//         console.log("Sending Data:", requestBody);

//         const response = await fetch("http://localhost:3000/api/flash/createDeck/create", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify(requestBody),
//         });

//         if (!response.ok) {
//           const result = await response.json();
//           throw new Error(result.message || "Something went wrong!");
//         }

//         return response.json();
      
//       const results = await Promise.all(promises);
//       console.log("All Cards Created:", results);
//   } catch (error) {
//     console.error("Error creating cards:", error.message);
//   }
// };

//   return (
//     <Formik
//       initialValues={{
//         id: "",
//         name:"",
//         description:"",
//       }}
//       // validating and dispatching the form data to redux state on onSubmit
//       validationSchema={DeckSchema}
//       onSubmit={(values, action) => {
//         values.id = Date.now();
//         action.resetForm();

//         // send the values to the route to add the deck into db
//         createDeckHandler(values)

//         setToast(true);

//         // After 2 seconds, set the toast variable to false to hide the toast message
//         setTimeout(() => {
//           setToast(false);
//         }, 4000);
//       }}
//       validateOnMount
//     >
//       {({ values, isValid, setFieldValue, isSubmitting, dirty }) => (
//         <Form autoComplete="false">
//           <section className="mb-10 flex flex-col gap-10">
//             {/* toast component for letting the user know that their flashcard is created */}
//             {toast && (
//               <Toast
//                 fn={() => setToast(false)}
//                 toastClass={!toast ? "-translate-y-96" : "translate-y-0"}
//                 data={"deck"}
//               />
//             )}

//             {/* Create Group component */}
//             <CreateGroup values={values} setFieldValue={setFieldValue} />
//           </section>

//           <div className="mx-auto text-center">
//             {/* button for submiting the flashcard */}
//             <Button
//               data-testid="submit-form"
//               disabled={!(isValid && dirty)}
//               type="submit"
//               btnclass={`font-semibold rounded-md text-white text-xl px-14 py-4 ${
//                 !isValid ? "bg-red-200" : "bg-[#f23064]"
//               }`}
//               text={"Create Deck"}
//             />
//           </div>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default CreateDeck;