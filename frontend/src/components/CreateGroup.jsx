
// create group and group description page for the flashcard app

import { Field } from "formik";
import React from "react";
import FieldInput from "./ui/input/FieldInput";

const CreateGroup = ({ values, setFieldValue }) => {
  // This function returns a `div` element that contains the create group and group description form.
  return (
    <div className="bg-white shadow-md md:p-10 p-5 rounded-md sm:p-5">
      {/* This `div` element contains the group name input and the group image
      upload button. */}
      <div
        className={`flex items-end gap-5 mb-5 sm:flex-row flex-col flex-wrap`}
      >
        {/* Enter group input */}
        <FieldInput
          name={`name`}
          id={"group"}
          htmlFor={"group"}
          label={"Create Group"}
          placeholder={"Organic Chemistry"}
        />

       
        
      </div>
      {/* Group description */}
      <div className="flex flex-col gap-2 relative">
        <label
          htmlFor="groupDescription"
          className="font-semibold text-gray-500"
        >
          Add Description
        </label>
        <Field
          as="textarea"
          name={`description`}
          id="groupDescription"
          maxLength="500"
          placeholder="Write your description here ( max length is 500 words )"
          className="p-2 text-lg border-2 rounded-md h-36 resize-none"
        />
      </div>
    </div>
  );
};

export default CreateGroup;