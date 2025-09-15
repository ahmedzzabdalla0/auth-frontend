import { useReducer } from "react";
import { useAuth } from "@/hooks/auth";
import { authReducer, createInitialState } from "@/reducers/authReducer";
import { validateForm } from "@/utils/authValidation";
import { handleAuthRequest, parseServerErrors } from "@/services/authService";

export const useAuthForm = (formId: "login" | "signup") => {
  const {
    actions: { checkAuthHandler },
  } = useAuth();
  const [state, dispatch] = useReducer(authReducer, createInitialState(formId));

  // Handle form field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    dispatch({
      type: "SET_FORM_FIELD",
      name,
      value: type === "checkbox" ? checked : value,
    });
  };

  // Validate and submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (state.isSubmitting) return;

    // Client-side validation
    const validationErrors = validateForm(state.form, formId);
    if (Object.keys(validationErrors).length > 0) {
      dispatch({ type: "SET_ERRORS", errors: validationErrors });
      return;
    }

    dispatch({ type: "CLEAR_ERRORS" });
    dispatch({ type: "SET_SUBMITTING", isSubmitting: true });

    try {
      // Make auth request
      const error = await handleAuthRequest(state.form, formId);

      if (error) {
        // Handle server errors
        const serverErrors = parseServerErrors(error);
        dispatch({ type: "SET_ERRORS", errors: serverErrors });
      } else {
        // Success - check auth status
        checkAuthHandler();
      }
    } finally {
      dispatch({ type: "SET_SUBMITTING", isSubmitting: false });
    }
  };

  return {
    state,
    handleChange,
    handleSubmit,
  };
};
