import * as Yup from "yup";

export const flashcardSchema = Yup.object().shape({
  
  terms: Yup.array().of(
    Yup.object().shape({
      term: Yup.string()
        .min(10, "Term must be at least 10 characters long")
        .max(200, "Term cannot exceed 200 characters")
        .required("Term is required"),

      defination: Yup.string()
        .min(20, "Definition must be at least 20 characters long")
        .max(2000, "Definition cannot exceed 2000 characters")
        .required("Definition is required"),
    })
  ),
});
