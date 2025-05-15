import * as Yup from "yup";

export const DeckSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, "Group name must be at least 2 characters long")
      .max(40, "Group name cannot exceed 40 characters")
      .required("Group name is required"),
});
