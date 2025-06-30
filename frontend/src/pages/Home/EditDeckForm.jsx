
import axios from 'axios';
import { Form, Formik } from 'formik';
import React from 'react';
import Button from '../../components/ui/button/Button';
import { DeckSchema } from '../../schema/DeckSchema';
import baseURL from '../../environment';

const EditDeckForm = ({ deck, onClose, onDeckUpdate }) => {
  const updateDeckHandler = async (data) => {
    try {
      const response = await axios.put(
        `${baseURL}/api/flash/createDeck/${deck._id}`,
        {
          name: data.name,
          description: data.description,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        onDeckUpdate(response.data.updatedDeck); // update in parent
        onClose(); // close the form
      }
    } catch (error) {
      console.error('Error updating deck:', error.message);
    }
  };

  return (
    <Formik
      initialValues={{
        name: deck.name || '',
        description: deck.description || '',
      }}
      validationSchema={DeckSchema}
      onSubmit={(values) => updateDeckHandler(values)}
    >
      {({ values, handleChange, errors, touched, isValid }) => (
        <Form className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
          <h2 className="text-xl font-semibold mb-4">Edit Deck</h2>

          <div className="mb-4">
            <label htmlFor="name" className="block font-medium text-gray-700 mb-1">
              Deck Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={values.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            {touched.name && errors.name && (
              <div className="text-red-500 text-sm mt-1">{errors.name}</div>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="description" className="block font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={values.description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
            {touched.description && errors.description && (
              <div className="text-red-500 text-sm mt-1">{errors.description}</div>
            )}
          </div>

          <div className="mt-6 flex justify-end gap-4">
            <Button
              type="button"
              text="Cancel"
              btnclass="bg-gray-300 text-black px-4 py-2 rounded"
              onClick={onClose}
            />
            <Button
              type="submit"
              text="Save Changes"
              disabled={!isValid}
              btnclass="bg-blue-500 text-white px-4 py-2 rounded"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditDeckForm;




// import axios from 'axios';
// import { Form, Formik } from "formik";
// import React from "react";
// import CreateGroup from "../../components/CreateGroup";
// import Button from "../../components/ui/button/Button";
// import { DeckSchema } from "../../schema/DeckSchema";

// const EditDeckForm = ({ deck, onClose, onDeckUpdate }) => {

//   const updateDeckHandler = async (data) => {
//     try {
//       const response = await axios.put(
//         `http://localhost:3000/api/flash/createDeck/${deck._id}`,
//         {
//           name: data.name,
//           description: data.description,
//         },
//         { withCredentials: true }
//       );

//       if (response.status === 200) {
//         onDeckUpdate(response.data.updatedDeck); // optional callback
//         onClose();
//       }
//     } catch (error) {
//       console.error("Error updating deck:", error.message);
//     }
//   };

//   return (
//     <Formik
//       initialValues={{
//         name: deck.name,
//         description: deck.description || "",
//       }}
//       validationSchema={DeckSchema}
//       onSubmit={(values) => updateDeckHandler(values)}
//     >
//       {({ values, setFieldValue, isValid}) => (
//         <Form className="bg-white p-6 rounded-md shadow-md w-full max-w-lg">
//           <h2 className="text-xl font-semibold mb-4">Edit Deck</h2>
//           <CreateGroup values={values} setFieldValue={setFieldValue} />

//           <div className="mt-6 flex justify-end gap-4">
//             <Button
//               type="button"
//               text="Cancel"
//               btnclass="bg-gray-300 text-black px-4 py-2 rounded"
//               onClick={onClose}
//             />
//             <Button
//               type="submit"
//               text="Save Changes"
//               disabled={!(isValid)}
//               btnclass="bg-blue-500 text-white px-4 py-2 rounded"
//             />
//           </div>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default EditDeckForm;
